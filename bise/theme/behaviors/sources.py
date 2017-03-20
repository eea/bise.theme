from bise.theme import themeMessageFactory as _
from plone.app.textfield import RichText
from plone.directives import form
from plone.autoform import directives
from plone.namedfile.interfaces import IImageScaleTraversable
from zope import schema
from zope.interface import alsoProvides


class IExtraNewsItem(form.Schema):
    """ Behaviour for news items
    """

    resourceurl = schema.TextLine(
        title=_(u'Original URL of this item'),
        default=u'',
        required=False,
    )

    source = schema.Text(
        title=_(u'Source of this item'),
        default=u'',
        required=False,
    )

alsoProvides(IExtraNewsItem, form.IFormFieldProvider)


class IExtraFolderishPage(form.Schema, IImageScaleTraversable):
    """ Behaviour for folderish pages
    """

    directives.write_permission(navmenucode='cmf.ManagePortal')
    navmenucode = RichText(
        title=_(u'Content to show on Navigation Menu'),
        required=False
    )

alsoProvides(IExtraFolderishPage, form.IFormFieldProvider)
