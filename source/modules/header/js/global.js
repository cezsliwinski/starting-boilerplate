var drawerButton = {
    init: function () {
        'use strict';
        var self = this;
        $('.b-header__drawer-button, .b-link').click(function() {
            self.toggle();
        });
    },

    toggle: function() {
        'use strict';
        $('.b-header__drawer-button').toggleClass('b-header__drawer-button--active');
        $('body').toggleClass('b-page--noscroll');
        $('.b-header__navigation').toggleClass('b-header__navigation--active');
    },

    remove: function() {
        'use strict';
        $('.b-header__navigation').removeClass('b-header__navigation--active');
        $('.b-header__drawer-button').removeClass('b-header__drawer-button--active');
        $('body').removeClass('b-page--noscroll');
    },

    navDeactive: function() {
        'use strict';
        $('.b-header__navigation').removeClass('b-header__navigation--active');
    },

    resize: function () {
        'use strict';
        var self = this;
        if($(window).width() > 1024) {
            self.remove();
        }
    }
};

$(document).ready(function(){
    'use strict';
    drawerButton.resize();
    drawerButton.init();
});

$(window).resize(function() {
    'use strict';
    drawerButton.resize();
});