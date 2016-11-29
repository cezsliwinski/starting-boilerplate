var bannerHeight = {
    init: function () {
        'use strict';
        var windowheight = $(window).height() - $('.b-layout__header').height();
        $('.b-banner').height(windowheight);
    }
};

$(document).ready(function(){
    'use strict';
    bannerHeight.init();
});