define([
  'jquery', 'underscore', 'backbone', 'jqcloud', 'bootstrap',
  'collections/results', 'views/results',
  'views/library', 'views/facet', 'text!template/main.html'],
  function($, _, Backbone, jQCloud, Bootstrap,
    ResultsCollection, ResultView,
    LibraryView, FacetView, mainTemplate){

  var AppView = Backbone.View.extend({

    searchType: null,
    host: null,
    el: $("#catalogue-app"),
    mainTemplate: _.template(mainTemplate),

    bise_indexes: {
      documents: 'Documents', links: 'Links', articles: 'Web Pages'
    },
    all_indexes: {
      documents: 'Documents', links: 'Links', articles: 'Web Pages',
      species: 'Species Info', habitats: 'Habitat Types Info', protected_areas: 'Sites Info'
    },

    // Structure to query backend
    queryparams: {
      indexes: [],
      query: '',
      page: 1,
      per: 10,
      // sort_on: 'alphabetic'
      sort_on: 'publish_date'
    },

    events: {
      "submit #catalogue-search-form": "fillQueryAndRun",
      "change #catalogue-sort":        "setSorting",
      "change #catalogue-per-page":    "setPerPage",
      "click .catalogue-previous":     "goPrevPage",
      "click .catalogue-next":         "goNextPage"
    },

    initialize: function(options) {
      _.bindAll(this, 'addOne', 'addAll', 'render',
                'mergeFacet', 'removeFacet', 'isFacetSelected')

      // Fix for IE8
      $.support.cors = true;
      this._checkIE();

      // Add main template
      $(this.$el.selector).append(this.mainTemplate)

      // Options
      this.host = options['host']

      // Check search type
      // if (this.$el.data('type') === 'advanced'){
      //   this.searchType = 'advanced'
      //   this.queryparams.indexes = Object.keys(this.all_indexes);
      // } else {
      //   this.searchType = 'bise'
      //   this.queryparams.indexes = Object.keys(this.bise_indexes);
      // }
      this.searchType = 'advanced'
      // this.queryparams.indexes = Object.keys(this.all_indexes);
      this.queryparams.indexes = Object.keys(this.bise_indexes);

      // Get query
      q = this.$el.data('query')
      if (q != null && q !== '') {
        this.queryparams.query = q;
        $('#catalogue-search-input').val(q);
        $('#catalogue-sort').val('');   // setting sorting to relevance
        this.queryparams.sort_on = '';
      } else {
        this.queryparams.sort_on = 'publish_date';
        $("#catalogue-sort").val('publish_date');
      }

      // If CORS not enabled in IE8, show message to activate it
      if (this._isIE() === 8){
        $('.catalogue-ie-msg').show()
      }

      this.refreshEndpoint();
      // $('.catalogue-loading .gif').hide()
      if (this.queryparams.query) {
        this.runQuery()
      } else {
        // this.$('.catalogue-statistics').show();
        this._drawSearches();

        this._renderStatistics();
        this.$('.catalogue-statistics').show();
        this.$('.catalogue-available-content').show();
      };
    },

    /***************************************************************************
     * Catalogue methods
     **************************************************************************/

    // Refresh data from endpoint
    refreshEndpoint: function(){
      $('.catalogue-loading .gif').show()
      this.Results = new ResultsCollection(this._getEndpoint())
      this.Results.bind('add', this.addOne)
      this.Results.bind('reset', this.addAll)
      this.Results.bind('all', this.render)
    },

    runQuery: function(){
      this.$('.catalogue-loading .gif').show()
      this.$('.catalogue-aside').show();
      this.$('.catalogue-pagination').show();
      this.$('.catalogue-loading').show();
      this.Results.fetch({ data: $.param(this.queryparams) })
    },

    fillQueryAndRun: function(e){
      e.preventDefault()
      $searchEl = $('#catalogue-search-input');
      var q = $searchEl.val()
      if (q === 'undefined') q = ''
      $searchEl.val('');
      this.queryparams = {
        indexes: this._getSelectedCategories(),
        query: q.replace(/(<([^>]+)>)/ig,""),
        page: 1, per: 10,
        sort_on: ''     // default sort order is relevance, aka ''
      }
      $('#catalogue-sort').val('');
      $searchEl.val(q);
      this.runQuery()
    },

    // Search Options
    setSorting: function(e){
      this.queryparams.sort_on = $('#catalogue-sort').val()
      this.runQuery()
    },
    setPerPage: function(e){
      this.queryparams.page = 1
      this.queryparams.per = $('#catalogue-per-page').val()
      // this.queryparams.per = parseInt($(e.target).html());
      this.runQuery()
    },
    goPrevPage: function(e){
      if (this.queryparams.page > 1){
        this.queryparams.page -= 1;
        this.runQuery()
      }
      return false;
    },
    goNextPage: function(e){
      if (this.queryparams.page < this._getLastPage()){
        this.queryparams.page += 1;
        this.runQuery()
      }
      return false;
    },


    /*
     * PRIVATE METHODS
     */

    // Minor fix to allow Object.keys in IE8
    _checkIE: function(){
      if (!Object.keys) {
        Object.keys = function(obj) {
          var keys = [];
          for (var i in obj) {
            if (obj.hasOwnProperty(i)) keys.push(i);
          }
          return keys;
        };
      }
    },

    // Returns IE version or false
    _isIE: function() {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    },

    // Returns API endpoint (BISE or Advanced Search)
    _getEndpoint: function(){
      this.url = 'http://'+this.host+'/api/v1/'
      if (this.searchType === 'advanced') this.url += 'search'
      else this.url += 'bise_search'
      return this.url;
    },

    // Returns array of selected indexes
    _getSelectedCategories: function(){
      var array = _.map(this.$('#catalogue-categories input:checked'), function (x){
        return $(x).val()
      })
      if (_.isEmpty(array)) array = _.map(this.$('#catalogue-categories input'), function (x){
        return $(x).val()
      })
      return array
    },

    // Render the pagination
    _drawPagination: function(){
      this.$el.find('.catalogue-status').html(
        'Page ' + this.queryparams.page +
        ' of ' + this._getLastPage()
      );

      next = this.$('.catalogue-next')[0];
      prev = this.$('.catalogue-previous')[0];

      // next
      if (this.queryparams.page == this._getLastPage())
        next.setAttribute('disabled', 'disabled');
      else
        next.removeAttribute('disabled', 'disabled');

      // prev
      if (this.queryparams.page == 1)
        prev.setAttribute('disabled', 'disabled');
      else
        prev.removeAttribute('disabled', 'disabled');
    },
    _getLastPage: function(){
      var pages = Math.floor(this.Results.total / this.queryparams.per)
      if (this.Results.total % this.queryparams.per > 0)
        pages += 1;
      return pages;
    },

    // Renders the performed search information
    _drawSearches: function(){
      var text = '';
      var esc = new Backbone.Model({text:this.queryparams.query});
      if (this.Results.total != undefined) {
        text = text.concat(
          this.Results.total + ' ' +
          (this.Results.total === 1 ? 'result' : 'results')
        );
      }
      // if (this.queryparams.query != '' && this.queryparams.query != undefined) {
      //   $('#catalogue-search-input').val(this.queryparams.query);
      //   text = text.concat('for <em>' + esc.escape('text') + '</em>');
      // }
      this.$('.catalogue-query').html(text);
    },

    // Renders Library filters
    _drawLibraries: function(){
      if (_.has(this.Results.facets, 'site')){
        facet = this.Results.facets['site']

        this.$('.catalogue-libraries').html('')
        m = new Backbone.Model(facet)
        this.$(".catalogue-libraries").append( $('<ul>') )
        new LibraryView({
          el: this.$('.catalogue-libraries ul'),
          model: m
        }).render()
      } else {
        console.log(':: no facet for libraries...')
      }
    },

    // Renders available categories
    _drawCategories: function(){
      this.$("#catalogue-categories .facet-body").html('');

      var categoryFacet = $('<ul>');

      for (var k in this.all_indexes) {
        item = this._addWrappedCategory(k);
        categoryFacet.append(item);
      }

      categoryFacet.find('input').on('change', $.proxy(this.fillQueryAndRun, this));

      this.$("#catalogue-categories .facet-body").append(categoryFacet);
    },
    _addWrappedCategory: function(key, checked){
      var checked = _.contains(this.queryparams.indexes, key)
      if (this.queryparams.indexes.length == 0) checked = true;
      var input = $('<input>', {
        'type': 'checkbox',
        'id': key,
        'name': key,
        'value': key,
        'class': 'facet-input hidden-input',
        'checked': checked
      });
      var label = $('<label>', {
        'for': key,
        'text': this.all_indexes[key]
      });
      return $('<li>', {
        'class': 'facet-item'
      }).append(input, label);
    },

    // Renders facets on sidebar
    _drawFacets: function(){
      this.$("#catalogue-facets").html('')
      if (this.Results.total > 0){
        facet_names = Object.keys(_.omit(this.Results.facets, 'site'))
        for (var i=0; i < facet_names.length; i++){
          title = facet_names[i]
          facet = this.Results.facets[title]

          if ((typeof(facet.terms) != 'undefined' && facet.terms.length > 0) ||
              (typeof(facet.entries) != 'undefined' && facet.entries.length > 0)){

            m = new Backbone.Model(facet)
            m.title = title

            var facet = new FacetView({
              // el: this.$('.facet'),
              model: m
            }).render();

            $("#catalogue-facets").append(facet.el);
          }
        }
      }
    },

    // TODO: Add suggestions for searches
    _drawSuggestions: function(){

    },

    // Show / Hide different sections when results found or not.
    _showResults: function(){
      this.$('.catalogue-libraries').show()
      this.$('.catalogue-container').show()
      this.$('.catalogue-navigation-bar').show()

      this.$('.catalogue-no-results').hide()
      this.$('.catalogue-statistics').hide()
      this.$('.catalogue-available-content').hide()
      this._drawPagination()
    },
    _showNoResults: function(){
      this.$('.catalogue-libraries').hide()
      this.$('.catalogue-container').hide()
      this.$('.catalogue-navigation-bar').hide()

      this.$('.catalogue-no-results').show()
      this.$('.catalogue-statistics').show()
      this.$('.catalogue-available-content').show()
      this._renderStatistics()
      // Reset categories, if nothing found
      if (this.$el.data('type') === 'advanced')
        this.queryparams.indexes = Object.keys(this.all_indexes);
      else
        this.queryparams.indexes = Object.keys(this.bise_indexes);
    },


    // Renders statistics if no results found...
    _renderStatistics: function(){
      $.get("http://"+this.host+"/api/v1/stats.json", function( data ) {
        // Show cloud tags
        if (!$('.catalogue-cloud-tags').hasClass('jqcloud')){
          $('.catalogue-cloud-tags').jQCloud(data.tags);
        }

        // Render last added content
        _.each(data.last, function(item){
          var cell = $('<li>').addClass('catalogue-cell')
          var link = $('<a>').attr('href', item.link).html(item.title)
          cell.append($('<div>').addClass('cell-title').append(link))

          var subtitle = $('<div>').addClass('cell-subtitle')
          subtitle.append($('<strong>').html(item.type))
          subtitle.append('&nbsp;').append(item.published_on)
          cell.append(subtitle)
          $('.catalogue-last-added').append(cell)
        });

        // Render count of iterms in the catalogue
        _.each(data.counts, function(count, item){
          $('.catalogue-available-content .span2.'+item+' > h1').html(count)
        });
      });
    },

    /***************************************************************************
     * FACETS
     **************************************************************************/
    mergeFacet: function(key, value){
      this.queryparams[key] = value
      // multiple params allowed version
      // if (!this.queryparams[key]) this.queryparams[key] = [];
      // this.queryparams[key].push(value)
      //
      this.queryparams['page'] = 1
      this.runQuery()
    },
    removeFacet: function(key, value) {
      // multiple params allowed version
      // var i = this.queryparams[key].indexOf(value);
      // if (i > -1) this.queryparams[key].splice(i);
      delete this.queryparams[key];
      this.queryparams['page'] = 1
      this.runQuery()
    },
    containsFacetKey: function(key){
      if (_.has(this.queryparams, key)) return true
      return false
    },
    isFacetSelected: function(key, value){
      // If no value passed, will check if exist on queryparams
      if (value === undefined && !this.queryparams.hasOwnProperty(key))
        return true
      // Checks if key present and contains value
      if (_.has(this.queryparams, key))
        // multiple params allowed version
        // if (_.contains(this.queryparams[key], value))
        if (this.queryparams[key] == value)
          return true
      return false
    },

    /***************************************************************************
     * Backbone
     **************************************************************************/
    render: function() {
      this._drawSearches();
      this._drawLibraries();
      this._drawCategories();
      this._drawFacets();
      this._drawSuggestions();
      if (this.Results.total == 0)
        this._showNoResults(); else this._showResults();
      $('.catalogue-loading .gif').hide()
    },
    addOne: function(result) {
      var view = new ResultView({model: result})
      this.$("#catalogue-results").append(view.render().el)
    },
    addAll: function() {
      this.$('#catalogue-results').html('')
      this.Results.each(this.addOne)
    }
  })
  return AppView
})
// vim: set ts=2 sw=2 ai e
