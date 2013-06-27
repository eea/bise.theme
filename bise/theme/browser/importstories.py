from plone.app.textfield.value import RichTextValue
from plone.namedfile.file import NamedBlobImage
from Products.CMFCore.utils import getToolByName
from zope.interface import Interface
from Acquisition import aq_inner
from five import grok
from .data import main


class ImportStories(grok.View):
    grok.context(Interface)
    grok.require('cmf.ModifyPortalContent')

    def render(self):
        context = aq_inner(self.context)
        wtool = getToolByName(context, 'portal_workflow')
        from logging import getLogger
        log = getLogger('Import Stories')
        for item in main():
            id = context.invokeFactory(
                id=item['id'],
                type_name='News Item',
                title=item['title']

                )
            newsitem = context.get(id)
            newsitem.text = RichTextValue(item['description'], 'text/html', 'text/html')
            newsitem.setModificationDate(item['last_modification'])
            newsitem.setEffectiveDate(item['releasedate'])
            newsitem.resourceurl = item.get('resourceurl', '')
            newsitem.source = item.get('source', '')
            if item.get('frontpicture', None):
                data = item.get('frontpicture')
                log.info('Image for %s' % id)
                newsitem.image = NamedBlobImage(data=data)
            wtool.doActionFor(newsitem, action='publish')
            log.info('Added: %s' % id)

        return 1


