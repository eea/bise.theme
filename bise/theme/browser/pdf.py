""" eea.pdf overrides
"""

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from eea.converter.browser.app.pdfview import Header as BaseHeader
from eea.pdf.browser.app.download import Download
from eea.pdf.config import EEAMessageFactory as _
from zope.component import getMultiAdapter
from zope.component import queryMultiAdapter
from zope.publisher.interfaces import NotFound


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
