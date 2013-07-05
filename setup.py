from setuptools import setup, find_packages
import os

version = '1.0'

setup(name='bise.theme',
      version=version,
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
          'z3c.jbot',
          'five.grok',
          'plone.app.dexterity [grok, relations]',
          'plone.app.contenttypes',
          'cs.folderishpage',
          'Products.feedfeeder',
          'Products.Collage',
          'collective.collage.portlets',
          'se.portlet.gallery',
          'collective.uploadify',
          'BAPDatabase',
          'sc.social.like',
          'bise.biodiversityfactsheet',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
