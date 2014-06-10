from bise.theme import themeMessageFactory as _
from five import grok
from plone.directives import form
from plone.memoize import ram
from time import time
from z3c.form.browser.checkbox import CheckBoxFieldWidget
from z3c.formwidget.optgroup.widget import OptgroupFieldWidget
from z3c.formwidget.optgroup.widget import OptgroupTerm
from zope import schema
from zope.interface import alsoProvides
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


import json
import requests


def _cache_key(*args):
    return time() // (20 * 60)


class ICatalogueTags(form.Schema):

    form.widget(cataloguetags=OptgroupFieldWidget)
    cataloguetags = schema.List(
        title=_(u"Catalogue tags"),
        required=False,
        value_type=schema.Choice(
            vocabulary=u'bise.catalogue.tagvocabulary'
        )
    )

    form.widget(targets=CheckBoxFieldWidget)
    targets = schema.List(
        title=_(u"Target "),
        required=False,
        value_type=schema.Choice(
            vocabulary=u'bise.catalogue.targetvocabulary'
        )
    )

    form.widget(actions=CheckBoxFieldWidget)
    actions = schema.List(
        title=_(u"Target and actions"),
        required=False,
        value_type=schema.Choice(
            vocabulary=u'bise.catalogue.actionvocabulary'
        )
    )

alsoProvides(ICatalogueTags, form.IFormFieldProvider)


class CatalogueTagVocabulary(object):
    grok.implements(IVocabularyFactory)

    @ram.cache(_cache_key)
    def get_contents(self):
        url = 'http://termite.eea.europa.eu/api/v1/shared_tags'
        data = requests.get(url)
        items = json.loads(data.content)
        return items

    def __call__(self, context):
        items = self.get_contents()
        terms = []
        i = 0
        for tagitem in items:
            kcontainer = tagitem.get('keyword_container')
            parent = kcontainer.get('title')
            for item in kcontainer.get('keywords'):
                value = item.get('keyword').get('name')
                if value:
                    terms.append(
                        OptgroupTerm(
                            value='{0}-{1}'.format(i, value),
                            token='{0}-{1}'.format(i, value),
                            title=value,
                            optgroup=parent)
                    )

                    i = i + 1
        return SimpleVocabulary(sorted(terms, lambda x, y: cmp(x.title, y.title)))

grok.global_utility(
    CatalogueTagVocabulary,
    name=u'bise.catalogue.tagvocabulary',
)


@ram.cache(_cache_key)
def get_contents():
    url = 'http://termite.eea.europa.eu/api/v1/shared_targets'
    data = requests.get(url)
    items = json.loads(data.content)
    return items


class TargetVocabulary(object):
    grok.implements(IVocabularyFactory)

    def __call__(self, context):
        targets = get_contents()
        terms = []
        for targetdict in targets:
            target = targetdict.get('target')
            target_title = target.get('title')
            target_id = target.get('id')
            terms.append(
                SimpleTerm(
                    value=target_title,
                    token=target_title,
                    title=target_title
                )
            )

        return SimpleVocabulary(sorted(terms, lambda x, y: cmp(x.title, y.title)))

grok.global_utility(
    TargetVocabulary,
    name=u'bise.catalogue.targetvocabulary',
)


class ActionVocabulary(object):
    grok.implements(IVocabularyFactory)

    def __call__(self, context):
        targets = get_contents()
        terms = []
        for targetdict in targets:
            target = targetdict.get('target')
            target_title = target.get('title')
            target_id = target.get('id')
            for action in target.get('strategy_actions'):
                action_title = action.get('title')
                terms.append(
                    SimpleTerm(
                        value=action_title,
                        token=action_title,
                        title=action_title
                    )
                )

        return SimpleVocabulary(sorted(terms, lambda x, y: cmp(x.title, y.title)))

grok.global_utility(
    ActionVocabulary,
    name=u'bise.catalogue.actionvocabulary',
)
