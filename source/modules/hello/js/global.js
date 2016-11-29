var bannerHeight = {
    init: function () {
        'use strict';
        var windowheight = $(window).height() - $('.b-header').height();
        var headlineheight = windowheight - $('.b-banner__treatments').height() - $('.b-banner__clinics').height() - 80;
        $('.b-banner').height(windowheight);
        $('.b-banner__headline').height(headlineheight);
    }
};

$(document).ready(function(){
    'use strict';
    bannerHeight.init();
});