from .interfaces import IThemeSpecific
from Acquisition import aq_inner
from five import grok
from plone.app.contentlisting.interfaces import IContentListing
from plone.i18n.locales.interfaces import IMetadataLanguageAvailability
from plone.memoize.view import memoize
from Products.PloneGlossary.interfaces import IPloneGlossaryDefinition
from zope.component import getUtility


grok.templatedir('templates')


class GlossaryDefinitionView(grok.View):
    grok.context(IPloneGlossaryDefinition)
    grok.name('ploneglossarydefinition_view')
    grok.layer(IThemeSpecific)

    def sub_definitions(self):
        context = aq_inner(self.context)
        brains = context.getFolderContents(
            {'portal_type': 'PloneGlossaryDefinition'}
        )
        return IContentListing(brains)

    @memoize
    def get_language_dict(self):
        lang_utility = getUtility(IMetadataLanguageAvailability)
        return lang_utility.getLanguages(combined=True)

    def language_name(self, lang_code):
        lang = lang_code.lower().replace('_', '-')
        return self.get_language_dict().get(lang).get(u'name', lang)
