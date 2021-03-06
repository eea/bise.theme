from setuptools import setup, find_packages
import os

NAME = 'bise.theme'
PATH = NAME.split('.') + ['version.txt']
VERSION = open(os.path.join(*PATH)).read().strip()

setup(name=NAME,
      version=VERSION,
      description="Installable theme: bise.theme",
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        ],
      keywords='',
      author='CodeSyntax & Bilbomatica',
      author_email='mlarreategi@codesyntax.com',
      url='https://github.com/eea/bise.theme',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['bise'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'Products.CMFPlone',
          'z3c.jbot',
          'plone.app.dexterity [relations]',
          'plone.app.contenttypes',
          'cs.folderishpage',
          'Products.feedfeeder',
          'Products.Collage',
          'collective.collage.portlets',
          'se.portlet.gallery',
          'collective.uploadify',
          'BAPDatabase',
          'sc.social.like',
          'bise.catalogueindexer',
          'bise.biodiversityfactsheet',
          'cs.editablefooter',
          'collective.js.jqueryui',
          'Products.Ploneboard',
          'z3c.unconfigure',
          'Products.PloneGlossary',
          'bise.multilingualglossary',
          'collective.transmogrifier',
          'plone.app.transmogrifier',
          'Products.RedirectionTool',
          'plone.api',
          'plone.app.iterate',
          'plone.app.versioningbehavior',
          'plone.app.referenceablebehavior',
          'requests',
          'z3c.formwidget.optgroup',
          # -*- Extra requirements: -*-
          'BeautifulSoup',
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
