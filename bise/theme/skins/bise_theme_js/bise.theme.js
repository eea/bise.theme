$(document).ready(function(){
  $("a[href*='http://']:not([href*='"+location.hostname.replace("www.","")+"'])").each(function() {
    $(this).click(function(event) {
       event.preventDefault();
       event.stopPropagation();
       window.open(this.href, '_blank');
    })
  $("a[href*='http://']:not([href*='"+location.hostname.replace("www.","")+"']):not(:has(>img))").addClass('externalLink');
  });
  $("a[href*='https://']:not([href*='"+location.hostname.replace("www.","")+"'])").each(function() {
    $(this).click(function(event) {
       event.preventDefault();
       event.stopPropagation();
       window.open(this.href, '_blank');
    })
  $("a[href*='https://']:not([href*='"+location.hostname.replace("www.","")+"']):not(:has(>img))").addClass('externalLink');
  });

  $("a[href*='@@iterate_diff']").hide();

  // automatically hide all div.field that have only a hidden input inside
  var $hiddenInputs = $(".field input[type=hidden]");
  if( $hiddenInputs.length > 0 ) {

    jQuery.each( $hiddenInputs, function(i, input) {
      var $hiddenInput = $(this);
      count = $hiddenInput.parent().find("select, radio, textarea, input[type!='hidden']").length;
      if( count === 0 ) {
        $hiddenInput.parent().css("display", "none");
      }
    });

  }

  //jQuery('body').bugme({remember:false});

  // if ($("#form-widgets-ICatalogueTags-cataloguetags").length){
  //   $("#form-widgets-ICatalogueTags-cataloguetags").chosen({width: "100%", placeholder_text_multiple: "Select tags"});
  // }

  var $tags = $("#form-widgets-ICatalogueTags-cataloguetags");


  // create the selectivize based tag selection widget
  if ($tags.length){

    var data = [];
    $("optgroup", $tags).each(function(i, v){

      var $optgroup = $(v);
      var label = $optgroup.attr('label');
      var branch = {
        id: i + 100,
        text: label,
          // submenu: {items: [], showSearchInput:false}
        children: []
      };

      var submenus = {};  // a list of all submenus

      // an optiongroup has multiple options. We want to group
      // options that have : in them to a separate submenu

      $('option', $optgroup).each(function(k, l){

        var label = $(l).html();
        var id = $(l).attr('value');
        var entry = {id: id, text: label};

        var m = label.match(/(.+?):(.+?)$/);

        if ((m !== null) && (m.length === 3)) {
          var root = m[1];
          var leaf = m[2];
          if (!(root in submenus)) {
            submenus[root] = {
              id: id,
              text: root,
              submenu: {items:[], showSearchInput: false},
            };
          }
          submenus[root].submenu.items.push({id: id, text: leaf});
        } else {
          // branch.submenu.items.push(entry);
          branch.children.push(entry);
        }

      });

      // for (var key in submenus) {
      //   branch.submenu.items.unshift(submenus[key]);
      // }
      for (var key in submenus) {
        branch.children.unshift(submenus[key]);
      }
      data.push(branch);

    });

    // change the select to div, this way selectivize doesn't use the select options
    var $sel = $("<div>");
    $tags.after($sel).hide();

    var sel = $sel.selectivity(
      {'multiple': true, items: data, 'placeholder': 'Select tags' }
    );
    sel.selectivity('value', $tags.val());

    sel.on("selectivity-selected", function(){
      // strip the id numbers from the selected values
      // var opts = $.map(sel.selectivity('value'), function(v){
      //   return v.match(/^(\d+?)-(.*)/)[2];
      // });
      var opts = sel.selectivity('value');
      $tags.val(opts);
    });
  };


  if($("select#form-widgets-title").length){
    $("select#form-widgets-title").chosen(
      {width: "100%"}
    );
  }


  if ($("#form-widgets-ICatalogueTags-actions").length){
    $("#form-widgets-ICatalogueTags-actions").chosen({width: "100%", placeholder_text_multiple: "Select actions"});
  }

  if ($("#form-widgets-ICatalogueTags-targets").length){
    $("#form-widgets-ICatalogueTags-targets").chosen({width: "100%", placeholder_text_multiple: "Select targets"});
  }

  $('.scrollingtext').bind('marquee', function() {
      var ob = $(this);
      var tw = ob.width();
      var ww = ob.parent().width();
      ob.closest(".collage-row").css({backgroundColor: "rgb(117, 173, 10)"});
      ob.find("a").css({color: "white"});
      ob.parent().css({overflow: "hidden"});
      ob.parent().css({position: "relative"});
      ob.css({position: "absolute"});
      ob.css({whiteSpace:"nowrap"});
      ob.css({ right: -tw });
      ob.css({ top: 0 });
      ob.animate({ right: tw }, 20000, 'linear', function() {
          ob.trigger('marquee');
      });
  }).trigger('marquee');

  if($("#counter").length){
    var oneDay = 24*60*60*1000;
    var firstDate = new Date(2020,11,31,23,59);
    var secondDate = new Date();

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    $("#daysLeft").html(diffDays);
    $("#counter").show();
  }

  $(function () {
    //$('#wrap_menuBise ul').each(function () {
      function showSubMenu(sid){
        var time = 200;
        var hideDelay = 200;
        var hideDelayTimer = null;
        var beingShown = false;
        var shown = false;
        //var trigger = '#wrap_menuBise ul li div#' + sid + ', .submenunav.' + sid;
        var trigger = '#portal-globalnav li div#portaltab-' + sid + ', #portalsubtabs-' + sid;
        trigger = $(trigger);
        //var sid;// = 'menuOp3';

        $(trigger).mouseenter(function (e) {
          if (beingShown || shown){
            if (hideDelayTimer) {
                clearTimeout(hideDelayTimer);
              }
          }else{
          $(this).addClass("hasFocus");
          setTimeout(function(){
            if ($('#portaltab-' + sid).hasClass("hasFocus")){
              $('#portaltab-' + sid).removeClass("hasFocus");
              if($('#portal-globalnav li div').data('hover')){
                sid = $('#portal-globalnav li div').attr('id');
              }
              /**sid = $(e.target.parentNode).attr('id');
              if (sid == undefined){
                sid = $(e.target).attr('id');
              }*/

              if (hideDelayTimer) {
                clearTimeout(hideDelayTimer);
              }

              if (beingShown || shown) {
                // don't trigger the animation again
                return;
              } else {
                beingShown = true;
                //left = $(this).offset().left;
                left = $('#portaltab-' + sid).offset().left - $('#portal-globalnav').offset().left;
                width = $('#portalsubtabs-' + sid).width() + parseInt($('#portalsubtabs-' + sid).css("padding-left")) + parseInt($('#portalsubtabs-' + sid).css("padding-right"));
                if (left + width > $('#portal-globalnav').width()){
                  //left = $('#portaltab-' + sid).offset().left + parseInt($('#portaltab-' + sid).css("padding-left")) + parseInt($('#portaltab-' + sid).css("padding-right")) + $('#portaltab-' + sid).width()  - width;
                  left = $('#portaltab-' + sid).offset().left - $('#portal-globalnav').offset().left + $('#portaltab-' + sid).width() - width;
                  //left = $('#wrap_menuBise').width() + $('#wrap_menuBise').offset().left - width;
                }
                $('#portalsubtabs-' + sid).css({
                  'position': 'absolute',
                  'top': 155,
                  'left': left,
                  'display': 'block'
                }).animate({
                  opacity: 1
                },
                time, 'swing', function() {
                  beingShown = false;
                  shown = true;
                });
              }

              return false;
            }
          }, 1, 'sid', 'time', 'hideDelay', 'hideDelayTimer', 'beingShown', 'shown');
          //}, 1000, 'sid', 'time', 'hideDelay', 'hideDelayTimer', 'beingShown', 'shown');
          }
        }).mouseleave(function () {
          $(this).removeClass("hasFocus");
          if (hideDelayTimer) {
            clearTimeout(hideDelayTimer);
          }

          hideDelayTimer = setTimeout(function () {
            hideDelayTimer = null;
            $('#portalsubtabs-' + sid).animate({
              opacity: 0
            },
            time, 'swing', function () {
              shown = false;
              $('#portalsubtabs-' + sid).css('display', 'none');
            });
          }, hideDelay);

          return false;
        });
    }

    showSubMenu('topics');
    showSubMenu('policy');
    showSubMenu('data');
    showSubMenu('research');
    showSubMenu('countries');
    showSubMenu('networks');
    //});
  });
  if ($("body").hasClass("section-chm-network")){
    if ($("#map_chm-networks").length !== 0){
      $.ajax({
        type: 'GET',
        url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fdaviz.eionet.europa.eu%2Fvisualisations%2Fnational-chms-in-europe%2Fdownload.json%22&format=json&diagnostics=true&callback=cbfunc',
        async: false,
        jsonpCallback: 'cbfunc',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
          result = $.parseJSON(json.query.results.body.p);
          countries = new Object();
          $.each(result.results.bindings, function(key, value) {
            country = new Object();
            countryCode = ""
            for (name in value){
              if (name == "country_code"){
                countryCode = value[name].value;
              }else{
                country[name] = value[name].value;
               }
            }
            countries[countryCode] = country;
          });
          $('#Map area').each(function () {
            $(this).attr("title", countries[$(this).attr('data-code')].country);
            $(this).click(function (e) {
              e.preventDefault();
              $('#infobox').hide();
              var country = $(this).attr('data-code');
              $('#infobox-country').html(countries[country].country);
              if (countries[country]){
                //$('#infobox-contact').html(countries[country].contact.replace(/\r?\n|\r/g, "<br>"));
                var contact = "";
                contact += countries[country].name1;
                if (countries[country].charge1 != "") contact += "<br>" + countries[country].charge1;
                if (countries[country].address1_1 != "") contact += "<br>" + countries[country].address1_1;
                if (countries[country].address1_2 != "") contact += "<br>" + countries[country].address1_2;
                if (countries[country].address1_3 != "") contact += "<br>" + countries[country].address1_3;
                if (countries[country].address1_4 != "") contact += "<br>" + countries[country].address1_4;
                if (countries[country].address1_5 != "") contact += "<br>" + countries[country].address1_5;
                if (countries[country].telephone1 != "") contact += "<br> Tel:" + countries[country].telephone1;
                if (countries[country].fax1 != "") contact += "<br> Fax:" + countries[country].fax1;
                var regEx = /(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/;
                if (countries[country].email1 != "") {
                  if (countries[country].email1.match(regEx)){
                    contact += "<br>" + countries[country].email1.replace(regEx, "<a href=\"mailto:$1\">$1</a>");
                  }
                  //countries[country].email1.match(regEx).each(function(){contact += "<br>" + countries[country].email1.replace(regEx, "<a href=\"mailto:$1\">$1</a>")})
                }
                if (countries[country].name2 != ""){
                  contact += "<hr>" + countries[country].name2;
                }
                if (countries[country].charge2 != "") contact += "<br>" + countries[country].charge2;
                if (countries[country].address2_1 != "") contact += "<br>" + countries[country].address2_1;
                if (countries[country].address2_2 != "") contact += "<br>" + countries[country].address2_2;
                if (countries[country].address2_3 != "") contact += "<br>" + countries[country].address2_3;
                if (countries[country].address2_4 != "") contact += "<br>" + countries[country].address2_4;
                if (countries[country].address2_5 != "") contact += "<br>" + countries[country].address2_5;
                if (countries[country].telephone2 != "") contact += "<br> Tel:" + countries[country].telephone2;
                if (countries[country].fax2 != "") contact += "<br> Fax:" + countries[country].fax2;
                var regEx = /(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/;
                if (countries[country].email2 != "") {
                  if (countries[country].email2.match(regEx)){
                    contact += "<br>" + countries[country].email2.replace(regEx, "<a href=\"mailto:$1\">$1</a>");
                  }
                }
                $('#infobox-contact').html(contact);
                $('#infobox-url').html(countries[country].url);
                $('#infobox-url').attr("href", countries[country].url);
                if (countries[country].url != ""){
                  $('#infobox-url').addClass('externalLink');
                }else{
                  $('#infobox-url').removeClass('externalLink');
                }
                $('#infobox-host').html(countries[country].host.replace(/\r?\n|\r/g, "<br>"));
                $('#infobox-organisation').html(countries[country].organisation.replace(/\r?\n|\r/g, "<br>"));
              }else{
                $('#infobox-contact').html("");
                $('#infobox-url').html("");
                $('#infobox-url').attr("href", "");
                $('#infobox-url').removeClass('externalLink');
                $('#infobox-host').html("");
                $('#infobox-organisation').html("");
              }
              var top = e.pageY;


              var $body = $(this.ie6 ? document.body : document);
              if (e.pageY + $('#infobox').height() + 4 > $(window).height() + $body.scrollTop()){
                top = $(window).height() + $body.scrollTop() + 4 - $('#infobox').height() - 9;

              }else{
                top = top - 44;
              }
              var arrowTop = e.pageY - top - 12;
              if (arrowTop < 0) arrowTop = 0;
              /**$('#infobox-arrow-border').css({
                'top': arrowTop
              });
              $('#infobox-arrow').css({
                'top': arrowTop
              }) */
              $('#infobox').css({
                'left': e.pageX - $('#infobox').parent().offset().left + 10,
                'top': e.pageY - $('#infobox').parent().offset().top - 36
              }).show(100);
              /**$('#infobox').css({
                'left': e.pageX + 10 - 450,
                'top': top - 210
              }).show(100);*/
            });
          })
          $('#infobox-close').click(function(){
            $('#infobox').hide(100);
          })
        },
        error: function(e) {
          console.log(e.message);
        }
      });
        }
      }

  // fix warning messages from plone.app.iterate
  var $warnings = $(".portalMessage.info:contains('Warning')");
  if($warnings.length){
    $warnings.removeClass('info').addClass('warning');
  }

  var beforePrint = function() {
    // Before print event that wraps images without an 'a' element
    $('img').each(function (index, value) {
      if ($(value).parent('a').length < 1) {
        $(value).wrap('<a href="' + value.src + '" target="_blank"></a>');
      }
    })

    // Add window location to anchors
    $('a').each(function(index, value) {
      if ($(value).attr("href")) {
        var href = $(value).attr("href").match(/#/);
        if (href) {
          $(value).attr("href", $(value)[0].baseURI + $(value)[0].hash);
        }
      }
    });
  };

  var afterPrint = function() {
    // placeholder
  };

  if (window.matchMedia) {
      var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function(mql) {
          if (mql.matches) {
              beforePrint();
          } else {
              afterPrint();
          }
      });
  }
  window.onbeforeprint = beforePrint;
  window.onafterprint = afterPrint;
});
