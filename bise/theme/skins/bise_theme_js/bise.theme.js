$(document).ready(function(){
	$("a[href*='http://']:not([href*='"+location.hostname.replace("www.","")+"'])").each(function() {
	  $(this).click(function(event) {
	     event.preventDefault();
	     event.stopPropagation();
	     window.open(this.href, '_blank');
	  })
	$("a[href*='http://']:not([href*='"+location.hostname.replace("www.","")+"']):not(:has(>img))").addClass('externalLink');
	});

	
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
                  'top': 158,
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
          }, 1000, 'sid', 'time', 'hideDelay', 'hideDelayTimer', 'beingShown', 'shown')
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
    showSubMenu('countries_and_networks');
    showSubMenu('networks');
    //});
  });
});