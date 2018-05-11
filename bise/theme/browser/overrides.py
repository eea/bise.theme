from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from plone.app.users.browser.personalpreferences import PasswordAccountPanel


class PasswordAccountPanelOverride(PasswordAccountPanel):
    template = ViewPageTemplateFile('templates/password-account-panel.pt')
