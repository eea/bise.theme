define(['jquery', 'underscore', 'backbone', 'models/facet', 'text!template/facet.html'],
  function($, _, Backbone, Facet, facetTemplate) {

  var FacetView = Backbone.View.extend({

    model: Facet,
    //tagName: "div",
    template: _.template(facetTemplate),
    isOpen: false,
    isShowingFirstTen: true,

    titles: {
      site: 'By Source',
      category: 'By Category',
      author: 'By Author',
      countries: 'By Country',
      biographical_region: 'By Biogeographical Region',
      languages: 'By Language',
      source_db: 'By Source Dataset',
      kingdom: 'By Kingdom',
      phylum: 'By Phylum',
      classis: 'By Classis',
      species_group: 'By Species Group',
      taxonomic_rank: 'By Taxonomic Rank',
      genus: 'By Genus',
      published_on: 'By Published Year',
      strategytarget: 'By Biodiversity Strategy Targets'
    },

    events: {
      "click .facet-input": "toggleFilter",
      "click .facet-header": "toggleCollapse",
      "click .facet-showmore": "toggleShowFirsts"
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.isOpen = Catalogue.containsFacetKey(this.model.title)
    },

    render: function() {
      this.setElement(this.template(this.model.toJSON()));
      if (!this.isOpen) this.$el.addClass('is-closed');
      if (this.isShowingFirstTen) this.$el.addClass('is-truncated');

      return this;
    },

    toggleFilter: function(e) {
      el = $(e.currentTarget);

      if (el.checked)
        Catalogue.mergeFacet(el.name, el.value)
      else
        Catalogue.removeFacet(el.name)  
    },

    titleFor: function(facet) {
      return this.titles[facet]
    },

    remove: function() {
      $(this.el).remove();
    },

    clear: function() {
      this.model.unbind('change', this.render, this);
      this.model.unbind('destroy', this.remove, this);
      this.model.destroy();
      this.remove();
    },

    toggleCollapse: function(e) {
      $(this.el).toggleClass('is-closed');
    },

    toggleShowFirsts: function(e) {
      $(this.el).toggleClass('is-truncated');
            $(this.el).find($('.search-more')).toggleClass('hidden');
      $(this.el).find($('.search-less')).toggleClass('hidden');
    }
  })
  return FacetView;
});
