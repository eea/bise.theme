from Products.CMFCore.utils import getToolByName
from logging import getLogger
from lxml.html import fromstring, tostring
from plone.app.textfield.value import RichTextValue
from urlparse import urljoin
from zope.component.hooks import getSite
from .browser.fixblobs import check_at_blobs, check_dexterity_blobs
import transaction
from Products.CMFCore.interfaces import IFolderish


PROFILE_ID = 'profile-bise.theme:default'


def ploneglossary_1001(context, logger=None):
    if logger is None:
        logger = getLogger('ploneglossary_1001')

    js_registry = getToolByName(context, 'portal_javascripts')
    resource = js_registry.getResource('ploneglossary_definitions.js')
    resource.setInline(False)
    logger.info('Upgraded')


def reload_css_1001(context, logger=None):
    if logger is None:
        logger = getLogger('reload_css_1001')

    default_profile = 'profile-bise.biodiversityfactsheet:default'
    context.runImportStepFromProfile(default_profile, 'jsregistry')
    logger.info('Upgraded')


def upgrade_to_1002(context, logger=None):
    if logger is None:
        logger = getLogger('reload_css_1002')

    setup = getToolByName(context, 'portal_setup')

    setup.runAllImportStepsFromProfile(
        'profile-plone.app.versioningbehavior:default')
    setup.runAllImportStepsFromProfile(
        'profile-plone.app.iterate:plone.app.iterate')

    setup.runImportStepFromProfile(PROFILE_ID, 'typeinfo')
    setup.runImportStepFromProfile(PROFILE_ID, 'repositorytool')
    setup.runImportStepFromProfile(PROFILE_ID, 'plone-difftool')
    logger.info('Upgrade steps executed')


def upgrade_to_1003(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1003')

    setup = getToolByName(context, 'portal_setup')
    wtool = getToolByName(context, 'portal_workflow')
    wtool.manage_delObjects([
        'simple_publication_workflow',
        ])
    setup.runImportStepFromProfile(PROFILE_ID, 'actions')
    setup.runImportStepFromProfile(PROFILE_ID, 'workflow')
    wtool.updateRoleMappings()
    logger.info('Upgrade steps executed')


def upgrade_to_1004(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1004')

    setup = getToolByName(context, 'portal_setup')

    wtool = getToolByName(context, 'portal_workflow')
    wtool.manage_delObjects([
        'simple_publication_workflow',
        ])
    setup.runImportStepFromProfile(PROFILE_ID, 'propertiestool')
    setup.runImportStepFromProfile(PROFILE_ID, 'actions')
    setup.runImportStepFromProfile(PROFILE_ID, 'placeful_workflow')
    setup.runImportStepFromProfile(PROFILE_ID, 'workflow')
    wtool.updateRoleMappings()
    logger.info('Upgrade steps executed')


def upgrade_to_1005(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1005')

    js_registry = getToolByName(context, 'portal_javascripts')
    resource = js_registry.getResource('jquery.bugme.js')
    resource.setEnabled(False)
    logger.info('Upgraded')


def upgrade_to_1006(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1006')

    js_registry = getToolByName(context, 'portal_javascripts')
    resource = js_registry.getResource('jquery.bugme.js')
    resource.setEnabled(True)
    logger.info('Upgraded')


def upgrade_to_1007(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1007')

    setup = getToolByName(context, 'portal_setup')
    setup.runImportStepFromProfile(PROFILE_ID, 'typeinfo')
    logger.info('Upgraded')


def upgrade_to_1008(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1008')

    setup = getToolByName(context, 'portal_setup')
    setup.runImportStepFromProfile(PROFILE_ID, 'skins')
    logger.info('Upgraded')

FIXES = (
    ('/chm-network/bise/chm-network/', '/chm-network/'),
    ('/ecosystem-assessments/', '/ecosystem-assessment/'),
    ('/policy/countries_and_networks/bap/', '/countries/bap/'),
    ('/bise/topics/bise/topics/', '/topics/'),
    ('/topics/countries/bap/', '/topics/bap/'),
    ('/chm-network/european-chm-toolkit/', '/chm-network/the-european-chm-toolkit/')
)


def _fix_text(obj, site_url, logger):
    text = obj.text.raw
    text = text.strip()
    if not text:
        return
    try:
        e = fromstring(text)
    except Exception:
        import pdb; pdb.set_trace()
        return
    links = e.xpath('//a')

    dirty = False

    obj_url = None

    for link in links:
        href = link.get('href')
        if not href:
            continue
        if href.startswith('../'):
            if obj_url is None:
                obj_url = obj.absolute_url()
            newv = urljoin(obj_url + '/', href)
            newv = newv.replace(site_url, '')
            for s, r in FIXES:
                if newv.startswith(s):
                    newv = newv.replace(s, r)
            link.set('href', newv)
            logger.info('For obj: %s - fixed link %s to %s',
                        obj_url, href, newv)
            dirty = True

    if dirty:
        text = tostring(e, pretty_print=True)
        obj.text = RichTextValue(text, 'text/html', 'text/html')
        obj._p_changed = True


def upgrade_to_1009(context, logger=None):
    site_url = getSite().absolute_url()
    if logger is None:
        logger = getLogger('upgrade_to_1009')

    all_types = [
        # 'Collage',
        # 'Collection',
        # 'DavizVisualization',
        # 'EEAPossibleRelation',
        # 'EEARelationsContentType',
        # 'ElasticSearch',
        # 'FeedFeederItem',
        # 'FeedfeederFolder',
        # 'File',
        # 'FileAttachment',
        # 'Image',
        # 'ImageAttachment',
        # 'PDFTheme',
        # 'PDFTool',
        # 'PloneGlossary',
        # 'PloneGlossaryDefinition',
        # 'Ploneboard',
        # 'PloneboardComment',
        # 'PloneboardConversation',
        # 'PloneboardForum',
        # 'Sparql',
        # 'TreeVocabulary',
        # 'TreeVocabularyTerm',
        'BiodiversityFactsheet',
        'Document',
        'Ecosystem',
        'Event',
        'Fact',
        'Folder',
        'FolderishPage',
        'Link',
        'News Item',
        'Section',
        'Service',
        'Study',
        'collective.cover.content'
    ]
    brains = context.portal_catalog.searchResults(portal_type=all_types)
    for b in brains:
        obj = b.getObject()
        if getattr(obj, 'text', None) is None:
            continue
        _fix_text(obj, site_url, logger)


def remove_blobs(context):
    """
    Iterate through the object variables and see if they are blob fields
    and if the field loading fails then we delete them
    """
    logger = getLogger('upgrade_to_1010')
    if check_at_blobs(context) or check_dexterity_blobs(context):
        parent = context.aq_parent
        logger.info("Deleting blob: %s" % context.absolute_url())
        parent._delObject(context.getId(), suppress_events=True)
        parent._p_changed = True
        parent.reindexObject()


def recurse(tree):
    """ Walk through all the content on a Plone site """
    for id, child in tree.contentItems():
        remove_blobs(child)

        if IFolderish.providedBy(child):
            recurse(child)


def upgrade_to_1010(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1010')
    logger.info("Starting upgrade.")
    site = getSite()
    recurse(site)
    transaction.commit()
    logger.info("Finished upgrade.")


def upgrade_to_1011(context, logger=None):
    if logger is None:
        logger = getLogger('upgrade_to_1011')
    logger.info("Starting upgrade.")
    context.runImportStepFromProfile(PROFILE_ID, 'browserlayer')
    logger.info("Finished upgrade.")
