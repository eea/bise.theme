from Products.Five.browser import BrowserView
from zope.component import getMultiAdapter


class SiteTitle(BrowserView):
    """ View for BAPDatabase tool compatibility"""

    def render(self):
        pps = getMultiAdapter((self.context, self.request),
                              name='plone_portal_state')
        return pps.portal_title()
