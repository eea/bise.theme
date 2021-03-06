from Products.Archetypes.Field import FileField
from Products.Archetypes.interfaces import IBaseContent
from Products.CMFCore.interfaces import IFolderish
from Products.CMFCore.interfaces import IPropertiesTool
from Products.Five import BrowserView
from ZODB.POSException import POSKeyError
from ZODB.blob import FilesystemHelper
from ZODB.utils import p64
from logging import getLogger
from plone.dexterity.content import DexterityContent
from plone.namedfile.interfaces import INamedFile
from zope.annotation.interfaces import IAnnotations
from zope.component import queryUtility
import os.path
import shutil


bad_blobs = []
logger = getLogger('Blobs Checker:')


def check_at_blobs(context):
    """ Archetypes content checker for damaged blob fields
    """

    if IBaseContent.providedBy(context):
        schema = context.Schema()
        for field in schema.fields():
            id = field.getName()
            if isinstance(field, FileField):
                try:
                    field.get_size(context)
                except POSKeyError:
                    logger.warn("Found damaged AT FileField %s on %s" %
                                (id, context.absolute_url()))
                    return True
    return False


def check_dexterity_blobs(context):
    """ Check Dexterity content for damaged blob fields
    """
    if isinstance(context, DexterityContent):
        for key, value in context.__dict__.items():
            if not key.startswith("_"):
                if INamedFile.providedBy(value):
                    try:
                        value.getSize()
                    except POSKeyError:
                        logger.warn("Found damaged Dexterity "
                                    "plone.app.NamedFile %s on %s" %
                                    (key, context.absolute_url()))
                        return True
    return False


def fix_blobs(context):
    """
    Iterate through the object variables and see if they are blob fields
    and if the field loading fails then we add them to the bad_blobs list
    """

    if check_at_blobs(context) or check_dexterity_blobs(context):
        bad_blobs.append("Bad blobs found on %s" % context.absolute_url())
        # parent = context.aq_parent
        # parent.manage_delObjects([context.getId()])


def recurse(tree):
    """ Walk through all the content on a Plone site """
    for id, child in tree.contentItems():
        fix_blobs(child)

        if IFolderish.providedBy(child):
            recurse(child)


class DetectBlobs(BrowserView):
    """
    You can call this view by going to site/@@detect-broken-blobs
    Currently it is used to detect broken blobs

    Original code taken from
    https://docs.plone.org/4/en/manage/troubleshooting/transactions.html
    """
    def disable_integrity_check(self):
        """  Content HTML may have references to this broken image - we cannot
        fix that HTML but link integrity check will yell if we try to delete
        the bad image.  """
        ptool = queryUtility(IPropertiesTool)
        props = getattr(ptool, 'site_properties', None)
        self.old_check = props.getProperty('enable_link_integrity_checks',
                                           False)
        props.enable_link_integrity_checks = False

    def enable_integrity_check(self):
        """ """
        ptool = queryUtility(IPropertiesTool)
        props = getattr(ptool, 'site_properties', None)
        props.enable_link_integrity_checks = self.old_check

    def render(self):
        # plone = getMultiAdapter((self.context, self.request),
        #                          name="plone_portal_state")
        logger.info("Checking blobs")

        portal = self.context
        self.disable_integrity_check()
        recurse(portal)
        self.enable_integrity_check()

        logger.info("All done")
        if IAnnotations(self.context) is not None and len(bad_blobs) > 0:
            IAnnotations(self.context)['bad_blobs'] = bad_blobs
        else:
            IAnnotations(self.context)['bad_blobs'] = None
        return "OK - check console for status messages"

    def __call__(self):
        return self.render()


class ShowBlobs(BrowserView):
    """ View that shows us a list of broken blobs, located at
    site/@@show-broken-blobs
    """
    def __call__(self):
        if IAnnotations(self.context).get('bad_blobs', None):
            self.bad_blobs = IAnnotations(self.context)['bad_blobs']
        else:
            self.bad_blobs = None
        return self.index()


class SyncBlobsFromCache(BrowserView):
    """ Sync blobs from the blobcache to the zeostorage blobstorage
    """

    def get_oid(self, foldername, filename):
        # 266, 208.03a01146df758b55.blob
        quot, enctid, _ignored = filename.split('.')
        oid = p64(int(quot) * 997 + int(foldername))
        tid = enctid.decode('hex')
        return oid, tid

    def __call__(self):
        # traverse all folders in configured cache location
        # the folder is the remainder of divmod(oid, 997)
        # the blob filename inside is in the following scheme:
        # rem/quot.<tid.encode('hex')>.blob

        conn = self.context._p_jar
        storage = conn._storage
        fshelper = storage.fshelper
        base_dir = fshelper.base_dir

        real_blobstoredir = os.path.join(base_dir, '../blobstorage')
        zeoblobsfshelper = FilesystemHelper(real_blobstoredir)

        cdirs = filter(lambda x: x and x.isdigit(),
                       [os.path.isdir(os.path.join(base_dir, x)) and x
                        for x in os.listdir(base_dir)])

        for dirname in cdirs:
            dpath = os.path.join(base_dir, dirname)
            blobnames = [x for x in os.listdir(dpath) if x.endswith('.blob')]
            for name in blobnames:
                oid, tid = self.get_oid(dirname, name)
                blobfilename = zeoblobsfshelper.getBlobFilename(oid, tid)
                if not os.path.exists(blobfilename):
                    cachefilename = fshelper.getBlobFilename(oid, tid)
                    fdirname = os.path.dirname(blobfilename)
                    if not os.path.exists(fdirname):
                        os.makedirs(fdirname)
                    shutil.copy(cachefilename, blobfilename)
                    logger.info("Copied blob from source %s to dest %s",
                                cachefilename, blobfilename)

        return "OK"
