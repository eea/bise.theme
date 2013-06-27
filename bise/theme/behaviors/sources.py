from zope.interface import alsoProvides
from zope import schema
from plone.directives import form
from bise.theme import themeMessageFactory as _


class IExtraNewsItem(form.Schema):

    resourceurl = schema.TextLine(title=_(u'Original URL of this item'),
       default=u'',
       required=False,
       )

    source = schema.Text(title=_(u'Source of this item'),
       default=u'',
       required=False,
       )

alsoProvides(IExtraNewsItem, form.IFormFieldProvider)
