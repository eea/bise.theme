$(document).ready(function () {
    if (this.location.hash == '#crosslinkages') {

var elems = $('.collapsible');

var to_open = $("#wider-biodiversity")

elems.collapsiblePanel();
$.fn.collapsiblePanel = function(){};

        to_open.show();
        $("table.plain").parent().show();
      }

    });
