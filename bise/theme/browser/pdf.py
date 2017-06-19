""" eea.pdf overrides
"""

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from eea.converter.browser.app.pdfview import Header as BaseHeader
from eea.converter.browser.app.pdfview import Cover as BaseCover
from eea.pdf.browser.app.download import Download
from eea.pdf.config import EEAMessageFactory as _
from zope.component import getMultiAdapter
from zope.component import queryMultiAdapter
from zope.publisher.interfaces import NotFound
from eea.pdf.utils import getApplicationRoot
from eea.pdf.interfaces import IPDFTool
from zope.component import queryUtility
import random
from plone.app.folder.folder import IATUnifiedFolder


class Cover(BaseCover):
    """ PDF Cover
    """
    template = ViewPageTemplateFile('./templates/pdf.cover.pt')

    @property
    def header(self):
        """ Cover header
        """
        doc = getApplicationRoot(self.context)
        return doc.title_or_id()

    def truncate(self, text, length=70, orphans=10,
                 suffix=u".", end=u".", cut=False):
        """ Custom truncate
        """
        return super(Cover, self).truncate(text, length, orphans,
                                           suffix, end, cut)

    def get_pdftheme(self):
        """ PDF Theme
        """
        tool = queryUtility(IPDFTool)
        theme = tool.theme(self.context)
        if not theme:
            theme = tool.globalTheme(self.context)

        return theme

    def get_coverimage(self):
        """ if set imagescollection on PDF Theme, return a random image,
            None otherwise
        """

        imgview = queryMultiAdapter(
            (self.context, self.request), name='imgview')

        if imgview and imgview.display():
            obj = imgview('large')
            return obj

        theme = self.get_pdftheme()
        if not theme:
            return None

        container = theme.getImagescollection()
        if not container:
            return None

        results = None

        if IATUnifiedFolder.providedBy(container):
            # container is a folder
            cur_path = '/'.join(container.getPhysicalPath())
            path = {'query': cur_path, 'depth': 1}
            results = container.portal_catalog(
                **{'portal_type': 'Image', 'path': path}
            )
        else:
            # is a container
            results = container.queryCatalog(sort_on=None, batch=False)

        if results is None:
            return None

        return random.sample(results, 1)[0].getObject()

    def display_subtitle(self):
        """ Check if cover should be displayed for the current theme
        """
        theme = self.get_pdftheme()
        return getattr(theme, 'coverSubtitle', True)

    def __call__(self, **kwargs):
        return self.template()


class Header(BaseHeader):
    """ PDF Header
    """
    template = ViewPageTemplateFile('./templates/pdf.header.pt')

    @property
    def doc_url(self):
        return self.context.absolute_url()

    @property
    def modified(self):
        plone = getMultiAdapter((self.context, self.request), name="plone")
        time = self.context.modified()
        return plone.toLocalizedTime(time)

    @property
    def body(self):
        """ Header body
        """
        print "rendering header"
        text = self.request.get('subsection', '')
        text = self.truncate(text, 75, 5, suffix='')
        return text


class DownloadPdfOverride(Download):
    template = ViewPageTemplateFile('template-overrides/download.pt')

    def __init__(self, context, request):
        super(DownloadPdfOverride, self).__init__(context, request)
        self._title = ''
        self._message = _(
            u""
        )
        self._email = ''
        self._link = ''

    @property
    def title(self):
        """ Title
        """
        if self._title:
            return self._title

        title = self.context.title_or_id()
        if isinstance(title, str):
            title = title.decode('utf-8')

        return _(
            u"Download '${title}' PDF on click.",
            mapping={
                'title': title
            }
        )

    def finish(self, email=''):
        """ Finish download
        """
        self._title = _(
            u"Your Pdf is ready"
        )
        self._message = _(
            u"Check <a href='${link}'>this link</a> in a few ${period}.",
            mapping={
                u"link": u"%s?direct=1" % self.link(),
                u"period": self.period()
            })
        return self._redirect(self._message, self._title)

    def __call__(self, **kwargs):
        support = queryMultiAdapter((self.context, self.request),
                                    name='pdf.support')

        # Check for permission
        if not getattr(support, 'can_download', lambda: False)():
            raise NotFound(self.context, self.__name__, self.request)

        if self.request.method.lower() == 'get':
            return self._redirect()

        # Don't download PDF asynchronously
        if not support.async():
            return super(DownloadPdfOverride, self).__call__(**kwargs)

        return self._redirect()
