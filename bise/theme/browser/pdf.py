""" eea.pdf overrides
"""

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from eea.converter.browser.app.pdfview import Header as BaseHeader
from zope.component import getMultiAdapter

    
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

