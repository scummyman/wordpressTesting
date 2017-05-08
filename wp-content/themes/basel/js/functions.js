var baselThemeModule;

(function($) {
    "use strict";

    baselThemeModule = (function() {


        var baselTheme = {
            popupEffect: 'mfp-move-horizontal',
            supports_html5_storage: false,
            ajaxLinks: '.basel-product-categories a, .widget_product_categories a, .widget_layered_nav_filters a, .filters-area a, .woocommerce-pagination a, .basel-woocommerce-layered-nav a, .widget_product_tag_cloud a'
        };

        /* Storage Handling */
        try {
            baselTheme.supports_html5_storage = ( 'sessionStorage' in window && window.sessionStorage !== null );

            window.sessionStorage.setItem( 'basel', 'test' );
            window.sessionStorage.removeItem( 'basel' );
        } catch( err ) {
            baselTheme.supports_html5_storage = false;
        }

        return {

            init: function() {

                this.fixedHeaders();

                this.verticalHeader();

                this.splitNavHeader();

                this.visibleElements();

                this.bannersHover();

                this.parallax();

                this.googleMap();

                this.scrollTop();

                this.quickViewInit();

                this.quickShop();

                this.sidebarMenu();

                this.addToCart();

                this.productImages();

                this.productImagesGallery();

                this.stickyDetails();

                this.mfpPopup();

                this.swatchesVariations();

                this.swatchesOnGrid();

                this.blogMasonry();

                this.blogLoadMore();

                this.productsLoadMore();

                this.productsTabs();

                this.portfolioLoadMore();

                this.equalizeColumns();

                this.menuSetUp();

                this.menuOffsets();

                this.onePageMenu();

                this.mobileNavigation();

                this.simpleDropdown();

                this.woocommerceWrappTable();

                this.wishList();

                this.compare();

                this.promoPopup();

                this.cookiesPopup();

                this.productVideo();

                this.product360Button();

                this.btnsToolTips();

                this.stickyFooter();

                this.updateWishListNumberInit();

                this.cartWidget();

                this.ajaxFilters();

                this.shopPageInit();

                this.filtersArea();

                this.categoriesMenu();

                this.searchFullScreen();

                this.loginTabs();

                this.productAccordion();

                this.productCompact();

                this.countDownTimer();

                this.mobileFastclick();

                this.nanoScroller();

                this.RTL();

                this.woocommerceComments();

                this.AJAXRemoveFromCart();

                this.woocommerceQuantity();

                this.init_zoom();
              
                $(window).resize();

                $('body').addClass('document-ready');

                $(document.body).on('updated_cart_totals', function() {
                    baselThemeModule.woocommerceWrappTable();
                });

            },


            init_zoom: function() {
                if ( basel_settings.zoom_enable != 'yes' ) return false;

                var $zoomTarget = $( '.woocommerce-product-gallery__image:not(:first)' ),
                    zoomEnabled = false;

                $( $zoomTarget ).each( function( index, target ) {
                    var image = $( target ).find( 'img' );
                    if ( image.data( 'large_image_width' ) > $( '.woocommerce-product-gallery' ).width() ) {
                        zoomEnabled = true;
                        return false;
                    }
                } );

               // But only zoom if the img is larger than its container.
                if ( zoomEnabled ) {
                    var zoom_options = {
                        touch: false
                    };

                    if ( 'ontouchstart' in window ) {
                        zoom_options.on = 'click';
                    }

                    $zoomTarget.trigger( 'zoom.destroy' );
                    $zoomTarget.zoom( zoom_options );
                }
            },

            fixedHeaders: function(){

                var getHeaderHeight = function() {
                    var headerHeight = header.outerHeight();

                    if( body.hasClass( 'sticky-navigation-only' ) ) {
                        headerHeight = header.find( '.navigation-wrap' ).outerHeight();
                    }

                    return headerHeight;
                };

                var headerSpacer = function() {
                    if(stickyHeader.hasClass(headerStickedClass)) return;
                    $('.header-spacing').height(getHeaderHeight()).css('marginBottom', 40);
                };

                var body = $("body"),
                    header = $(".main-header"),
                    stickyHeader = header,
                    headerHeight = getHeaderHeight(),
                    headerStickedClass = "act-scroll",
                    stickyClasses = '',
                    stickyStart = 0,
                    links = header.find('.main-nav .menu>li>a');

                if( ! body.hasClass('enable-sticky-header') || body.hasClass('global-header-vertical') || header.length == 0 ) return;

                var logo = header.find(".site-logo").clone().html(),
                    navigation = header.find(".main-nav").clone().html(),
                    rightColumn = header.find(".right-column").clone().html();

                var headerClone = [
                    '<div class="sticky-header header-clone">',
                        '<div class="container">',
                            '<div class="site-logo">' + logo + '</div>',
                            '<div class="main-nav site-navigation basel-navigation">' + navigation + '</div>',
                            '<div class="right-column">' + rightColumn + '</div>',
                        '</div>',
                    '</div>',
                ].join('');


                if( $('.topbar-wrapp').length > 0 ) {
                    stickyStart = $('.topbar-wrapp').outerHeight();
                }

                if( body.hasClass( 'sticky-header-real' ) ) {
                    var headerSpace = $('<div/>').addClass('header-spacing');
                    header.before(headerSpace);

                    $(window).on('resize', headerSpacer);

                    var timeout;

                    $(window).on("scroll", function(e){
                        if($(this).scrollTop() > stickyStart){
                            stickyHeader.addClass(headerStickedClass);
                        }else {
                            stickyHeader.removeClass(headerStickedClass);
                            clearTimeout( timeout );
                            timeout = setTimeout(function() {
                                headerSpacer();
                            }, 200);
                        }
                    });

                } else if( body.hasClass( 'sticky-header-clone' ) ) {
                    header.before( headerClone );
                    stickyHeader = $('.sticky-header');
                }

                // Change header height smooth on scroll
                if( body.hasClass( 'basel-header-smooth' ) ) {

                    $(window).on("scroll", function(e){
                        var space = ( 120 - $(this).scrollTop() ) / 2;

                        if(space >= 60 ){
                            space = 60;
                        } else if( space <= 30 ) {
                            space = 30;
                        }
                        links.css({
                            paddingTop: space,
                            paddingBottom: space
                        });
                    });

                }

                if(body.hasClass("basel-header-overlap") || body.hasClass( 'sticky-navigation-only' )){
                }


                if(!body.hasClass("basel-header-overlap") && body.hasClass("sticky-header-clone")){
                    header.attr('class').split(' ').forEach(function(el) {
                        if( el.indexOf('main-header') == -1 && el.indexOf('header-') == -1) {
                            stickyClasses += ' ' + el;
                        }
                    });

                    stickyHeader.addClass(stickyClasses);

                     $(window).on("scroll", function(e){
                        if($(this).scrollTop() > headerHeight + 30){
                            stickyHeader.addClass(headerStickedClass);
                        }else {
                            stickyHeader.removeClass(headerStickedClass);
                        }
                    });
                }

                body.addClass('sticky-header-prepared');
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Vertical header
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

             verticalHeader: function() {

                var $header = $('.header-vertical').first();

                if( $header.length < 1 ) return;

                var $body, $window, $sidebar, top = false,
                    bottom = false, windowWidth, adminOffset, windowHeight, lastWindowPos = 0,
                    topOffset = 0, bodyHeight, headerHeight, resizeTimer, Y = 0, delta,
                    headerBottom, viewportBottom, scrollStep;

                $body          = $( document.body );
                $window        = $( window );
                adminOffset    = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

                $window
                    .on( 'scroll', scroll )
                    .on( 'resize', function() {
                        clearTimeout( resizeTimer );
                        resizeTimer = setTimeout( resizeAndScroll, 500 );
                    } );

                resizeAndScroll();

                for ( var i = 1; i < 6; i++ ) {
                    setTimeout( resizeAndScroll, 100 * i );
                }


                // Sidebar scrolling.
                function resize() {
                    windowWidth = $window.width();

                    if ( 1024 > windowWidth ) {
                        top = bottom = false;
                        $header.removeAttr( 'style' );
                    }
                }

                function scroll() {
                    var windowPos = $window.scrollTop();

                    if ( 1024 > windowWidth ) {
                        return;
                    }

                    headerHeight   = $header.height();
                    headerBottom   = headerHeight + $header.offset().top;
                    windowHeight   = $window.height();
                    bodyHeight     = $body.height();
                    viewportBottom = windowHeight + $window.scrollTop();
                    delta          = headerHeight - windowHeight;
                    scrollStep     = lastWindowPos - windowPos;

                    // console.log('header bottom ', headerBottom);
                    // console.log('viewport bottom ', viewportBottom);
                    // console.log('Y ', Y);
                    // console.log('delta  ', delta);
                    // console.log('scrollStep  ', scrollStep);

                    // If header height larger than window viewport
                    if ( delta > 0 ) {
                        // Scroll down
                        if ( windowPos > lastWindowPos ) {

                            // If bottom overflow

                            if( headerBottom > viewportBottom ) {
                                Y += scrollStep;
                            }

                            if( Y < -delta ) {
                                bottom = true;
                                Y = -delta;
                            }

                            top = false;

                        } else if ( windowPos < lastWindowPos )  { // Scroll up

                            // If top overflow

                            if( $header.offset().top < $window.scrollTop() ) {
                                Y += scrollStep;
                            }

                            if( Y >= 0 ) {
                                top = true;
                                Y = 0;
                            }

                            bottom = false;

                        } else {

                            if( headerBottom < viewportBottom ) {
                                Y = windowHeight - headerHeight;
                            }

                            if( Y >= 0 ) {
                                top = true;
                                Y = 0;
                            }
                        }
                    } else {
                        Y = 0;
                    }

                    // Change header Y coordinate
                    $header.css({
                        top: Y
                    });

                    lastWindowPos = windowPos;
                }

                function resizeAndScroll() {
                    resize();
                    scroll();
                }

             },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Split navigation header
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            splitNavHeader: function() {

                var header = $('.header-split');

                if( header.length <= 0 ) return;

                var navigation = header.find('.main-nav'),
                    navItems = navigation.find('.menu > li'),
                    itemsNumber = navItems.length,
                    rtl = $('body').hasClass('rtl'),
                    midIndex = parseInt( itemsNumber/2 + 0.5 * rtl - .5 ),
                    midItem = navItems.eq( midIndex ),
                    logo = header.find('.site-logo > .basel-logo-wrap'),
                    logoWidth,
                    leftWidth = 0,
                    rule = ( ! rtl ) ? 'marginRight' : 'marginLeft',
                    rightWidth = 0;

                var recalc = function() {
                    logoWidth = logo.outerWidth(),
                    leftWidth = 5,
                    rightWidth = 0;

                    for (var i = itemsNumber - 1; i >= 0; i--) {
                        var itemWidth = navItems.eq(i).outerWidth();
                        if( i > midIndex ) {
                            rightWidth += itemWidth;
                        } else {
                            leftWidth += itemWidth;
                        }
                    };

                    var diff = leftWidth - rightWidth;

                    if( rtl ) {
                        if( leftWidth > rightWidth ) {
                            navigation.find('.menu > li:first-child').css('marginRight', -diff);
                        } else {
                            navigation.find('.menu > li:last-child').css('marginLeft', diff + 5);
                        }
                    } else {
                        if( leftWidth > rightWidth ) {
                            navigation.find('.menu > li:last-child').css('marginRight', diff + 5);
                        } else {
                            navigation.find('.menu > li:first-child').css('marginLeft', -diff);
                        }
                    }

                    midItem.css(rule, logoWidth);
                };

                logo.imagesLoaded(function() {
                    recalc();
                    header.addClass('menu-calculated');
                });

                $(window).on('resize', recalc);

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Counter shortcode method
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            counterShortcode: function(counter) {
                if( counter.attr('data-state') == 'done' || counter.text() != counter.data('final') ) {
                    return;
                }
                counter.prop('Counter',0).animate({
                    Counter: counter.text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        if( now >= counter.data('final')) {
                            counter.attr('data-state', 'done');
                        }
                        counter.text(Math.ceil(now));
                    }
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Activate methods in viewport
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            visibleElements: function() {

                $('.basel-counter .counter-value').each(function(){
                    $(this).waypoint(function(){
                        baselThemeModule.counterShortcode($(this));
                    }, { offset: '100%' });
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * add class in wishlist
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            wishList: function() {
                var body = $("body");

                body.on("click", ".add_to_wishlist", function() {

                    $(this).parent().addClass("feid-in");

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Compare button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            compare: function() {
                var body = $("body"),
                    button = $("a.compare");

                body.on("click", "a.compare", function() {
                    $(this).addClass("loading");
                });

                body.on("yith_woocompare_open_popup", function() {
                    button.removeClass("loading");
                    body.addClass("compare-opened");
                });

                body.on('click', '#cboxClose, #cboxOverlay', function() {
                    body.removeClass("compare-opened");
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Promo popup
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            promoPopup: function() {
                if( basel_settings.enable_popup != 'yes' || ( basel_settings.promo_popup_hide_mobile == 'yes' && $(window).width() < 768 ) ) return;
                console.log('init popup');
                var popup = $( '.basel-promo-popup' ),
                    shown = false,
                    pages = $.cookie('basel_shown_pages');

                if( ! pages ) pages = 0;

                if( pages < basel_settings.popup_pages) {
                    pages++;
                    $.cookie('basel_shown_pages', pages, { expires: 7, path: '/' } );
                    return false;
                }

                var showPopup = function() {
                    $.magnificPopup.open({
                        items: {
                            src: '.basel-promo-popup'
                        },
                        type: 'inline',
                        removalDelay: 400, //delay removal by X to allow out-animation
                        callbacks: {
                            beforeOpen: function() {
                                this.st.mainClass = 'basel-popup-effect';
                            },
                            open: function() {
                            // Will fire when this exact popup is opened
                            // this - is Magnific Popup object
                            },
                            close: function() {
                                $.cookie('basel_popup', 'shown', { expires: 7, path: '/' } );
                            }
                            // e.t.c.
                        }
                    });
                };

                if ( $.cookie('basel_popup') != 'shown' ) {
                    if( basel_settings.popup_event == 'scroll' ) {
                        $(window).scroll(function() {
                            if( shown ) return false;
                            if( $(document).scrollTop() >= basel_settings.popup_scroll ) {
                                showPopup();
                                shown = true;
                            }
                        });
                    } else {
                        setTimeout(function() {
                            showPopup();
                        }, basel_settings.popup_delay );
                    }
                }

                $('.basel-open-popup').on('click',function(){
                    showPopup();
                })
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product video button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            productVideo: function() {
                $('.product-video-button a').magnificPopup({
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    disableOn: false,
                    fixedContentPos: false
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product 360 button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            product360Button: function() {
                $('.product-360-button a').magnificPopup({
                    type: 'inline',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    disableOn: false,
                    preloader: false,
                    fixedContentPos: false,
                    callbacks: {
                        open: function() {
                            $(window).resize()
                        },
                    },

                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Cookies law
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            cookiesPopup: function() {
                if( $.cookie('basel_cookies') == 'accepted' ) return;
                var popup = $( '.basel-cookies-popup' );

                setTimeout(function() {
                    popup.addClass('popup-display');
                    popup.on('click', '.cookies-accept-btn', function(e) {
                        e.preventDefault();
                        acceptCookies();
                    })
                }, 2500 );

                var acceptCookies = function() {
                    popup.removeClass('popup-display').addClass('popup-hide');
                    $.cookie('basel_cookies', 'accepted', { expires: 60, path: '/' } );
                };
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Google map
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            googleMap: function() {
                var gmap = $(".google-map-container-with-content");

                $(window).resize(function() {
                    gmap.css({
                        'height': gmap.find('.basel-google-map.with-content').outerHeight()
                    })
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * mobile responsive navigation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            woocommerceWrappTable: function() {

                var wooTable = $(".woocommerce .shop_table");

                var cartTotals = $(".woocommerce .cart_totals table");

                var wishList = $("#yith-wcwl-form .shop_table");

                wooTable.wrap("<div class='responsive-table'></div>");

                cartTotals.wrap("<div class='responsive-table'></div>");

                wishList.wrap("<div class='responsive-table'></div>");

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Menu preparation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            menuSetUp: function() {
                var hasChildClass = 'menu-item-has-children',
                    mainMenu = $('.basel-navigation').find('ul.menu'),
                    lis = mainMenu.find(' > li'),
                    openedClass = 'item-menu-opened';

                lis.has('.sub-menu-dropdown').addClass(hasChildClass);

                mainMenu.on('click', ' > .item-event-click.menu-item-has-children > a', function(e) {
                    e.preventDefault();
                    if(  ! $(this).parent().hasClass(openedClass) ) {
                        $('.' + openedClass).removeClass(openedClass);
                    }
                    $(this).parent().toggleClass(openedClass);
                });

                $(document).click(function(e) {
                    var target = e.target;
                    if ( $('.' + openedClass).length > 0 && ! $(target).is('.item-event-hover') && ! $(target).parents().is('.item-event-hover') && !$(target).parents().is('.' + openedClass + '')) {
                        mainMenu.find('.' + openedClass + '').removeClass(openedClass);
                        return false;
                    }
                });

                var menuForIPad = function() {
                    if( $(window).width() <= 1024 ) {
                        mainMenu.find(' > .item-event-hover').each(function() {
                            $(this).data('original-event', 'hover').removeClass('item-event-hover').addClass('item-event-click');
                        });
                    } else {
                        mainMenu.find(' > .item-event-click').each(function() {
                            if( $(this).data('original-event') == 'hover' ) {
                                $(this).removeClass('item-event-click').addClass('item-event-hover');
                            }
                        });
                    }
                };

                $(window).on('resize', menuForIPad);
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Keep navigation dropdowns in the screen
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            menuOffsets: function() {

                var $window = $(window),
                    $header = $('.main-header'),
                    mainMenu = $('.main-nav').find('ul.menu'),
                    lis = mainMenu.find(' > li.menu-item-design-sized');


                mainMenu.on('hover', ' > li', function(e) {
                    setOffset( $(this) );
                });

                var setOffset = function( li ) {

                    var dropdown = li.find(' > .sub-menu-dropdown'),
                        siteWrapper = $('.website-wrapper');


                    dropdown.attr('style', '');

                    var dropdownWidth = dropdown.outerWidth(),
                        dropdownOffset = dropdown.offset(),
                        screenWidth = $window.width(),
                        bodyRight = siteWrapper.outerWidth() + siteWrapper.offset().left,
                        viewportWidth = ( $('body').hasClass('wrapper-boxed') || $('body').hasClass('wrapper-boxed-small') ) ? bodyRight : screenWidth;

                        if( ! dropdownWidth || ! dropdownOffset ) return;

                        if( $('body').hasClass('rtl') && dropdownOffset.left <= 0 && li.hasClass( 'menu-item-design-sized' ) && ! $header.hasClass('header-vertical') ) {
                            // If right point is not in the viewport
                            var toLeft = - dropdownOffset.left;

                            dropdown.css({
                                right: - toLeft - 10
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toLeft + li.width()/2;

                        } else if( dropdownOffset.left + dropdownWidth >= viewportWidth && li.hasClass( 'menu-item-design-sized' ) && ! $header.hasClass('header-vertical') ) {
                            // If right point is not in the viewport
                            var toRight = dropdownOffset.left + dropdownWidth - viewportWidth;

                            dropdown.css({
                                left: - toRight - 10
                            });

                            var beforeSelector = '.' + li.attr('class').split(' ').join('.') + '> .sub-menu-dropdown:before',
                                arrowOffset = toRight + li.width()/2;

                        }

                        // Vertical header fit
                        if( $header.hasClass('header-vertical') ) {

                            var bottom = dropdown.offset().top + dropdown.outerHeight(),
                                viewportBottom = $window.scrollTop() + $window.outerHeight();

                            if( bottom > viewportBottom ) {
                                dropdown.css({
                                    top: viewportBottom - bottom - 10
                                });
                            }
                        }
                };

                lis.each(function() {
                    setOffset( $(this) );
                    $(this).addClass('with-offsets');
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * One page menu
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            onePageMenu: function() {

                var scrollToRow = function(hash) {
                    var row = $('.vc_row#' + hash);

                    if( row.length < 1 ) return;

                    var position = row.offset().top;

                    $('html, body').stop().animate({
                        scrollTop: position - 150
                    }, 800, function() {
                        activeMenuItem(hash);
                    });
                };

                var activeMenuItem = function(hash) {
                    var itemHash;
                    $('.onepage-link').each(function() {
                        itemHash = $(this).find('> a').attr('href').split('#')[1];

                        if( itemHash == hash ) {
                            $('.onepage-link').removeClass('current-menu-item');
                            $(this).addClass('current-menu-item');
                        }

                    });
                };

                $('body').on('click', '.onepage-link > a', function(e) {
                    var $this = $(this),
                        hash = $this.attr('href').split('#')[1];

                    if( $('.vc_row#' + hash).length < 1 ) return;

                    e.preventDefault();

                    scrollToRow(hash);

                    // close mobile menu
                    $('.basel-close-side').trigger('click');
                });

                if( $('.onepage-link').length > 0 ) {
                    $('.entry-content > .vc_row').waypoint(function() {
                        var hash = $(this).attr('id');
                        activeMenuItem(hash);
                    }, { offset: 0 });

                    $('.onepage-link').removeClass('current-menu-item');


                    // URL contains hash
                    var locationHash = window.location.hash.split('#')[1];

                    if(window.location.hash.length > 1) {
                        setTimeout(function(){
                            scrollToRow(locationHash);
                        }, 500);
                    }

                }
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * mobile responsive navigation
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            mobileNavigation: function() {

                var body = $("body"),
                    mobileNav = $(".mobile-nav"),
                    wrapperSite = $(".website-wrapper"),
                    dropDownCat = $(".mobile-nav .site-mobile-menu .menu-item-has-children"),
                    elementIcon = '<span class="icon-sub-menu"></span>',
                    butOpener = $(".icon-sub-menu");

                dropDownCat.append(elementIcon);

                mobileNav.on("click", ".icon-sub-menu", function(e) {
                    e.preventDefault();

                    if ($(this).parent().hasClass("opener-page")) {
                        $(this).parent().removeClass("opener-page").find("> ul").slideUp(200);
                        $(this).parent().removeClass("opener-page").find(".sub-menu-dropdown .container > ul").slideUp(200);
                        $(this).parent().find('> .icon-sub-menu').removeClass("up-icon");
                    } else {
                        $(this).parent().addClass("opener-page").find("> ul").slideDown(200);
                        $(this).parent().addClass("opener-page").find(".sub-menu-dropdown .container > ul").slideDown(200);
                        $(this).parent().find('> .icon-sub-menu').addClass("up-icon");
                    }
                });


                body.on("click", ".mobile-nav-icon", function() {

                    if (body.hasClass("act-mobile-menu")) {
                        closeMenu();
                    } else {
                        openMenu();
                    }

                });

                body.on("click touchstart", ".basel-close-side", function() {
                    closeMenu();
                });

                function openMenu() {
                    body.addClass("act-mobile-menu");
                    wrapperSite.addClass("left-wrapp");
                }

                function closeMenu() {
                    body.removeClass("act-mobile-menu");
                    wrapperSite.removeClass("left-wrapp");
                }
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Simple dropdown for category select on search form
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            simpleDropdown: function() {
                $('.input-dropdown-inner').each(function() {
                    var dd = $(this);
                    var btn = dd.find('> a');
                    var input = dd.find('> input');
                    var list = dd.find('> ul'); //.dd-list-wrapper

                    $(document).click(function(e) {
                        var target = e.target;
                        if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner') && !$(target).parents().is('.input-dropdown-inner')) {
                            hideList();
                            return false;
                        }
                    });

                    btn.on('click', function(e) {
                        e.preventDefault();

                        if (dd.hasClass('dd-shown')) {
                            hideList();
                        } else {
                            showList();
                        }
                        return false;
                    });

                    list.on('click', 'a', function(e) {
                        e.preventDefault();
                        var value = $(this).data('val');
                        var label = $(this).text();
                        list.find('.current-item').removeClass('current-item');
                        $(this).parent().addClass('current-item');
                        if (value != 0) {
                            list.find('li:first-child').show();
                        } else if (value == 0) {
                            list.find('li:first-child').hide();
                        }
                        btn.text(label);
                        input.val(value);
                        hideList();
                    });


                    function showList() {
                        dd.addClass('dd-shown');
                        list.slideDown(100);

                        // $(".dd-list-wrapper .basel-scroll").nanoScroller({
                        //     paneClass: 'basel-scroll-pane',
                        //     sliderClass: 'basel-scroll-slider',
                        //     contentClass: 'basel-scroll-content',
                        //     preventPageScrolling: false
                        // });
                    }

                    function hideList() {
                        dd.removeClass('dd-shown');
                        list.slideUp(100);
                    }
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Function to make columns the same height
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            equalizeColumns: function() {

                $.fn.basel_equlize = function(options) {

                    var settings = $.extend({
                        child: "",
                    }, options);

                    var that = this;

                    if (settings.child != '') {
                        that = this.find(settings.child);
                    }

                    var resize = function() {

                        var maxHeight = 0;
                        var height;
                        that.each(function() {
                            $(this).attr('style', '');
                            if ($(window).width() > 767 && $(this).outerHeight() > maxHeight)
                                maxHeight = $(this).outerHeight();
                        });

                        that.each(function() {
                            $(this).css({
                                minHeight: maxHeight
                            });
                        });

                    }

                    $(window).bind('resize', function() {
                        resize();
                    });
                    setTimeout(function() {
                        resize();
                    }, 200);
                    setTimeout(function() {
                        resize();
                    }, 500);
                    setTimeout(function() {
                        resize();
                    }, 800);
                }

                $('.equal-columns').each(function() {
                    $(this).basel_equlize({
                        child: '> [class*=col-]'
                    });
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Enable masonry grid for blog
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            blogMasonry: function() {
                if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
                var $container = $('.masonry-container');

                // initialize Masonry after all images have loaded
                $container.imagesLoaded(function() {
                    $container.isotope({
                        gutter: 0,
                        isOriginLeft: ! $('body').hasClass('rtl'),
                        itemSelector: '.blog-design-masonry, .blog-design-mask, .masonry-item'
                    });
                });

                $('.masonry-filter').on('click', 'a', function(e) {
                    e.preventDefault();
                    $('.masonry-filter').find('.filter-active').removeClass('filter-active');
                    $(this).addClass('filter-active');
                    var filterValue = $(this).attr('data-filter');
                    $container.isotope({
                        filter: filterValue
                    });
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for blog shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            blogLoadMore: function() {

                $('.basel-blog-load-more').on('click', function(e) {
                    e.preventDefault();

                    var $this = $(this),
                        holder = $this.parent().siblings('.basel-blog-holder'),
                        atts = holder.data('atts'),
                        paged = holder.data('paged');

                    $this.addClass('loading');

                    $.ajax({
                        url: basel_settings.ajaxurl,
                        data: {
                            atts: atts,
                            paged: paged,
                            action: 'basel_get_blog_shortcode'
                        },
                        dataType: 'json',
                        method: 'POST',
                        success: function(data) {
                            if( data.items ) {
                                if( holder.hasClass('masonry-container') ) {
                                    // initialize Masonry after all images have loaded
                                    var items = $(data.items);
                                    holder.append(items).isotope( 'appended', items );
                                    holder.imagesLoaded().progress(function() {
                                        holder.isotope('layout');
                                    });
                                } else {
                                    holder.append(data.items);
                                }

                                holder.data('paged', paged + 1);
                            }

                            if( data.status == 'no-more-posts' ) {
                                $this.hide();
                            }
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            $this.removeClass('loading');
                        },
                    });

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for products shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productsLoadMore: function() {

                var process = false,
                    intervalID;

                $('.basel-products-element').each(function() {
                    var $this = $(this),
                        cache = [],
                        inner = $this.find('.basel-products-holder');

                    if( ! inner.hasClass('pagination-arrows') && ! inner.hasClass('pagination-more-btn') ) return;

                    cache[1] = {
                        items: inner.html(),
                        status: 'have-posts'
                    };

                    $this.on('recalc', function() {
                        calc();
                    });

                    if( inner.hasClass('pagination-arrows') ) {
                        $(window).resize(function() {
                            calc();
                        });
                    }

                    var calc = function() {
                        var height = inner.outerHeight();
                        $this.stop().css({height: height});
                    };

                    // sticky buttons

                    var body = $('body'),
                        btnWrap = $this.find('.products-footer'),
                        btnLeft = btnWrap.find('.basel-products-load-prev'),
                        btnRight = btnWrap.find('.basel-products-load-next'),
                        loadWrapp = $this.find('.basel-products-loader'),
                        scrollTop,
                        holderTop,
                        btnLeftOffset,
                        btnRightOffset,
                        holderBottom,
                        holderHeight,
                        holderWidth,
                        btnsHeight,
                        offsetArrow = 50,
                        offset,
                        windowWidth;

                    if( body.hasClass('rtl') ) {
                        btnLeft = btnRight;
                        btnRight = btnWrap.find('.basel-products-load-prev');
                    }

                    $(window).scroll(function() {
                        buttonsPos();
                    });

                    function buttonsPos() {

                        offset = $(window).height() / 2;

                        windowWidth = $(window).outerWidth(true) + 17;

                        holderWidth = $this.outerWidth(true) + 10;

                        scrollTop = $(window).scrollTop();

                        holderTop = $this.offset().top - offset;

                        btnLeftOffset = $this.offset().left - offsetArrow;

                        btnRightOffset = btnLeftOffset + holderWidth + offsetArrow;

                        btnsHeight = btnLeft.outerHeight();

                        holderHeight = $this.height() - 50 - btnsHeight;

                        holderBottom = holderTop + holderHeight;

                        if(windowWidth <= 1047 && windowWidth >= 992 || windowWidth <= 825 && windowWidth >= 768 ) {
                            btnLeftOffset += 18;
                            btnRightOffset -= 18;
                        }

                        if(windowWidth < 768 || body.hasClass('wrapper-boxed') || body.hasClass('wrapper-boxed-small') || $('.main-header').hasClass('header-vertical') ) {
                            btnLeftOffset += 51;
                            btnRightOffset -= 51;
                        }

                        btnLeft.css({
                            'left' : btnLeftOffset + 'px'
                        });

                        // Right arrow position for vertical header
                        // if( $('.main-header').hasClass('header-vertical') && ! body.hasClass('rtl') ) {
                        //     btnRightOffset -= $('.main-header').outerWidth();
                        // } else if( $('.main-header').hasClass('header-vertical') && body.hasClass('rtl') ) {
                        //     btnRightOffset += $('.main-header').outerWidth();
                        // }

                        btnRight.css({
                            'left' : btnRightOffset + 'px'
                        });


                        if (scrollTop < holderTop || scrollTop > holderBottom) {
                            btnWrap.removeClass('show-arrow');
                            loadWrapp.addClass('hidden-loader');
                        } else {
                            btnWrap.addClass('show-arrow');
                            loadWrapp.removeClass('hidden-loader');
                        }

                    };

                    $this.find('.basel-products-load-more').on('click', function(e) {
                        e.preventDefault();

                        if( process ) return; process = true;

                        var $this = $(this),
                            holder = $this.parent().siblings('.basel-products-holder'),
                            atts = holder.data('atts'),
                            paged = holder.data('paged');

                        paged++;

                        loadProducts(atts, paged, holder, $this, [], function(data) {
                            if( data.items ) {
                                if( holder.hasClass('grid-masonry') ) {
                                    isotopeAppend(holder, data.items);
                                } else {
                                    holder.append(data.items);
                                }

                                holder.data('paged', paged);
                            }

                            if( data.status == 'no-more-posts' ) {
                                $this.hide();
                            }
                        });

                    });

                    $this.find('.basel-products-load-prev, .basel-products-load-next').on('click', function(e) {
                        e.preventDefault();

                        if( process || $(this).hasClass('disabled') ) return; process = true;

                        clearInterval(intervalID);

                        var $this = $(this),
                            holder = $this.parent().siblings('.basel-products-holder'),
                            next = $this.parent().find('.basel-products-load-next'),
                            prev = $this.parent().find('.basel-products-load-prev'),
                            atts = holder.data('atts'),
                            paged = holder.attr('data-paged');

                        if( $this.hasClass('basel-products-load-prev') ) {
                            if( paged < 2 ) return;
                            paged = paged - 2;
                        }

                        paged++;

                        loadProducts(atts, paged, holder, $this, cache, function(data) {
                            holder.addClass('basel-animated-products');

                            if( data.items ) {
                                holder.html(data.items).attr('data-paged', paged);
                                holder.imagesLoaded().progress(function() {
                                    holder.parent().trigger('recalc');
                                });

                                baselThemeModule.btnsToolTips();
                            }

                            if( $(window).width() < 768 ) {
                                $('html, body').stop().animate({
                                    scrollTop: holder.offset().top - 150
                                }, 400);
                            }


                            var iter = 0;
                            intervalID = setInterval(function() {
                                holder.find('.product-grid-item').eq(iter).addClass('basel-animated');
                                iter++;
                            }, 100);

                            if( paged > 1 ) {
                                prev.removeClass('disabled');
                            } else {
                                prev.addClass('disabled');
                            }

                            if( data.status == 'no-more-posts' ) {
                                next.addClass('disabled');
                            } else {
                                next.removeClass('disabled');
                            }
                        });

                    });
                });

                var loadProducts = function(atts, paged, holder, btn, cache, callback) {

                    if( cache[paged] ) {
                        holder.addClass('loading');
                        setTimeout(function() {
                            callback(cache[paged]);
                            holder.removeClass('loading');
                            process = false;
                        }, 300);
                        return;
                    }

                    holder.addClass('loading').parent().addClass('element-loading');

                    btn.addClass('loading');

                    $.ajax({
                        url: basel_settings.ajaxurl,
                        data: {
                            atts: atts,
                            paged: paged,
                            action: 'basel_get_products_shortcode'
                        },
                        dataType: 'json',
                        method: 'POST',
                        success: function(data) {
                            cache[paged] = data;
                            callback( data );
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            holder.removeClass('loading').parent().removeClass('element-loading');
                            btn.removeClass('loading');
                            process = false;
                            baselThemeModule.compare();
                        },
                    });
                };

                var isotopeAppend = function(el, items) {
                    // initialize Masonry after all images have loaded
                    var items = $(items);
                    el.append(items).isotope( 'appended', items );
                    el.isotope('layout');
                    setTimeout(function() {
                        el.isotope('layout');
                    }, 100);
                    el.imagesLoaded().progress(function() {
                        el.isotope('layout');
                    });
                };

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Products tabs element AJAX loading
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productsTabs: function() {


                var process = false;

                $('.basel-products-tabs').each(function() {
                    var $this = $(this),
                        $inner = $this.find('.basel-tab-content'),
                        cache = [];

                    if( $inner.find('.owl-carousel').length < 1 ) {
                        cache[0] = {
                            html: $inner.html()
                        };
                    }

                    $this.find('.products-tabs-title li').on('click', function(e) {
                        e.preventDefault();

                        var $this = $(this),
                            atts = $this.data('atts'),
                            index = $this.index();

                        if( process || $this.hasClass('active-tab-title') ) return; process = true;

                        loadTab(atts, index, $inner, $this, cache,  function(data) {
                            if( data.html ) {
                                $inner.html(data.html);
                                baselThemeModule.btnsToolTips();
                                baselThemeModule.shopMasonry();
                                baselThemeModule.productsLoadMore();
                            }
                        });

                    });

                    var $nav = $this.find('.tabs-navigation-wrapper'),
                        $subList = $nav.find('ul'),
                        time = 300;

                    $nav.on('click', '.open-title-menu', function() {
                        var $btn = $(this);

                        if( $subList.hasClass('list-shown') ) {
                            $btn.removeClass('toggle-active');
                            $subList.removeClass('list-shown');
                        } else {
                            $btn.addClass('toggle-active');
                            $subList.addClass('list-shown');
                            setTimeout(function() {
                                $('body').one('click', function(e) {
                                    var target = e.target;
                                    if ( ! $(target).is('.tabs-navigation-wrapper') && ! $(target).parents().is('.tabs-navigation-wrapper')) {
                                        $btn.removeClass('toggle-active');
                                        $subList.removeClass('list-shown');
                                        return false;
                                    }
                                });
                            },10);
                        }

                    })
                    .on('click', 'li', function() {
                        var $btn = $nav.find('.open-title-menu'),
                            text = $(this).text();

                        if( $subList.hasClass('list-shown') ) {
                            $btn.removeClass('toggle-active').text(text);
                            $subList.removeClass('list-shown');
                        }
                    });

                });

                var loadTab = function(atts, index, holder, btn, cache, callback) {

                    btn.parent().find('.active-tab-title').removeClass('active-tab-title');
                    btn.addClass('active-tab-title')

                    if( cache[index] ) {
                        holder.addClass('loading');
                        setTimeout(function() {
                            callback(cache[index]);
                            holder.removeClass('loading');
                            process = false;
                        }, 300);
                        return;
                    }

                    holder.addClass('loading').parent().addClass('element-loading');

                    btn.addClass('loading');

                    $.ajax({
                        url: basel_settings.ajaxurl,
                        data: {
                            atts: atts,
                            action: 'basel_get_products_tab_shortcode'
                        },
                        dataType: 'json',
                        method: 'POST',
                        success: function(data) {
                            cache[index] = data;
                            callback( data );
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            holder.removeClass('loading').parent().removeClass('element-loading');
                            btn.removeClass('loading');
                            process = false;
                            baselThemeModule.compare();
                        },
                    });
                };


            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Load more button for portfolio shortcode
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            portfolioLoadMore: function() {

                if( typeof $.waypoints != 'function' ) return;

                var waypoint = $('.basel-portfolio-load-more.load-on-scroll').waypoint(function(){
                        $('.basel-portfolio-load-more.load-on-scroll').trigger('click');
                    }, { offset: '100%' }),
                    process = false;

                $('.basel-portfolio-load-more').on('click', function(e) {
                    e.preventDefault();

                    if( process ) return;

                    process = true;

                    var $this = $(this),
                        holder = $this.parent().parent().find('.basel-portfolio-holder'),
                        source = holder.data('source'),
                        action = 'basel_get_portfolio_' + source,
                        ajaxurl = basel_settings.ajaxurl,
                        dataType = 'json',
                        method = 'POST',
                        timeout,
                        atts = holder.data('atts'),
                        paged = holder.data('paged');

                    $this.addClass('loading');

                    var data = {
                        atts: atts,
                        paged: paged,
                        action: action
                    };

                    if( source == 'main_loop' ) {
                        ajaxurl = $(this).attr('href');
                        method = 'GET';
                        data = {};
                    }


                    $.ajax({
                        url: ajaxurl,
                        data: data,
                        dataType: dataType,
                        method: method,
                        success: function(data) {

                            var items = $(data.items);

                            if( items ) {
                                if( holder.hasClass('masonry-container') ) {
                                    // initialize Masonry after all images have loaded
                                    holder.append(items).isotope( 'appended', items );
                                    holder.imagesLoaded().progress(function() {
                                        holder.isotope('layout');

                                        clearTimeout(timeout);

                                        timeout = setTimeout(function() {
                                            $('.basel-portfolio-load-more.load-on-scroll').waypoint('destroy');
                                            waypoint = $('.basel-portfolio-load-more.load-on-scroll').waypoint(function(){
                                                $('.basel-portfolio-load-more.load-on-scroll').trigger('click');
                                            }, { offset: '100%' });
                                        }, 1000);
                                    });
                                } else {
                                    holder.append(items);
                                }

                                holder.data('paged', paged + 1);

                                $this.attr('href', data.nextPage);
                            }

                            baselThemeModule.mfpPopup();

                            if( data.status == 'no-more-posts' ) {
                                $this.hide();
                            }

                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            $this.removeClass('loading');
                            process = false;
                        },
                    });

                });

            },



            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Enable masonry grid for shop isotope type
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            shopMasonry: function() {
                if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
                var $container = $('.elements-grid.grid-masonry');
                // initialize Masonry after all images have loaded
                $container.imagesLoaded(function() {
                    $container.isotope({
                        isOriginLeft: ! $('body').hasClass('rtl'),
                        itemSelector: '.category-grid-item, .product-grid-item',
                    });
                });

                // Categories masonry
                $(window).resize(function() {
                    var $catsContainer = $('.categories-masonry');
                    var colWidth = ( $catsContainer.hasClass( 'categories-style-masonry' ) )  ? '.category-grid-item' : '.col-md-3.category-grid-item' ;
                    $catsContainer.imagesLoaded(function() {
                        $catsContainer.isotope({
                            resizable: false,
                            isOriginLeft: ! $('body').hasClass('rtl'),
                            layoutMode: 'packery',
                            packery: {
                                gutter: 0,
                                columnWidth: colWidth
                            },
                            itemSelector: '.category-grid-item',
                            // masonry: {
                                // gutter: 0
                            // }
                        });
                    });
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * MEGA MENU
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            sidebarMenu: function() {
                var heightMegaMenu = $(".widget_nav_mega_menu").height();
                var heightMegaNavigation = $(".categories-menu-dropdown").height();
                var subMenuHeight = $(".widget_nav_mega_menu ul > li.menu-item-design-sized > .sub-menu-dropdown, .widget_nav_mega_menu ul > li.menu-item-design-full-width > .sub-menu-dropdown");
                var megaNavigationHeight = $(".categories-menu-dropdown ul > li.menu-item-design-sized > .sub-menu-dropdown, .categories-menu-dropdown ul > li.menu-item-design-full-width > .sub-menu-dropdown");
                subMenuHeight.css(
                    "min-height", heightMegaMenu + "px"
                );

                megaNavigationHeight.css(
                    "min-height", heightMegaNavigation + "px"
                );
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product thumbnail images & photo swipe gallery
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productImages: function() {


                // Init photoswipe

                var currentImage,
                    $productGallery = $('.woocommerce-product-gallery'),
                    $mainImages = $('.woocommerce-product-gallery__wrapper'),
                    $thumbs = $productGallery.find('.thumbnails'),
                    currentClass = 'current-image',
                    gallery = $('.photoswipe-images'),
                    PhotoSwipeTrigger = '.basel-show-product-gallery',
                    galleryType = 'photo-swipe'; // magnific photo-swipe

                $thumbs.addClass('thumbnails-ready');

                if( $productGallery.hasClass( 'image-action-popup') ) {
                    PhotoSwipeTrigger += ', .woocommerce-product-gallery__image a';
                }

                $productGallery.on('click', '.woocommerce-product-gallery__image a', function(e) {
                    e.preventDefault();
                });

                $productGallery.on('click', PhotoSwipeTrigger, function(e) {
                    e.preventDefault();

                    currentImage = $(this).attr('href');

                    if( galleryType == 'magnific' ) {
                        $.magnificPopup.open({
                            type: 'image',
                            image: {
                                verticalFit: false
                            },
                            items: getProductItems(),
                            gallery: {
                                enabled: true,
                                navigateByImgClick: false
                            },
                        }, 0);
                    }

                    if( galleryType == 'photo-swipe' ) {

                        // build items array
                        var items = getProductItems();

                        callPhotoSwipe( getCurrentGalleryIndex(e), items );

                    }

                });

                $thumbs.on('click', '.image-link', function(e) {
                    e.preventDefault();

                    // if( $thumbs.hasClass('thumbnails-large') ) {
                    //     var index = $(e.currentTarget).index() + 1;
                    //     var items = getProductItems();
                    //     callPhotoSwipe(index, items);
                    //     return;
                    // }

                    // var href = $(this).attr('href'),
                    //     src  = $(this).attr('data-single-image'),
                    //     width = $(this).attr('data-width'),
                    //     height = $(this).attr('data-height'),
                    //     title = $(this).attr('title');

                    // $thumbs.find('.' + currentClass).removeClass(currentClass);
                    // $(this).addClass(currentClass);

                    // if( $mainImages.find('img').attr('src') == src ) return;

                    // $mainImages.addClass('loading-image').attr('href', href).find('img').attr('src', src).attr('srcset', src).one('load', function() {
                    //     $mainImages.removeClass('loading-image').data('width', width).data('height', height).attr('title', title);
                    // });

                });

                gallery.each(function() {
                    var $this = $(this);
                    $this.on('click', 'a', function(e) {
                        e.preventDefault();
                        var index = $(e.currentTarget).data('index') - 1;
                        var items = getGalleryItems($this, []);
                        callPhotoSwipe(index, items);
                    } );
                })

                var callPhotoSwipe = function( index, items ) {
                    var pswpElement = document.querySelectorAll('.pswp')[0];

                    if( $('body').hasClass('rtl') ) {
                        index = items.length - index - 1;
                        items = items.reverse();
                    }

                    // define options (if needed)
                    var options = {
                        // optionName: 'option value'
                        // for example:
                        index: index, // start at first slide
                        getThumbBoundsFn: function(index) {

                            // // get window scroll Y
                            // var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                            // // optionally get horizontal scroll

                            // // get position of element relative to viewport
                            // var rect = $target.offset();

                            // // w = width
                            // return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};

                        }
                    };

                    // Initializes and opens PhotoSwipe
                    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                };

                var getCurrentGalleryIndex = function( e ) {
                    if( $mainImages.hasClass('owl-carousel') )
                        return $mainImages.find('.owl-item.active').index();
                    else return $(e.currentTarget).parent().index();
                };

                var getProductItems = function() {
                    var items = [];

                    $mainImages.find('figure a img').each(function() {
                        var src = $(this).attr('data-large_image'),
                            width = $(this).attr('data-large_image_width'),
                            height = $(this).attr('data-large_image_height'),
                            title = $(this).attr('title');

                            items.push({
                                src: src,
                                w: width,
                                h: height,
                                title: ( basel_settings.product_images_captions == 'yes' ) ? title : false
                            });

                    });

                    return items;
                };

                var getGalleryItems = function( $gallery, items ) {
                    var src, width, height, title;

                    $gallery.find('a').each(function() {
                        src = $(this).attr('href');
                        width = $(this).data('width');
                        height = $(this).data('height');
                        title = $(this).attr('title');
                        if( ! isItemInArray(items, src) ) {
                            items.push({
                                src: src,
                                w: width,
                                h: height,
                                title: title
                            });
                        }
                    });

                    return items;
                };

                var isItemInArray = function( items, src ) {
                    var i;
                    for (i = 0; i < items.length; i++) {
                        if (items[i].src == src) {
                            return true;
                        }
                    }

                    return false;
                };

                /* Fix zoom for first item firstly */

                if( $productGallery.hasClass( 'image-action-zoom') ) {
                    var zoom_target   = $( '.woocommerce-product-gallery__image' );
                    var image_to_zoom = zoom_target.find( 'img' );

                    // But only zoom if the img is larger than its container.
                    if ( image_to_zoom.attr( 'width' ) > $( '.woocommerce-product-gallery' ).width() ) {
                        zoom_target.trigger( 'zoom.destroy' );
                        zoom_target.zoom({
                            touch: false
                        });
                    }
                }

            },

            productImagesGallery: function() {


                var $mainImages = $('.woocommerce-product-gallery__image:eq(0) img'),
                    $thumbs = $('.images .thumbnails'), // magnific photo-swipe
                    $mainOwl;

                if( basel_settings.product_gallery.images_slider ) {
                    initMainGallery();
                }

                if( basel_settings.product_gallery.thumbs_slider.enabled && basel_settings.product_gallery.images_slider ) {
                    initThumbnailsMarkup();
                    if( basel_settings.product_gallery.thumbs_slider.position == 'left' && jQuery(window).width() > 991 ) {
                        initThumbnailsVertical();
                    } else {
                        initThumbnailsHorizontal();
                    }
                }


                function initMainGallery() {

                    $('.woocommerce-product-gallery__wrapper').addClass('owl-carousel').owlCarousel({
                        rtl: $('body').hasClass('rtl'),
                        items: 1,
                        autoplay: false,
                        dots: false,
                        nav: false,
                        autoHeight: ( basel_settings.product_slider_auto_height == 'yes' ),
                        navText:false,
                        loop: false,
                        onRefreshed: function() {
                            $(window).resize();
                        }
                    });

                    $mainOwl = $('.woocommerce-product-gallery__wrapper').owlCarousel();
                };

                function initThumbnailsMarkup() {
                    var markup = '';

                    $('.woocommerce-product-gallery__image').each(function() {
                        markup += '<img src="' + $(this).data('thumb') + '" />';
                    });

                    $thumbs.append(markup);

                };

                function initThumbnailsVertical() {
                    $thumbs.slick({
                        slidesToShow: basel_settings.product_gallery.thumbs_slider.items.vertical_items,
                        slidesToScroll: basel_settings.product_gallery.thumbs_slider.items.vertical_items,
                        vertical: true,
                        verticalSwiping: true,
                        infinite: false,
                    });

                    $thumbs.on('click', 'img', function(e) {
                        var i = $(this).index();
                        console.log(i);
                        $mainOwl.trigger('to.owl.carousel', i);
                    });

                    $mainOwl.on('changed.owl.carousel', function(e) {
                        var i = e.item.index;
                        $thumbs.slick('slickGoTo', i);
                        $thumbs.find('.active-thumb').removeClass('active-thumb');
                        $thumbs.find('img').eq(i).addClass('active-thumb');
                    });
                    
                    $thumbs.find('img').eq(0).addClass('active-thumb');
                };

                function initThumbnailsHorizontal() {
                    $thumbs.addClass('owl-carousel').owlCarousel({
                        rtl: $('body').hasClass('rtl'),
                        items: basel_settings.product_gallery.thumbs_slider.desktop,
                        responsive: {
                            979: {
                                items: basel_settings.product_gallery.thumbs_slider.desktop
                            },
                            768: {
                                items: basel_settings.product_gallery.thumbs_slider.desktop_small
                            },
                            479: {
                                items: basel_settings.product_gallery.thumbs_slider.tablet
                            },
                            0: {
                                items: basel_settings.product_gallery.thumbs_slider.mobile
                            }
                        },
                        dots:false,
                        nav: true,
                        // mouseDrag: false,
                        navText: false,
                    });

                    var $thumbsOwl = $thumbs.owlCarousel();

                    $thumbs.on('click', '.owl-item', function(e) {
                        var i = $(this).index();
                        $thumbsOwl.trigger('to.owl.carousel', i);
                        $mainOwl.trigger('to.owl.carousel', i);
                    });

                    $mainOwl.on('changed.owl.carousel', function(e) {
                        var i = e.item.index;
                        $thumbsOwl.trigger('to.owl.carousel', i);
                        $thumbs.find('.active-thumb').removeClass('active-thumb');
                        $thumbs.find('.owl-item').eq(i).addClass('active-thumb');
                    });

                    $thumbs.find('.owl-item').eq(0).addClass('active-thumb');
                };

                // Update first thumbnail on variation change

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sticky details block for special product type
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            stickyDetails: function() {
                if( ! $('body').hasClass('basel-product-design-sticky') ) return;

                var details = $('.entry-summary'),
                    detailsInner = details.find('.summary-inner'),
                    detailsWidth = details.width(),
                    images = $('.product-images'),
                    thumbnails = images.find('.woocommerce-product-gallery__wrapper a'),
                    offsetThumbnils,
                    viewportHeight = $(window).height(),
                    imagesHeight = images.outerHeight(),
                    topOffset = 130,
                    maxWidth = 600,
                    innerWidth,
                    detailsHeight = details.outerHeight(),
                    scrollTop = $(window).scrollTop(),
                    imagesTop =  images.offset().top,
                    detailsLeft =  details.offset().left + 15,
                    imagesBottom = imagesTop + imagesHeight,
                    detailsBottom = scrollTop + topOffset + detailsHeight;


                details.css({
                    height: detailsHeight
                });

                $(window).resize(function() {
                    recalculate();
                });

                $(window).scroll(function() {
                    onscroll();
                    animateThumbnails();
                });

                images.imagesLoaded(function() {
                    recalculate();
                });


                function animateThumbnails() {
                    viewportHeight = $(window).height();

                    thumbnails.each(function(){
                        offsetThumbnils = $(this).offset().top;

                        if(scrollTop > (offsetThumbnils - viewportHeight + 20)) {
                           $(this).addClass('animate-images');
                        }

                    });
                }

                function onscroll() {
                    scrollTop = $(window).scrollTop();
                    detailsBottom = scrollTop + topOffset + detailsHeight;
                    detailsWidth = details.width();
                    detailsLeft =  details.offset().left + 15;
                    imagesTop =  images.offset().top;
                    imagesBottom = imagesTop + imagesHeight;

                    if (detailsWidth > maxWidth) {
                        innerWidth = (detailsWidth - maxWidth) / 2;
                        detailsLeft = detailsLeft + innerWidth;
                    }

                    // Fix after scroll the header
                    if( scrollTop + topOffset >= imagesTop ) {
                        details.addClass('block-sticked');

                        detailsInner.css({
                            top: topOffset,
                            left: detailsLeft,
                            width: detailsWidth,
                            position: 'fixed',
                            transform:'translateY(-20px)'
                        });
                    } else {
                        details.removeClass('block-sticked');
                        detailsInner.css({
                            top: 'auto',
                            left: 'auto',
                            width: 'auto',
                            position: 'relative',
                            transform:'translateY(0px)'
                        });
                    }



                    // When rich the bottom line
                    if( detailsBottom > imagesBottom ) {
                        details.addClass('hide-temporary');
                    } else {
                        details.removeClass('hide-temporary');
                    }
                };


                function recalculate() {
                    viewportHeight = $(window).height();
                    detailsHeight = details.outerHeight();
                    imagesHeight = images.outerHeight();

                    // If enought space in the viewport
                    if( detailsHeight < ( viewportHeight - topOffset ) ) {
                        details.addClass('in-viewport').removeClass('not-in-viewport');
                    } else {
                        details.removeClass('in-viewport').addClass('not-in-viewport');
                    }
                };

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Use magnific popup for images
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            mfpPopup: function() {
                /*$('.image-link').magnificPopup({
                    type:'image'
                });*/

                $('.gallery').magnificPopup({
                    delegate: ' > a',
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true
                    },
                });

                $('[data-rel="mfp"]').magnificPopup({
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: false,
                        navigateByImgClick: false
                    },
                });

                $('[data-rel="mfp[projects-gallery]"]').magnificPopup({
                    type: 'image',
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: false
                    },
                });


                $(document).on('click', '.mfp-img', function() {
                    var mfp = jQuery.magnificPopup.instance; // get instance
                    mfp.st.image.verticalFit = !mfp.st.image.verticalFit; // toggle verticalFit on and off
                    mfp.currItem.img.removeAttr('style'); // remove style attribute, to remove max-width if it was applied
                    mfp.updateSize(); // force update of size
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * WooCommerce adding to cart
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            addToCart: function() {
                var that = this,
                    timeoutNumber = 0;

                $('body').bind('added_to_cart', function(event, fragments, cart_hash) {

                    if( basel_settings.add_to_cart_action == 'popup' ) {

                        var html = [
                            '<div class="added-to-cart">',
                                '<p>' + basel_settings.added_to_cart + '</p>',
                                '<a href="#" class="btn btn-style-link close-popup">' + basel_settings.continue_shopping + '</a>',
                                '<a href="' + basel_settings.cart_url + '" class="btn btn-color-primary view-cart">' + basel_settings.view_cart + '</a>',
                            '</div>',
                        ].join("");

                        $.magnificPopup.open({
                            removalDelay: 500, //delay removal by X to allow out-animation
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = baselTheme.popupEffect + '  cart-popup-wrapper';
                                },
                            },
                            items: {
                                src: '<div class="white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                                type: 'inline'
                            }
                        });

                        $('.white-popup').on('click', '.close-popup', function(e) {
                            e.preventDefault();
                            $.magnificPopup.close();
                        });

                    } else if( basel_settings.add_to_cart_action == 'widget' ) {
                        
                        clearTimeout(timeoutNumber);

                        if( $('.cart-widget-opener a').length > 0 ) {
                            $('.cart-widget-opener a').trigger('click');
                        } else if( $('.shopping-cart .a').length > 0 ) {
                            $('.shopping-cart .dropdown-wrap-cat').addClass('display-widget');
                            timeoutNumber = setTimeout(function() {
                                $('.display-widget').removeClass('display-widget');
                            }, 3500 );
                        } else {
                            $('.main-header .dropdown-wrap-cat').addClass('display-widget');
                            timeoutNumber = setTimeout(function() {
                                $('.display-widget').removeClass('display-widget');
                            }, 3500 );
                        }
                    }

                    that.btnsToolTips();

                });
            },

            updateWishListNumberInit: function() {

                if( basel_settings.wishlist == 'no' ) return;

                var that = this;

                if ( baselTheme.supports_html5_storage ) {

                    try {
                        var wishlistNumber = sessionStorage.getItem( 'basel_wishlist_number' ),
                            cookie_hash  = $.cookie( 'basel_wishlist_hash');


                        if ( wishlistNumber === null || wishlistNumber === undefined || wishlistNumber === '' ) {
                            wishlistNumber = 0;
                        }

                        if ( cookie_hash === null || cookie_hash === undefined || cookie_hash === '' ) {
                            cookie_hash = 0;
                        }

                        if ( wishlistNumber == cookie_hash ) {
                            this.setWishListNumber(wishlistNumber);
                        } else {
                            throw 'No wishlist number';
                        }

                    } catch( err ) {
                        this.updateWishListNumber();
                    }

                } else {
                    this.updateWishListNumber();
                }

                $('body').bind('added_to_cart added_to_wishlist removed_from_wishlist', function() {
                    that.updateWishListNumber();
                    that.btnsToolTips();
                    that.woocommerceWrappTable();
                });

            },

            updateCartWidgetFromLocalStorage: function() {

                var that = this;

                if ( baselTheme.supports_html5_storage ) {

                    try {
                        var wc_fragments = $.parseJSON( sessionStorage.getItem( wc_cart_fragments_params.fragment_name ) );

                        if ( wc_fragments && wc_fragments['div.widget_shopping_cart_content'] ) {

                            $.each( wc_fragments, function( key, value ) {
                                $( key ).replaceWith(value);
                            });

                            $( document.body ).trigger( 'wc_fragments_loaded' );
                        } else {
                            throw 'No fragment';
                        }

                    } catch( err ) {
                        console.log('cant update cart widget');
                    }
                }

            },

            updateWishListNumber: function() {
                var that = this;
                $.ajax({
                    url: basel_settings.ajaxurl,
                    data: {
                        action: 'basel_wishlist_number'
                    },
                    method: 'get',
                    success: function(data) {
                        that.setWishListNumber(data);
                        if ( baselTheme.supports_html5_storage ) {
                            sessionStorage.setItem( 'basel_wishlist_number', data );
                        }
                    }
                });
            },

            setWishListNumber: function( num ) {
                num = ($.isNumeric(num)) ? num : 0;
                $('.wishlist-info-widget a > span').text(num);
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Side shopping cart widget
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            cartWidget: function() {
                var widget = $('.cart-widget-opener'),
                    btn = widget.find('a'),
                    body = $('body');

                widget.on('click', 'a', function(e) {
                    e.preventDefault();

                    if( isOpened() ) {
                        closeWidget();
                    } else {
                        setTimeout( function() {
                            openWidget();
                        }, 10);
                    }

                });

                body.on("click touchstart", ".basel-close-side", function() {
                    if( isOpened() ) {
                        closeWidget();
                    }
                });

                body.on("click", ".widget-close", function( e ) {
                    e.preventDefault();
                    if( isOpened() ) {
                        closeWidget();
                    }
                });

                var closeWidget = function() {
                    $('.website-wrapper').removeClass('basel-wrapper-shifted');
                    $('body').removeClass('basel-cart-opened');
                };

                var openWidget = function() {
                    if ( isCart() ) return false;
                    $('.website-wrapper').addClass('basel-wrapper-shifted');
                    $('body').addClass('basel-cart-opened');

                };

                var isOpened = function() {
                    return $('body').hasClass('basel-cart-opened');
                };

                var isCart = function() {
                    return $('body').hasClass('woocommerce-cart');
                };
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Banner hover effect with jquery panr
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            bannersHover: function() {
                $(".promo-banner.hover-4").panr({
                    sensitivity: 20,
                    scale: false,
                    scaleOnHover: true,
                    scaleTo: 1.15,
                    scaleDuration: .34,
                    panY: true,
                    panX: true,
                    panDuration: 0.5,
                    resetPanOnMouseLeave: true
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Parallax effect
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            parallax: function() {
                $('.parallax-yes').each(function() {
                    var $bgobj = $(this);
                    $(window).scroll(function() {
                        var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                        var coords = 'center ' + yPos + 'px';
                        $bgobj.css({
                            backgroundPosition: coords
                        });
                    });
                });

                $('.basel-parallax').each(function(){
                    var $this = $(this);
                    if($this.hasClass('wpb_column')) {
                        $this.find('> .vc_column-inner').parallax("50%", 0.3);
                    } else {
                        $this.parallax("50%", 0.3);
                    }
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Scroll top button
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            scrollTop: function() {
                //Check to see if the window is top if not then display button
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 100) {
                        $('.scrollToTop').addClass('button-show');
                    } else {
                        $('.scrollToTop').removeClass('button-show');
                    }
                });

                //Click event to scroll to top
                $('.scrollToTop').click(function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Quick View
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            quickViewInit: function() {
                var that = this;
                // Open popup with product info when click on Quick View button
                $(document).on('click', '.open-quick-view', function(e) {

                    e.preventDefault();

                    var productId = $(this).data('id'),
                        loopName = $(this).data('loop-name'),
                        loop = $(this).data('loop'),
                        prev = '',
                        next = '',
                        loopBtns = $('.quick-view').find('[data-loop-name="' + loopName + '"]'),
                        btn = $(this);

                    btn.addClass('loading');

                    if (typeof loopBtns[loop - 1] != 'undefined') {
                        prev = loopBtns.eq(loop - 1).addClass('quick-view-prev');
                        prev = $('<div>').append(prev.clone()).html();
                    }

                    if (typeof loopBtns[loop + 1] != 'undefined') {
                        next = loopBtns.eq(loop + 1).addClass('quick-view-next');
                        next = $('<div>').append(next.clone()).html();
                    }

                    that.quickViewLoad(productId, btn, prev, next);

                });
            },

            quickViewLoad: function(id, btn, prev, next) {
                var data = {
                    id: id,
                    action: "basel_quick_view"
                };

                $.ajax({
                    url: basel_settings.ajaxurl,
                    data: data,
                    method: 'get',
                    success: function(data) {
                        // Open directly via API
                        $.magnificPopup.open({
                            items: {
                                src: '<div class="mfp-with-anim white-popup popup-quick-view">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
                                type: 'inline'
                            },
                            removalDelay: 500, //delay removal by X to allow out-animation
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = baselTheme.popupEffect;
                                },
                                open: function() {
                                    $( '.variations_form' ).each( function() {
                                        $( this ).wc_variation_form().find('.variations select:eq(0)').change();
                                    });
                                    $('.variations_form').trigger('wc_variation_form');
                                    $('body').trigger('basel-quick-view-displayed');
                                    baselThemeModule.swatchesVariations();

                                    baselThemeModule.btnsToolTips();
                                    setTimeout(function() {
                                        baselThemeModule.nanoScroller();
                                    }, 300);
                                }
                            },
                        });

                    },
                    complete: function() {
                        btn.removeClass('loading');
                    },
                    error: function() {
                    },
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Quick Shop
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            quickShop: function() {

                var btnSelector = '.btn-quick-shop';

                $(document).on('click', btnSelector, function( e ) {
                    e.preventDefault();

                    var $this = $(this),
                        $product = $this.parents('.product'),
                        $content = $product.find('.quick-shop-form'),
                        id = $this.data('id'),
                        loadingClass = 'btn-loading';

                    if( $this.hasClass(loadingClass) ) return;


                    // Simply show quick shop form if it is already loaded with AJAX previously
                    if( $product.hasClass('quick-shop-loaded') ) {
                        $product.addClass('quick-shop-shown');
                        return;
                    }

                    $this.addClass(loadingClass);
                    $product.addClass('loading-quick-shop');

                    $.ajax({
                        url: basel_settings.ajaxurl,
                        data: {
                            action: 'basel_quick_shop',
                            id: id
                        },
                        method: 'get',
                        success: function(data) {

                            // insert variations form
                            $content.append(data);

                            $( '.variations_form' ).each( function() {
                                $( this ).wc_variation_form().find('.variations select:eq(0)').change();
                            });
                            $('.variations_form').trigger('wc_variation_form');
                            $('body').trigger('basel-quick-view-displayed');
                            baselThemeModule.swatchesVariations();
                            baselThemeModule.btnsToolTips();

                        },
                        complete: function() {
                            $this.removeClass(loadingClass);
                            $product.removeClass('loading-quick-shop');
                            $product.addClass('quick-shop-shown quick-shop-loaded');
                        },
                        error: function() {
                        },
                    });

                })

                .on('click', '.quick-shop-close', function() {
                    var $this = $(this),
                        $product = $this.parents('.product');

                    $product.removeClass('quick-shop-shown');

                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * ToolTips titles
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            btnsToolTips: function() {

                $('.basel-tooltip, .product-actions-btns > a, .product-grid-item .add_to_cart_button, .quick-view a, .product-compare-button a, .product-grid-item .yith-wcwl-add-to-wishlist a').each(function() {
                    $(this).find('.basel-tooltip-label').remove();
                    $(this).addClass('basel-tooltip').prepend('<span class="basel-tooltip-label">' + $(this).text() +'</span>');
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sticky footer: margin bottom for main wrapper
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            stickyFooter: function() {

                if( ! $('body').hasClass( 'sticky-footer-on' ) || $(window).width() < 991 ) return;

                var $footer = $('.footer-container'),
                    $footerContent = $footer.find('.main-footer, .copyrights-wrapper .container'),
                    footerHeight = $footer.outerHeight(),
                    $page = $('.main-page-wrapper'),
                    $doc = $(document),
                    $window = $(window),
                    docHeight = $doc.outerHeight(),
                    windowHeight = $window.outerHeight(),
                    position,
                    bottomSpace,
                    opacity;

                var footerOffset = function() {
                    $page.css({
                        marginBottom: $footer.outerHeight()
                    })
                };

                var footerEffect = function() {
                    position        = $doc.scrollTop();
                    docHeight       = $doc.outerHeight();
                    windowHeight    = $window.outerHeight();
                    bottomSpace     = ( docHeight - (position + windowHeight) );
                    footerHeight    = $footer.outerHeight();
                    opacity         = parseFloat( (bottomSpace ) / footerHeight).toFixed(5);

                    $footer.removeClass('footer-act-sticky');
                    // If scrolled to footer
                    if( bottomSpace > footerHeight ) return;

                    $footerContent.css({
                        opacity: (1 - opacity)
                    });

                    $footer.addClass('footer-act-sticky');

                };

                $window.on('resize', footerOffset);
                $window.on('scroll', footerEffect);

                $footer.imagesLoaded(function() {
                    footerOffset();
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Swatches variations
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            swatchesVariations: function() {

                    var $variation_forms = $('.variations_form');

                    $variation_forms.each(function() {
                        var $variation_form = $(this);

                        if( $variation_form.data('swatches') ) return;
                        $variation_form.data('swatches', true);

                        // If AJX
                        if( ! $variation_form.data('product_variations') ) {
                            $variation_form.find('.swatches-select').find('> div').addClass('swatch-enabled');
                        }

                        $('.basel-swatch[selected="selected"]').addClass('active-swatch').attr('selected', false);

                        $variation_form.on('click', '.swatches-select > div', function() {
                            var value = $(this).data('value');
                            var id = $(this).parent().data('id');

                            $variation_form.trigger( 'check_variations', [ 'attribute_' + id, true ] );
                            resetSwatches($variation_form);

                            //$variation_form.find('select#' + id).val('').trigger('change');
                            //$variation_form.trigger('check_variations');

                            if ($(this).hasClass('active-swatch')) {
                                // Removed since 2.9 version as not necessary
                                // $variation_form.find( '.variations select' ).val( '' ).change();
                                // $variation_form.trigger( 'reset_data' );
                                // $(this).removeClass('active-swatch')
                                return;
                            }

                            if ($(this).hasClass('swatch-disabled')) return;
                            $variation_form.find('select#' + id).val(value).trigger('change');
                            $(this).parent().find('.active-swatch').removeClass('active-swatch');
                            $(this).addClass('active-swatch');
                            resetSwatches($variation_form);
                        })


                        // On clicking the reset variation button
                        .on( 'click', '.reset_variations', function( event ) {
                            $variation_form.find('.active-swatch').removeClass('active-swatch');
                        } )

                        .on('reset_data', function() {

                            var all_attributes_chosen  = true;
                            var some_attributes_chosen = false;

                            $variation_form.find( '.variations select' ).each( function() {
                                var attribute_name = $( this ).data( 'attribute_name' ) || $( this ).attr( 'name' );
                                var value          = $( this ).val() || '';

                                if ( value.length === 0 ) {
                                    all_attributes_chosen = false;
                                } else {
                                    some_attributes_chosen = true;
                                }

                            });

                            if( all_attributes_chosen ) {
                                $(this).parent().find('.active-swatch').removeClass('active-swatch');
                            }

                            if ( isQuickView() ) {
                                var $quickViewImg = $('.product-quick-view .product-images-slider img').first();
                                $quickViewImg.wc_reset_variation_attr( 'src' );
                                $quickViewImg.wc_reset_variation_attr( 'srcset' );
                                $quickViewImg.wc_reset_variation_attr( 'title' );
                                $quickViewImg.wc_reset_variation_attr( 'sizes' );
                                $quickViewImg.wc_reset_variation_attr( 'alt' );
                                $quickViewImg.trigger('to.owl.carousel', 0);
                            }

                            var $mainOwl = $('.woocommerce-product-gallery__wrapper');

                            if( ! $mainOwl.hasClass('owl-carousel') ) return;

                            $mainOwl = $mainOwl.owlCarousel();

                            $mainOwl.trigger('to.owl.carousel', 0);

                            resetSwatches($variation_form);
                        })


                        // Update first tumbnail
                        .on('reset_image', function() {
                            var $thumb = $( '.thumbnails img' ).first();
                            $thumb.wc_reset_variation_attr( 'src' );
                        })
                        .on( 'show_variation', function( e, variation, purchasable) {
                            var $thumb = $('.thumbnails img').first();

                            var image_src = variation.image.src;
                            
                            if ( !image_src ) return;

                            $thumb.wc_set_variation_attr('src', image_src);

                            if ( isQuickView() ) {
                                var $quickViewImg = $('.product-quick-view .product-images-slider img').first(),
                                    $quickViewOwl = $('.product-images-slider');

                                $quickViewImg.wc_set_variation_attr('src', image_src);
                                $quickViewImg.wc_set_variation_attr('srcset', variation.image.srcset);
                                $quickViewImg.wc_set_variation_attr('title', variation.image.title);
                                $quickViewImg.wc_set_variation_attr('sizes', variation.image.sizes);
                                $quickViewImg.wc_set_variation_attr('alt', variation.image.alt);
                                $quickViewOwl.trigger('to.owl.carousel', 0);
                            }

                            var $mainOwl = $('.woocommerce-product-gallery__wrapper');

                            if( ! $mainOwl.hasClass('owl-carousel') ) return;

                            $mainOwl = $mainOwl.owlCarousel();

                            var $thumbs = $('.images .thumbnails');

                            $mainOwl.trigger('to.owl.carousel', 0);

                            if( $thumbs.hasClass('owl-carousel') ) {
                                $thumbs.owlCarousel().trigger('to.owl.carousel', 0);
                                $thumbs.find('.active-thumb').removeClass('active-thumb');
                                $thumbs.find('.owl-item').eq(0).addClass('active-thumb');
                            } else {
                                $thumbs.slick('slickGoTo', 0);
                                $thumbs.find('.active-thumb').removeClass('active-thumb');
                                $thumbs.find('img').eq(0).addClass('active-thumb');
                            }

                        } );
                    })

                    var resetSwatches = function($variation_form) {

                        // If using AJAX
                        if( ! $variation_form.data('product_variations') ) return;

                        $variation_form.find('.variations select').each(function() {

                            var select = $(this);
                            var swatch = select.parent().find('.swatches-select');
                            var options = select.html();
                            // var options = select.data('attribute_html');
                            options = $(options);

                            swatch.find('> div').removeClass('swatch-enabled').addClass('swatch-disabled');

                            options.each(function(el) {
                                var value = $(this).val();

                                if( $(this).hasClass('enabled') ) {
                                // if( ! el.disabled ) {
                                    swatch.find('div[data-value="' + value + '"]').removeClass('swatch-disabled').addClass('swatch-enabled');
                                } else {
                                    swatch.find('div[data-value="' + value + '"]').addClass('swatch-disabled').removeClass('swatch-enabled');
                                }

                            });

                        });
                    };

                    var isQuickView = function() {
                        return $( '.single-product-content' ).hasClass( 'product-quick-view' );
                    };

            },
            swatchesOnGrid: function() {

                $('body').on('click', '.swatch-on-grid', function() {

                    var src, srcset, image_sizes;

                    var imageSrc = $(this).data('image-src'),
                        imageSrcset = $(this).data('image-srcset'),
                        imageSizes = $(this).data('image-sizes');

                    if( typeof imageSrc == 'undefined' ) return;

                    var product = $(this).parents('.product-grid-item'),
                        image = product.find('img').first(),
                        srcOrig = image.data('original-src'),
                        srcsetOrig = image.data('original-srcset'),
                        sizesOrig = image.data('original-sizes');

                    if( typeof srcOrig == 'undefined' ) {
                        image.data('original-src', image.attr('src'));
                    }

                    if( typeof srcsetOrig == 'undefined' ) {
                        image.data('original-srcset', image.attr('srcset'));
                    }

                    if( typeof sizesOrig == 'undefined' ) {
                        image.data('original-sizes', image.attr('sizes'));
                    }


                    if( $(this).hasClass('current-swatch') ) {
                        src = srcOrig;
                        srcset = srcsetOrig;
                        image_sizes = sizesOrig;
                        $(this).removeClass('current-swatch');
                        product.removeClass('product-swatched');
                    } else {
                        $(this).parent().find('.current-swatch').removeClass('current-swatch');
                        $(this).addClass('current-swatch');
                        product.addClass('product-swatched');
                        src = imageSrc;
                        srcset = imageSrcset;
                        image_sizes = imageSizes;
                    }

                    if( image.attr('src') == src ) return;

                    product.addClass('loading-image');

                    image.attr('src', src).attr('srcset', srcset).attr('image_sizes', image_sizes).one('load', function() {
                        product.removeClass('loading-image');
                    });

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Ajax filters
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            ajaxFilters: function() {

                if( ! $('body').hasClass('basel-ajax-shop-on') ) return;

                var that = this,
                    products = $('.products');

                $('body').on('click', '.products-footer .woocommerce-pagination a', function(e) {
                    scrollToTop();
                });

                $(document).pjax(baselTheme.ajaxLinks, '.main-page-wrapper', {
                    timeout: 5000,
                    scrollTo: false
                });


                $( document ).on('click', '.widget_price_filter form .button', function() {
                    var form = $( '.widget_price_filter form');
                    console.log(form.serialize());
                    $.pjax({
                        container: '.main-page-wrapper',
                        timeout: 4000,
                        url: form.attr('action'),
                        data: form.serialize(),
                        scrollTo: false
                    });

                    return false;
                });


                $(document).on('pjax:error', function(xhr, textStatus, error, options) {
                    console.log('pjax error ' + error);
                });

                $(document).on('pjax:start', function(xhr, options) {
                    $('body').addClass('basel-loading');
                });

                $(document).on('pjax:complete', function(xhr, textStatus, options) {

                    that.shopPageInit();

                    scrollToTop();

                    $('body').removeClass('basel-loading');

                });

                $(document).on('pjax:end', function(xhr, textStatus, options) {

                    $('body').removeClass('basel-loading');

                });

                var scrollToTop = function() {
                    if ( basel_settings.ajax_scroll == 'no' ) return false;
                    
                    var $scrollTo = $(basel_settings.ajax_scroll_class),
                        scrollTo = $scrollTo.offset().top - basel_settings.ajax_scroll_offset;

                    $('html, body').stop().animate({
                        scrollTop: scrollTo
                    }, 400);
                };

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * init shop page JS functions
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            shopPageInit: function() {
                this.shopMasonry();
                //this.filtersArea();
                this.ajaxSearch();
                this.btnsToolTips();
                this.compare();
                this.filterDropdowns();
                this.categoriesMenuBtns();
                this.categoriesAccordion();
                this.woocommercePriceSlider();
                this.updateCartWidgetFromLocalStorage(); // refresh cart in sidebar
                this.nanoScroller();
                this.countDownTimer();

                $( '.woocommerce-ordering' ).on( 'change', 'select.orderby', function() {
                    $( this ).closest( 'form' ).find('[name="_pjax"]').remove();
                    $( this ).closest( 'form' ).submit();
                });
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Add filters dropdowns compatibility
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            filterDropdowns: function() {

                $('.basel-woocommerce-layered-nav').on('change', 'select', function() {
                    var slug = $( this ).val();

                    var href = $(this).data('filter-url').replace('BASEL_FILTER_VALUE', slug);

                    $(this).siblings('.filter-pseudo-link').attr('href', href);

                     var event;
                     var pseudoLink = $(this).siblings('.filter-pseudo-link');

                     //This is true only for IE,firefox
                     if(document.createEvent){
                     // To create a mouse event , first we need to create an event and then initialize it.
                        event = document.createEvent("MouseEvent");
                        event.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
                     }
                     else{
                        event = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true
                        });
                     }

                     pseudoLink[0].dispatchEvent(event);
                });
             },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Back in history
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            backHistory: function() {
                history.go(-1);

                setTimeout(function(){
                    $('.filters-area').removeClass('filters-opened').stop().hide();
                    $('.open-filters').removeClass('btn-opened');
                    if( $(window).width() < 992 ) {
                        $('.basel-product-categories').removeClass('categories-opened').stop().hide();
                        $('.basel-show-categories').removeClass('button-open');
                    }
                }, 20);


            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Categories menu for mobile
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            categoriesMenu: function() {
                if( $(window).width() > 991 ) return;

                var categories = $('.basel-product-categories'),
                    subCategories = categories.find('li > ul'),
                    button = $('.basel-show-categories'),
                    time = 200;


                //this.categoriesMenuBtns();

                $('body').on('click','.icon-drop-category', function(){
                    if($(this).parent().find('> ul').hasClass('child-open')){
                        $(this).removeClass("basel-act-icon").parent().find('> ul').slideUp(time).removeClass('child-open');
                    }else {
                        $(this).addClass("basel-act-icon").parent().find('> ul').slideDown(time).addClass('child-open');
                    }
                });

                $('body').on('click', '.basel-show-categories', function(e) {
                    e.preventDefault();

                    console.log('close click');

                    if( isOpened() ) {
                        closeCats();
                    } else {
                        //setTimeout(function() {
                            openCats();
                        //}, 50);
                    }
                });

                $('body').on('click', '.basel-product-categories a', function(e) {
                    closeCats();
                    categories.stop().attr('style', '');
                });

                var isOpened = function() {
                    return $('.basel-product-categories').hasClass('categories-opened');
                };

                var openCats = function() {
                    $('.basel-product-categories').addClass('categories-opened').stop().slideDown(time);
                    $('.basel-show-categories').addClass('button-open');

                };

                var closeCats = function() {
                    $('.basel-product-categories').removeClass('categories-opened').stop().slideUp(time);
                    $('.basel-show-categories').removeClass('button-open');
                };
            },


            categoriesMenuBtns: function() {
                if( $(window).width() > 991 ) return;

                var categories = $('.basel-product-categories'),
                    subCategories = categories.find('li > ul'),
                    iconDropdown = '<span class="icon-drop-category"></span>';

                categories.addClass('responsive-cateogires');
                subCategories.parent().addClass('has-sub').prepend(iconDropdown);
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Categories toggle accordion
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            categoriesAccordion: function() {
                if( basel_settings.categories_toggle == 'no' ) return;

                var $widget = $('.widget_product_categories'),
                    $list = $widget.find('.product-categories'),
                    $openBtn = $('<div class="basel-cats-toggle" />'),
                    time = 300;

                $list.find('.cat-parent').append( $openBtn );

                $list.on('click', '.basel-cats-toggle', function() {
                    var $btn = $(this),
                        $subList = $btn.prev();

                    if( $subList.hasClass('list-shown') ) {
                        $btn.removeClass('toggle-active');
                        $subList.stop().slideUp(time).removeClass('list-shown');
                    } else {
                        $subList.parent().parent().find('> li > .list-shown').slideUp().removeClass('list-shown');
                        $subList.parent().parent().find('> li > .toggle-active').removeClass('toggle-active');
                        $btn.addClass('toggle-active');
                        $subList.stop().slideDown(time).addClass('list-shown');
                    }
                });

                if( $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').length > 0 ) {
                    $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').find('> .basel-cats-toggle').click();
                }

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * WooCommerce price filter slider with ajax
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */

            woocommercePriceSlider: function() {

                // woocommerce_price_slider_params is required to continue, ensure the object exists
                if ( typeof woocommerce_price_slider_params === 'undefined' || $( '.price_slider_amount #min_price' ).length < 1 || ! $.fn.slider ) {
                    return false;
                }

                // Get markup ready for slider
                $( 'input#min_price, input#max_price' ).hide();
                $( '.price_slider, .price_label' ).show();

                // Price slider uses jquery ui
                var min_price = $( '.price_slider_amount #min_price' ).data( 'min' ),
                    max_price = $( '.price_slider_amount #max_price' ).data( 'max' ),
                    current_min_price = parseInt( min_price, 10 ),
                    current_max_price = parseInt( max_price, 10 );

                if ( $('.products').attr('data-min_price') && $('.products').attr('data-min_price').length > 0 ) {
                    current_min_price = parseInt( $('.products').attr('data-min_price'), 10 );
                }
                if ( $('.products').attr('data-max_price') && $('.products').attr('data-max_price').length > 0 ) {
                    current_max_price = parseInt( $('.products').attr('data-max_price'), 10 );
                }

                $( '.price_slider' ).slider({
                    range: true,
                    animate: true,
                    min: min_price,
                    max: max_price,
                    values: [ current_min_price, current_max_price ],
                    create: function() {

                        $( '.price_slider_amount #min_price' ).val( current_min_price );
                        $( '.price_slider_amount #max_price' ).val( current_max_price );

                        $( document.body ).trigger( 'price_slider_create', [ current_min_price, current_max_price ] );
                    },
                    slide: function( event, ui ) {

                        $( 'input#min_price' ).val( ui.values[0] );
                        $( 'input#max_price' ).val( ui.values[1] );

                        $( document.body ).trigger( 'price_slider_slide', [ ui.values[0], ui.values[1] ] );
                    },
                    change: function( event, ui ) {

                        $( document.body ).trigger( 'price_slider_change', [ ui.values[0], ui.values[1] ] );
                    }
                });

                setTimeout(function() {
                    $( document.body ).trigger( 'price_slider_create', [ current_min_price, current_max_price ] );
                }, 10);
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Filters area
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            filtersArea: function() {
                var filters = $('.filters-area'),
                    btn = $('.open-filters'),
                    time = 200;

                $('body').on('click', '.open-filters', function(e) {
                    e.preventDefault();

                    if( isOpened() ) {
                        closeFilters();
                    } else {
                        openFilters();
                    }

                });

                $('body').on('click', baselTheme.ajaxLinks, function() {
                    if( isOpened() ) {
                        closeFilters();
                    }
                });

                var isOpened = function() {
                    filters = $('.filters-area')
                    return filters.hasClass('filters-opened');
                };

                var closeFilters = function() {
                    filters = $('.filters-area')
                    filters.removeClass('filters-opened');
                    filters.stop().slideUp(time);
                    $('.open-filters').removeClass('btn-opened');
                };

                var openFilters = function() {
                    filters = $('.filters-area')
                    filters.addClass('filters-opened');
                    filters.stop().slideDown(time);
                    $('.open-filters').addClass('btn-opened');
                    setTimeout(function() {
                        baselThemeModule.nanoScroller();
                    }, time);
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Ajax Search for products
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            ajaxSearch: function() {

                var url = basel_settings.ajaxurl + '?action=basel_ajax_search',
                    form = $('form.basel-ajax-search'),
                    escapeRegExChars = function (value) {
                        return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    };

                form.each(function() {
                    var $this = $(this),
                        number = parseInt( $this.data('count') ),
                        thumbnail = parseInt( $this.data('thumbnail') ),
                        product_cat = $this.find('[name="product_cat"]').val(),
                        $results = $this.parent().find('.basel-search-results'),
                        price = parseInt( $this.data('price') );

                    if( number > 0 ) {
                        url += '&number=' + number;
                    }

                    $results.on('click', '.view-all-products', function() {
                        $this.submit();
                    });

                    /*if(product_cat) {
                        url += '&product_cat=' + product_cat;
                    }*/

                    $this.find('[type="text"]').autocomplete({
                        serviceUrl: url,
                        appendTo: $results,
                        onSelect: function (suggestion) {
                            if( suggestion.permalink.length > 0)
                                window.location.href = suggestion.permalink;
                        },
                        onSearchStart: function (query) {
                            $this.addClass('search-loading');
                        },
                        beforeRender: function (container) {

                            if( container[0].childElementCount > 2 )
                                $(container).append('<div class="view-all-products"><span>' + basel_settings.all_results + '</span></div>');

                        },
                        onSearchComplete: function(query, suggestions) {
                            $this.removeClass('search-loading');
                            $(".basel-scroll").nanoScroller({
                                paneClass: 'basel-scroll-pane',
                                sliderClass: 'basel-scroll-slider',
                                contentClass: 'basel-scroll-content',
                                preventPageScrolling: true
                            });
                        },
                        formatResult: function( suggestion, currentValue ) {
                            if( currentValue == '&' ) currentValue = "&#038;";
                            var pattern = '(' + escapeRegExChars(currentValue) + ')',
                                returnValue = '';

                            if( thumbnail && suggestion.thumbnail ) {
                                returnValue += ' <div class="suggestion-thumb">' + suggestion.thumbnail + '</div>';
                            }

                            returnValue += '<div class="suggestion-title">' + suggestion.value
                                .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
                                // .replace(/&/g, '&amp;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;')
                                .replace(/&lt;(\/?strong)&gt;/g, '<$1>') + '</div>';

                            if( price && suggestion.price ) {
                                returnValue += ' <div class="suggestion-price price">' + suggestion.price + '</div>';
                            }

                            return returnValue;
                        }
                    });

                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Search full screen
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            searchFullScreen: function() {

                var body = $('body'),
                    searchWrapper = $('.basel-search-wrapper'),
                    offset = 0;

                if( ! searchWrapper.find('.searchform').hasClass('basel-ajax-search') && $('.search-button').hasClass('basel-search-dropdown') ) return;

                body.on('click', '.search-button > a', function(e) {
                    e.preventDefault();
                    if( $('.sticky-header.act-scroll').length > 0 ) {
                        searchWrapper = $('.sticky-header .basel-search-wrapper');
                    } else {
                        searchWrapper = $('.main-header .basel-search-wrapper');
                    }
                    if( isOpened() ) {
                        closeWidget();
                    } else {
                        setTimeout( function() {
                            openWidget();
                        }, 10);
                    }
                })


                body.on("click", ".basel-close-search, .main-header, .sticky-header, .topbar-wrapp, .main-page-wrapper", function(event) {

                    if ( ! $(event.target).is('.basel-close-search') && $(event.target).closest(".basel-search-wrapper").length ) return;

                    if( isOpened() ) {
                        closeWidget();
                    }
                });

                var closeWidget = function() {
                    $('body').removeClass('basel-search-opened');
                    searchWrapper.removeClass('search-overlap');
                };

                var openWidget = function() {
                    var bar = $('#wpadminbar').outerHeight();

                    var offset = $('.main-header').outerHeight() + bar;

                    if( ! $('.main-header').hasClass('act-scroll') ) {
                        offset += $('.topbar-wrapp').outerHeight();
                    }

                    if( $('.sticky-header').hasClass('header-clone') && $('.sticky-header').hasClass('act-scroll') ) {
                        offset = $('.sticky-header').outerHeight() + bar;
                    }

                    if( $('.main-header').hasClass('header-menu-top') && $('.header-spacing') ) {
                        offset = $('.header-spacing').outerHeight() + bar;
                    }


                    searchWrapper.css('top', offset);

                    $('body').addClass('basel-search-opened');
                    searchWrapper.addClass('search-overlap');
                    setTimeout(function() {
                        searchWrapper.find('input[type="text"]').focus();
                        $(window).one('scroll', function() {
                            if( isOpened() ) {
                                closeWidget();
                            }
                        });
                    }, 300);
                };

                var isOpened = function() {
                    return $('body').hasClass('basel-search-opened');
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Login tabs for my account page
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            loginTabs: function() {
                var tabs = $('.basel-register-tabs'),
                    btn = tabs.find('.basel-switch-to-register'),
                    login = tabs.find('.col-login'),
                    register = tabs.find('.col-register'),
                    classOpened = 'active-register',
                    loginLabel = btn.data('login'),
                    registerLabel = btn.data('register');

                btn.click(function(e) {
                    e.preventDefault();

                    if( isShown() ) {
                        hideRegister();
                    } else {
                        showRegister();
                    }

                    var scrollTo = $('.main-page-wrapper').offset().top - 100;

                    if( $(window).width() < 768 ) {
                        $('html, body').stop().animate({
                            scrollTop: tabs.offset().top - 50
                        }, 400);
                    }
                });

                var showRegister = function() {
                    tabs.addClass(classOpened);
                    btn.text(loginLabel);
                };

                var hideRegister = function() {
                    tabs.removeClass(classOpened);
                    btn.text(registerLabel);
                };

                var isShown = function() {
                    return tabs.hasClass(classOpened);
                };
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Product accordion
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productAccordion: function() {
                var $accordion = $('.tabs-layout-accordion');

                var time = 300;

                var hash  = window.location.hash;
                var url   = window.location.href;

                if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' || hash === '#tab-reviews' ) {
                    $accordion.find('.tab-title-reviews').addClass('active');
                } else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
                    $accordion.find('.tab-title-reviews').addClass('active');
                } else {
                    $accordion.find('.basel-accordion-title').first().addClass('active');
                }

                $accordion.on('click', '.basel-accordion-title', function( e ) {
                    e.preventDefault();

                    var $this = $(this),
                        $panel = $this.siblings('.woocommerce-Tabs-panel');

                    if( $this.hasClass('active') ) {
                        $this.removeClass('active');
                        $panel.stop().slideUp(time);
                    } else {
                        $accordion.find('.basel-accordion-title').removeClass('active');
                        $accordion.find('.woocommerce-Tabs-panel').slideUp();
                        $this.addClass('active');
                        $panel.stop().slideDown(time);
                    }

                    $(window).resize();

                    setTimeout( function() {
                        $(window).resize();
                    }, time);

                } );
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Compact product layout
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            productCompact: function() {
                $(".product-design-compact .basel-scroll").nanoScroller({
                    paneClass: 'basel-scroll-pane',
                    sliderClass: 'basel-scroll-slider',
                    contentClass: 'basel-scroll-content',
                    preventPageScrolling: false
                });
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Sale final date countdown
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            countDownTimer: function() {

                $('.basel-timer').each(function(){
                    $(this).countdown($(this).data('end-date'), function(event) {
                        $(this).html(event.strftime(''
                            + '<span class="countdown-days">%-D <span>' + basel_settings.countdown_days + '</span></span> '
                            + '<span class="countdown-hours">%H <span>' + basel_settings.countdown_hours + '</span></span> '
                            + '<span class="countdown-min">%M <span>' + basel_settings.countdown_mins + '</span></span> '
                            + '<span class="countdown-sec">%S <span>' + basel_settings.countdown_sec + '</span></span>'));
                    });
                });

            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Remove click delay on mobile
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            mobileFastclick: function() {

                if ('addEventListener' in document) {
                    document.addEventListener('DOMContentLoaded', function() {
                        FastClick.attach(document.body);
                    }, false);
                }

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Init nanoscroller
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            nanoScroller: function() {

                $(".basel-scroll").nanoScroller({
                    paneClass: 'basel-scroll-pane',
                    sliderClass: 'basel-scroll-slider',
                    contentClass: 'basel-scroll-content',
                    preventPageScrolling: false
                });

            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fix RTL issues
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            RTL: function() {
                if( ! $('body').hasClass('rtl') ) return;

                $(document).on("vc-full-width-row", function(event, el) {
                    var $rows = $( '[data-vc-full-width="true"]' );
                    $rows.each(function() {
                        var $this = $(this),
                            left = parseInt( $this.css("left"), 10 );

                        $this.css({
                            left: -left
                        });

                        if( $('.main-header').hasClass('header-vertical') ) {
                            var paddingLeft = $this.css('padding-left'),
                                paddingRight = $this.css('padding-right');

                            $this.css({
                                paddingLeft: paddingRight,
                                paddingRight: paddingLeft
                            });

                        }
                    });
                })
            },


            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Fix comments
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            woocommerceComments: function() {
                var hash  = window.location.hash;
                var url   = window.location.href;

                if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' || hash === '#tab-reviews' || url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {

                    setTimeout(function() {
                        window.scrollTo(0, 0);
                    }, 1);

                    setTimeout(function() {
                        $('html, body').stop().animate({
                            scrollTop: $(hash).offset().top-100
                        }, 400);
                    }, 10);

                }
            },
            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Remove from cart functionality with AJAX
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            AJAXRemoveFromCart: function() {
                $( document ).on('click', '.widget_shopping_cart .remove', function(e) {
                    e.preventDefault();

                    var $this = $(this),
                        $widget = $('.widget_shopping_cart'),
                        remove_item = $this.data('remove_item'),
                        _wpnonce = $this.data('wpnonce');

                    $widget.addClass('removing-process');

                    $.ajax({
                        url: basel_settings.ajaxurl,
                        data: {
                            cart_item: remove_item,
                            _wpnonce: _wpnonce,
                            action: 'basel_remove_from_cart'
                        },
                        method: 'GET',
                        success:function( data ) {
                            if ( data && data.fragments ) {

                                $.each( data.fragments, function( key, value ) {
                                    $( key ).replaceWith( value );
                                });

                                if ( baselTheme.supports_html5_storage ) {
                                    var cart_hash_key = wc_cart_fragments_params.ajax_url.toString() + '-wc_cart_hash';

                                    sessionStorage.setItem( wc_cart_fragments_params.fragment_name, JSON.stringify( data.fragments ) );

                                    localStorage.setItem( cart_hash_key, data.cart_hash );
                                    sessionStorage.setItem( cart_hash_key, data.cart_hash );

                                    if ( data.cart_hash ) {
                                        sessionStorage.setItem( 'wc_cart_created', ( new Date() ).getTime() );
                                    }
                                }

                                $( document.body ).trigger( 'wc_fragments_refreshed' );
                            }
                        },
                        error: function() {
                            console.log('removing from cart AJAX error');
                        },
                        complete: function() {
                            $widget.removeClass('removing-process');
                        }
                    });
                })
            },

            /**
             *-------------------------------------------------------------------------------------------------------------------------------------------
             * Quantityt +/-
             *-------------------------------------------------------------------------------------------------------------------------------------------
             */
            woocommerceQuantity: function() {
                if ( ! String.prototype.getDecimals ) {
                    String.prototype.getDecimals = function() {
                        var num = this,
                            match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                        if ( ! match ) {
                            return 0;
                        }
                        return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
                    }
                }


                $( document ).on( 'click', '.plus, .minus', function() {
                console.log(1);
                    // Get values
                    var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                        currentVal  = parseFloat( $qty.val() ),
                        max         = parseFloat( $qty.attr( 'max' ) ),
                        min         = parseFloat( $qty.attr( 'min' ) ),
                        step        = $qty.attr( 'step' );

                    // Format values
                    if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
                    if ( max === '' || max === 'NaN' ) max = '';
                    if ( min === '' || min === 'NaN' ) min = 0;
                    if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

                    // Change the value
                    if ( $( this ).is( '.plus' ) ) {
                        if ( max && ( currentVal >= max ) ) {
                            $qty.val( max );
                        } else {
                            $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                        }
                    } else {
                        if ( min && ( currentVal <= min ) ) {
                            $qty.val( min );
                        } else if ( currentVal > 0 ) {
                            $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                        }
                    }

                    // Trigger change event
                    $qty.trigger( 'change' );
                });

            },
        }
    }());

})(jQuery);


jQuery(document).ready(function() {

    baselThemeModule.init();

});
