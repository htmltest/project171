$(document).ready(function() {

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parents().filter('.form-input').addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parents().filter('.form-input').removeClass('focus');
        if ($(this).val() != '') {
            $(this).parents().filter('.form-input').addClass('full');
        } else {
            $(this).parents().filter('.form-input').removeClass('full');
        }
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-name').html(curName);
        } else {
            curField.find('.form-file-name').html('');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        curGallery.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
            adaptiveHeight: true,
            fade: true,
            dots: false
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('.slider-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        arrows: false,
        dots: true
    });

    $('.main-how-menu-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.main-how-menu-item.active').removeClass('active');
            curItem.addClass('active');

            var curIndex = $('.main-how-menu-item').index(curItem);
            $('.main-how-tab.active').removeClass('active');
            $('.main-how-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.faq-item-title a').click(function(e) {
        var curItem = $(this).parents().filter('.faq-item');
        curItem.toggleClass('open');
        curItem.find('.faq-item-text').slideToggle();
        e.preventDefault();
    });

    $('.main-reviews-list').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1119,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('body').on('click', '[data-href]', function(e) {
        if ($(this).parents().filter('.personal-orders-item-header-id').length == 1) {
            window.location = $(this).attr('data-href');
        } else {
            window.open($(this).attr('data-href'), '_blank');
        }
        e.preventDefault();
    });

    $('.portfolio-pager-size-current').click(function(e) {
        $('.portfolio-pager-size').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.portfolio-pager-size').length == 0) {
            $('.portfolio-pager-size').removeClass('open');
        }
    });

    $('.portfolio-pager-size ul li a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.portfolio-pager-size ul li.active').removeClass('active');
            curItem.addClass('active');
            $('.portfolio-pager-size-current span').html($(this).find('span').html());
        }
        $('.portfolio-pager-size').removeClass('open');
        filterPortfolio();
        e.preventDefault();
    });

    $('body').on('click', '.portfolio-pager .pager a', function(e) {
        $('.portfolio-pager .pager a.active').removeClass('active');
        $(this).addClass('active');
        filterPortfolio();
        e.preventDefault();
    });

    $('.catalogue-pager-size-current').click(function(e) {
        $('.catalogue-pager-size').toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-pager-size').length == 0) {
            $('.catalogue-pager-size').removeClass('open');
        }
    });

    $('.catalogue-pager-size ul li a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.catalogue-pager-size ul li.active').removeClass('active');
            curItem.addClass('active');
            $('.catalogue-pager-size-current span').html($(this).find('span').html());
        }
        $('.catalogue-pager-size').removeClass('open');
        filterCatalogue();
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-pager .pager a', function(e) {
        $('.catalogue-pager .pager a.active').removeClass('active');
        $(this).addClass('active');
        filterCatalogue();
        e.preventDefault();
    });

    $('body').on('change', '.catalogue-filter-item input', function(e) {
        filterParamsUpdate();
        filterCatalogue();
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-filter-group-params-item a', function(e) {
        var curID = $(this).parent().attr('data-id');
        var curGroup = $(this).parents().filter('.catalogue-filter-group');
        curGroup.find('.catalogue-filter-item').eq(curID).find('input').prop('checked', false).trigger('change');
        curGroup.find('.catalogue-filter-slider').each(function() {
            var curSlider = $(this);
            curSlider.find('.form-slider-range-inner')[0].noUiSlider.set([Number(curSlider.find('.form-slider-min').html()), Number(curSlider.find('.form-slider-max').html())]);
            filterParamsUpdate();
            filterCatalogue();
        });
        e.preventDefault();
    });

    $('.catalogue-sort-item a').click(function(e) {
        var curItem = $(this).parent();
        var curGroup = curItem.parent();
        if (!curItem.hasClass('active')) {
            $('.catalogue-sort-item.active').removeClass('active');
            curItem.addClass('active');
            $('.catalogue-sort-group.active').removeClass('active');
            curGroup.addClass('active');
        } else {
            curGroup.find('.catalogue-sort-item').addClass('active dir-active');
            curItem.removeClass('active dir-active');
        }
        filterCatalogue();
        e.preventDefault();
    });

    $('.catalogue-type-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.catalogue-list, .catalogue-list-rows-headers').removeClass($('.catalogue-type-item.active a').attr('data-type'));
            $('.catalogue-type-item.active').removeClass('active');
            curItem.addClass('active');
            $('.catalogue-list, .catalogue-list-rows-headers').addClass(curItem.find('a').attr('data-type'));
        }
        e.preventDefault();
    });

    $('.catalogue-ctrl-mobile-filter').click(function(e) {
        $('html').removeClass('catalogue-search-open');
        $('html').removeClass('catalogue-sort-open');
        if (!$('html').hasClass('catalogue-filter-open')) {
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('catalogue-filter-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.catalogue-filter-close').click(function(e) {
        if ($('html').hasClass('catalogue-filter-open')) {
            $('html').removeClass('catalogue-filter-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $('.catalogue-ctrl-mobile-search').click(function(e) {
        $('html').removeClass('catalogue-sort-open');
        $('html').toggleClass('catalogue-search-open');
        e.preventDefault();
    });

    $('.catalogue-ctrl-mobile-sort').click(function(e) {
        $('html').removeClass('catalogue-search-open');
        $('html').toggleClass('catalogue-sort-open');
        e.preventDefault();
    });

    $('.catalogue-filter-apply').click(function(e) {
        if ($('html').hasClass('catalogue-filter-open')) {
            $('html').removeClass('catalogue-filter-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-filter-group-header-link', function(e) {
        $(this).parent().parent().toggleClass('open');
        $(this).parent().parent().addClass('open-mobile');
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-filter-group-all a', function(e) {
        $(this).parent().parent().toggleClass('all');
        e.preventDefault();
    });

    $('.catalogue-filter-group-all').each(function() {
        var curBlock = $(this).parent();
        if (curBlock.find('> .catalogue-filter-item').length > 6) {
            $(this).addClass('visible');
            $(this).find('em').html(curBlock.find('> .catalogue-filter-item').length - 6);
        }

    });

    $('.catalogue-search form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                $('.catalogue-container').addClass('loading');
                var curForm = $('.catalogue-search form');
                var curData = curForm.serialize();
                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    dataType: 'html',
                    data: curData,
                    cache: false
                }).done(function(html) {
                    $('.catalogue-container .catalogue-list').html($(html).find('.catalogue-list').html())
                    $('.catalogue-container .pager').html($(html).find('.pager').html())
                    $('.catalogue-header-status-from').html($(html).find('.catalogue-list').attr('data-statusfrom'));
                    $('.catalogue-header-status-to').html($(html).find('.catalogue-list').attr('data-statusto'));
                    $('.catalogue-header-status-count').html($(html).find('.catalogue-list').attr('data-statuscount'));
                    $('.catalogue-container').removeClass('loading');
                });
            }
        });
    });

    $('.catalogue-search-input input').on('keyup', function() {
        $('.catalogue-search form').trigger('submit');
    });


    $('.catalogue-filter-reset').click(function(e) {
        $('.catalogue-filter-group-reset').trigger('click');
        e.preventDefault();
    });

    $('.catalogue-filter-group-reset, .catalogue-filter-group-params-remove').click(function(e) {
        var curGroup = $(this).parents().filter('.catalogue-filter-group');
        curGroup.find('.catalogue-filter-item input').prop('checked', false);
        curGroup.find('.catalogue-filter-slider').each(function() {
            var curSlider = $(this);
            curSlider.find('.form-slider-range-inner')[0].noUiSlider.set([Number(curSlider.find('.form-slider-min').html()), Number(curSlider.find('.form-slider-max').html())]);
        });
        filterParamsUpdate();
        filterCatalogue();
        e.preventDefault();
    });

    $('.catalogue-filter-group-close').click(function(e) {
        var curGroup = $(this).parents().filter('.catalogue-filter-group');
        curGroup.removeClass('open-mobile');
        e.preventDefault();
    });

    $('.catalogue-filter-group-apply a').click(function(e) {
        var curGroup = $(this).parents().filter('.catalogue-filter-group');
        curGroup.removeClass('open-mobile');
        e.preventDefault();
    });

    $('.catalogue-filter .form-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.form-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.form-slider-min').html());
        if (Number(curSlider.find('.form-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.form-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.form-slider-max').html());
        if (Number(curSlider.find('.form-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.form-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.form-slider-min').html()),
                'max': Number(curSlider.find('.form-slider-max').html())
            },
            tooltips: [wNumb({thousand: ' '}), wNumb({thousand: ' '})],
            step: Number(curSlider.find('.form-slider-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.form-slider-from').val(values[handle]);
                curSlider.find('.form-slider-hints-from span').html(String(values[handle]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            } else {
                curSlider.find('.form-slider-to').val(values[handle]);
                curSlider.find('.form-slider-hints-to span').html(String(values[handle]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            }
        });
        curRange.noUiSlider.on('end', function(values, handle) {
            filterParamsUpdate();
            filterCatalogue();
        });
    });

    filterParamsUpdate();

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        if ($('html').hasClass('mobile-menu-open')) {
            $('html').removeClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('mobile-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

    $('.nav .nav-arrow-mobile').each(function() {
        $(this).wrap('<span class="nav-arrow-mobile-container"></span>')
    });

    $('.nav-arrow-mobile-container').click(function(e) {
        if ($(this).parent().parent().find('ul').length > 0) {
            $(this).parent().parent().toggleClass('open');
            e.preventDefault();
        }
        return false;
    });

    $('.footer-menu-block-title a').click(function(e) {
        if ($(window).width() < 1120) {
            if ($(this).parent().parent().find('.footer-menu-block-list').length > 0) {
                $(this).parent().parent().toggleClass('open');
                e.preventDefault();
            }
        }
    });

    $('.clients-reviews-list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 1119,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    $('.clients-list-inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
        dots: false,
        variableWidth: true
    });

    $('.faq-menu a').click(function(e) {
        var curBlock = $(this.hash);
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight() - 20});
            e.preventDefault();
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.catalogue-card-tabs').each(function() {
        var curTabs = $(this);
        var curTabsMenu = curTabs.find('> .catalogue-card-tabs-menu');
        var curTabsContainer = curTabs.find('> .catalogue-card-tabs-container');
        var newHTML = '<ul>';
        curTabsContainer.find('> .catalogue-card-tab').each(function() {
            var curTabTitle = $(this).find('> .catalogue-card-tab-title span').html();
            newHTML += '<li><a href="#">' + curTabTitle + '</a></li> ';
        });
        curTabsContainer.find('> .catalogue-card-tab').eq(0).addClass('active');
        newHTML += '</ul>';
        curTabsMenu.html(newHTML);
        curTabsMenu.find('li').eq(0).addClass('active');
    });

    $('body').on('click', '.catalogue-card-tabs-menu li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curTabs = curLi.parents().filter('.catalogue-card-tabs');
            curTabs.find('.catalogue-card-tabs-menu li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = curTabs.find('.catalogue-card-tabs-menu li').index(curLi);
            curTabs.find('.catalogue-card-tab.active').removeClass('active');
            curTabs.find('.catalogue-card-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-card-tab-title', function(e) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.catalogue-card-text-more a', function(e) {
        $(this).parents().filter('.catalogue-card-text').toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.text-with-hint.open').removeClass('open');
            curBlock.removeClass('to-right');
            curBlock.addClass('open');
            var curPopup = curBlock.find('.text-with-hint-popup');
            if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {
                curBlock.addClass('to-right');
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-popup-close', function(e) {
        $('.text-with-hint.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.text-with-hint').length == 0) {
            $('.text-with-hint.open').removeClass('open');
        }
    });

    $('.header-search-link').click(function(e) {
        $('html').addClass('header-search-open');
        $('.header-search-input input').trigger('focus');
        e.preventDefault();
    });

    $('.header-search-close').click(function(e) {
        $('html').removeClass('header-search-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('html').removeClass('header-search-open');
        }
    });

    $('body').on('click', '.portfolio-item-inner', function(e) {
        if (!$(e.target).parent().hasClass('portfolio-item-link')) {
            var curItem = $(this).parent();
            var curList = curItem.parent();

            var curIndex = curList.find('.portfolio-item').index(curItem);

            var newHTML =   '<div class="window-portfolio">' +
                                '<div class="window-portfolio-list">';
            var count = curList.find('.portfolio-item').length;
            for (var i = 0; i < count; i++) {
                var newItem = curList.find('.portfolio-item').eq(i);
                newHTML +=          '<div class="window-portfolio-item">' +
                                        '<div class="window-portfolio-item-title">' + newItem.find('.portfolio-item-title').html() + '</div>' +
                                        '<div class="window-portfolio-item-photo"><img src="' + newItem.find('.portfolio-item-inner').attr('data-photobig') + '" alt=""></div>' +
                                        '<div class="window-portfolio-item-link"><a href="' + newItem.find('.portfolio-item-link a').attr('href') + '" class="btn" target="_blank">' + newItem.find('.portfolio-item-link a').html() + '</a></div>' +
                                    '</div>';
            }
            newHTML +=          '</div>' +
                            '</div>';

            var curPadding = $('.wrapper').width();
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('window-open');
            curPadding = $('.wrapper').width() - curPadding;
            $('body').css({'margin-right': curPadding + 'px'});
            $('header').css({'padding-right': curPadding + 'px'});
            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

            $('body').append('<div class="window"><div class="window-container">' + newHTML + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div></div>')

            $('.window-portfolio-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: curIndex,
                prevArrow: '<button type="button" class="slick-prev"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-prev"></use></svg></button>',
                nextArrow: '<button type="button" class="slick-next"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#gallery-next"></use></svg></button>',
                dots: false
            });
        }
    });

    $('.form-input-password-view').click(function(e) {
        var curField = $(this).parents().filter('.form-input');
        if (curField.find('input').attr('type') == 'password') {
            curField.find('input').attr('type', 'text');
            curField.addClass('password-view');
        } else {
            curField.find('input').attr('type', 'password');
            curField.removeClass('password-view');
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-item-favourite', function(e) {
        var curItem = $(this).parents().filter('.catalogue-item');
        curItem.toggleClass('in-favourite');
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-item-cart', function(e) {
        var curItem = $(this).parents().filter('.catalogue-item');
        curItem.addClass('in-cart');
        e.preventDefault();
    });

    $('body').on('change', '.catalogue-card-price-checkbox input', function(e) {
        var curInput = $(this);
        var curItem = curInput.parents().filter('.catalogue-card-price-item');
        if (curInput.prop('checked')) {
            curItem.addClass('checked');
        } else {
            curItem.removeClass('checked');
        }
        updateCardPrice();
    });

    $('.catalogue-card-price').each(function() {
        updateCardPrice();
    });

    $('body').on('click', '.catalogue-card-price-favourite', function(e) {
        var curItem = $(this).parents().filter('.catalogue-card');
        curItem.toggleClass('in-favourite');
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-card-price-cart', function(e) {
        var curItem = $(this).parents().filter('.catalogue-card');
        curItem.addClass('in-cart');
        e.preventDefault();
    });


    $('.order').each(function() {
        updateOrder();
    });

    $('body').on('click', '.order-cart-item-remove', function(e) {
        $('.order-cart-confirm').addClass('visible');
        $('.order-cart-item').removeClass('is-remove');
        var curItem = $(this).parents().filter('.order-cart-item');
        curItem.addClass('is-remove');
        e.preventDefault();
    });

    $('body').on('click', '.order-cart-confirm-apply', function(e) {
        $('.order-cart-confirm').removeClass('visible');
        var curItem = $('.order-cart-item.is-remove');
        curItem.remove();
        updateOrder();
        e.preventDefault();
    });

    $('body').on('click', '.order-cart-confirm-cancel', function(e) {
        $('.order-cart-confirm').removeClass('visible');
        e.preventDefault();
    });

    $('body').on('change', '.order-cart-item-article input', function(e) {
        updateOrder();
    });

    $('body').on('click', '.personal-orders-item-header', function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('body').on('click', '.order-detail-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.order-detail-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.order-detail-menu ul li').index(curLi);
            $('.order-detail-tab.active').removeClass('active');
            $('.order-detail-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.order-detail-menu').each(function() {
        if ($(window).width() < 1120) {
            $('.order-detail-menu ul li a').eq(0).click();
        }
    });

    $('body').on('click', '.support-tickets-item-header', function(e) {
        if ($(window).width() < 1120) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        }
    });

    $('body').on('change', '.personal-profile-avatar-new input', function(e) {
        var file = this.files[0];
        if (typeof(file) != 'undefined') {
            var reader = new FileReader;
            reader.onload = function(event) {
                if (file.type.match("image.*")) {
                    var exifOrientation = 0;
                    EXIF.getData(file, function () {
                        switch (this.exifdata.Orientation) {
                            case 1:
                                exifOrientation = 0;
                                break;
                            case 2:
                                exifOrientation = 0;
                                break;
                            case 3:
                                exifOrientation = 180;
                                break;
                            case 4:
                                exifOrientation = 180;
                                break;
                            case 5:
                                exifOrientation = 90;
                                break;
                            case 6:
                                exifOrientation = 90;
                                break;
                            case 7:
                                exifOrientation = -90;
                                break;
                            case 8:
                                exifOrientation = -90;
                                break;
                            default:
                                exifOrientation = 0
                        }
                    });
                    var dataUri = event.target.result;
                    var canvas = document.getElementById('photo-editor');
                    var context = canvas.getContext('2d');
                    var img = new Image();
                    img.onload = function() {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.fillStyle = '#FFFFFF';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        var imgWidth  = img.width;
                        var imgHeight = img.height;
                        var newWidth  = 200;
                        var newHeight = 200;
                        var newX = -100;
                        var newY = -100;
                        if (imgWidth > imgHeight) {
                            var diffHeight = newHeight / imgHeight;
                            newWidth = imgWidth * diffHeight;
                            newX = -(newWidth - 200) / 2 - 100;
                        } else {
                            var diffWidth = newWidth / imgWidth;
                            newHeight = imgHeight * diffWidth;
                            newY = -(newHeight - 200) / 2 - 100;
                        }
                        var TO_RADIANS = Math.PI/180;
                        context.save();
                        context.translate(100, 100);
                        context.rotate(exifOrientation * TO_RADIANS);
                        context.drawImage(img, newX, newY, newWidth, newHeight);
                        context.restore();
                        context.translate(0, 0);
                    };
                    img.src = dataUri;
                }
            }
            reader.readAsDataURL(file);
        }
    });

    $('body').on('click', '.manager-orders-item-header', function(e) {
        if ($(window).width() < 1120) {
            $(this).parent().toggleClass('open');
            e.preventDefault();
        }
    });

    $('body').on('click', '.order-detail-status-select-current', function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.order-detail-status-select').length == 0) {
            $('.order-detail-status-select.open').removeClass('open');
        }
    });

    $('body').on('change', '.order-detail-status-select-item label input', function() {
        var curSelect = $(this).parents().filter('.order-detail-status-select');
        var curOption = curSelect.find('.order-detail-status-select-item label input:checked');
        if (curOption.length == 1) {
            curSelect.addClass('full');
            curSelect.find('.order-detail-status-select-current strong').html(curOption.parent().find('span').text());
            $('.order-detail-status-ctrl-submit .btn').prop('disabled', false);
        }
        curSelect.removeClass('open');
    });

    $('.order-detail-status-ctrl-comment-link a').click(function(e) {
        $('.order-detail-status-form').toggleClass('open');
        e.preventDefault();
    });

    $('body').on('change', '.order-media-window-item-input .form-input input', function() {
        var curInput = $(this);
        var curValue = Number(curInput.val());
        if (isNaN(curValue)) {
            curValue = 0;
        }
        curInput.val(curValue);
        recalcMediaWindow();
        $('.order-media-window').addClass('is-edit');
    });

    $('body').on('change', '.order-media-window-item-input-need label input', function() {
        recalcMediaWindow();
        $('.order-media-window').addClass('is-edit');
    });

    $('body').on('click', '.order-media-window-item-remove', function(e) {
        if (confirm('Confirm remove?')) {
            var curItem = $(this).parents().filter('.order-media-window-item');
            var curID = curItem.attr('data-id');
            $('.order-media-window-ctrl-add-popup-item[data-id="' + curID + '"]').removeClass('active');
            curItem.remove();
            recalcMediaWindow();
            $('.order-media-window').addClass('is-edit');
        }
        e.preventDefault();
    });

    $('body').on('click', '.order-media-window-ctrl-add .btn', function(e) {
        $('.order-media-window-ctrl-add-popup').toggleClass('open');
        if ($('.order-media-window-ctrl-add-popup').hasClass('open')) {
            updateMediaList();
        }
        e.preventDefault();
    });

    $('body').on('click', '.order-media-window-ctrl-save .btn', function(e) {
        if (confirm('Confirm save?')) {
            return true;
        } else {
            return false;
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.order-media-window-ctrl-add').length == 0) {
            $('.order-media-window-ctrl-add-popup').removeClass('open');
        }
    });

    $('body').on('click', '.order-media-window-ctrl-add-popup-item', function() {
        var curItem = $(this);
        var curID = curItem.attr('data-id');
        if (curItem.hasClass('active')) {
            $('.order-media-window-item[data-id="' + curID + '"]').find('.order-media-window-item-remove').click();
        } else {
            curItem.addClass('active');
            var newHTML = $('.order-media-window-item-template').html();
            newHTML.replace(/_ID_/g, curID);
            $('.order-media-window-list').append('<div class="order-media-window-item" data-id="' + curID + '">' + newHTML + '</div>');
            var newItem = $('.order-media-window-item[data-id="' + curID + '"]');
            newItem.find('.order-media-window-item-logo img').attr('src', curItem.find('.order-media-window-ctrl-add-popup-item-logo img').attr('src'));
            newItem.find('.order-media-window-item-title').html(curItem.find('.order-media-window-ctrl-add-popup-item-title').html());
        }
    });

    $('body').on('keydown', '.order-media-window-ctrl-add-popup-search input', function(e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    $('body').on('keyup blur change', '.order-media-window-ctrl-add-popup-search input', function(e) {
        updateMediaList();
    });

    function updateMediaList() {
        $('.order-media-window-ctrl-add-popup-list-inner').addClass('loading');
        var curValue = $('.order-media-window-ctrl-add-popup-search input').val();
        $.ajax({
            type: 'POST',
            url: $('.order-media-window-ctrl-add-popup').attr('data-url'),
            dataType: 'html',
            data: 'search=' + curValue,
            cache: false
        }).done(function(html) {
            $('.order-media-window-ctrl-add-popup-list-inner').html(html);
            $('.order-media-window-ctrl-add-popup-item').each(function() {
                var curItem = $(this);
                var curID = curItem.attr('data-id');
                if ($('.order-media-window-item[data-id="' + curID + '"]').length == 1) {
                    curItem.addClass('active');
                }
            });
            $('.order-media-window-ctrl-add-popup-list-inner').removeClass('loading');
        });

    }

    $('body').on('click', '.support-tickets-ctrl-filters .btn', function(e) {
        $('html').toggleClass('support-filters-open');
        e.preventDefault();
    });

    $('body').on('click', '.support-tickets-filters-select-current', function(e) {
        var curSelect = $(this).parent();
        if (curSelect.hasClass('open')) {
            curSelect.removeClass('open');
        } else {
            $('.support-tickets-filters-select.open').removeClass('open');
            curSelect.addClass('open');
        }
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.support-tickets-filters-select').length == 0) {
            $('.support-tickets-filters-select.open').removeClass('open');
        }
    });

    $('body').on('change', '.support-tickets-filters-select-item label input', function() {
        var curSelect = $(this).parents().filter('.support-tickets-filters-select');
        var curOption = curSelect.find('.support-tickets-filters-select-item label input:checked');
        if (curOption.length > 0) {
            curSelect.addClass('full');
            var newText = '';
            curOption.each(function() {
                if (newText != '') {
                    newText += ', ';
                }
                newText += $(this).parent().find('span').text();
            });
            curSelect.find('.support-tickets-filters-select-current strong').html(newText);
        } else {
            curSelect.removeClass('full');
            curSelect.find('.support-tickets-filters-select-current strong').html('');
        }
    });

    $('.support-tickets-filters-select-search input').attr('autocomplete', 'off');

    $('body').on('keydown', '.support-tickets-filters-select-search input', function(e) {
        if (e.keyCode == 13) {
            return false;
        }
    });

    $('body').on('keyup blur change', '.support-tickets-filters-select-search input', function(e) {
        var curSelect = $(this).parents().filter('.support-tickets-filters-select');
        var curValue = $(this).val().toLowerCase();
        curSelect.find('.support-tickets-filters-select-item').each(function() {
            var curItem = $(this);

            var curIndex = curItem.text().toLowerCase().indexOf(curValue);
            if (curIndex == -1) {
                curItem.addClass('hidden');
            } else {
                curItem.removeClass('hidden');
            }
        });
    });

    $('.form-input-date input').each(function() {
        $(this).attr('autocomplete', 'off');
        var curCalendar = $(this);
        var dp = new AirDatepicker('#' + $(this).attr('id'), {
            range: true,
            onSelect(date, formattedDate) {
                curCalendar.parent().find('> input').val(date.formattedDate.join(' – '));
            }

        });
        curCalendar.data('dp', dp);
    });

    $('.packs-contacts').each(function() {
        $('html').addClass('packs-page');
    });

    $('body').on('mouseenter', '.catalogue-filter-item-hint', function() {
        $('.catalogue-filter-item-hint-window').remove();
        if ($(window).width() > 1119) {
            var curHint = $(this);
            $('body').append('<div class="catalogue-filter-item-hint-window" style="left:' + curHint.offset().left + 'px; top:' + curHint.offset().top + 'px"><div class="catalogue-filter-item-hint-window-inner">' + curHint.find('i').html() + '</div></div>');
        }
    });

    $('body').on('mouseleave', '.catalogue-filter-item-hint', function() {
        $('.catalogue-filter-item-hint-window').remove();
    });

    $('.order-detail-new-message textarea').keydown(function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
            $('.order-detail-new-message form').trigger('submit');
        }
    });

    $('.ai-form form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                $('.catalogue-container').addClass('loading');
                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    contentType: false,
                    processData: false,
                    dataType: 'html',
                    data: curForm.serialize(),
                    cache: false
                }).done(function(html) {
                    $('.catalogue-list').html(html);
                    $('.catalogue-container').removeClass('loading');
                });
            }
        });
    });

});

$(window).on('load resize', function() {
    if ($(window).width() < 1120) {
        $('.main-how-menu').mCustomScrollbar({
            axis: 'x',
            scrollButtons: {
                enable: true
            }
        });
    } else {
        $('.main-how-menu').mCustomScrollbar('destroy');
    }

    $('.catalogue-card-text').each(function() {
        var curBlock = $(this);
        curBlock.removeClass('open with-more');
        if (curBlock.find('.catalogue-card-text-wrap').height() > curBlock.find('.catalogue-card-text-inner').height()) {
            curBlock.addClass('with-more');
        }
    });
});


function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parents().filter('.form-input').addClass('full');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    $('.form-reset input').click(function() {
        window.setTimeout(function() {
            curForm.find('.form-input input, .form-input textarea').each(function() {
                $(this).parent().removeClass('focus');
                if ($(this).val() != '') {
                    $(this).parent().addClass('full');
                } else {
                    $(this).parent().removeClass('full');
                }
            });

            curForm.find('.form-input textarea').each(function() {
                $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
            });

            curForm.find('.form-file input').each(function() {
                var curInput = $(this);
                var curField = curInput.parents().filter('.form-file');
                var curName = curInput.val().replace(/.*(\/|\\)/, '');
                if (curName != '') {
                    curField.find('.form-file-name').html(curName);
                } else {
                    curField.find('.form-file-name').html('');
                }
            });

            curForm.find('.form-select select').each(function() {
                var curSelect = $(this);
                curSelect.trigger({type: 'select2:select'});
            });
        }, 100);
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }
        if (curSelect.prop('multiple')) {
            options['closeOnSelect'] = false;
        }

        if (curSelect.parents().filter('.window').length == 1) {
            options['dropdownParent'] = $('.window-content');
        }

        curSelect.select2(options);
        curSelect.on('select2:selecting', function (e) {
            if (curSelect.prop('multiple')) {
                var $searchfield = $(this).parent().find('.select2-search__field');
                $searchfield.val('').trigger('focus');
            }
        });
        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.find('.form-input .phoneNumber').each(function() {
        $(this).keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57) && charCode != 45 && charCode != 40 && charCode != 41) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-input .email').each(function() {
        $(this).keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode != 45 && charCode != 95 && charCode != 64) {
                return false;
            }
            return true;
        });
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('ajax-form')) {
                if (curForm.hasClass('recaptcha-form')) {
                    grecaptcha.ready(function() {
                        grecaptcha.execute('6LdHSvgcAAAAAHfkqTliNRLNbN8n4oSa0UJfMCU3', {action: 'submit'}).then(function(token) {
                            $.ajax({
                                type: 'POST',
                                url: curForm.attr('data-captchaurl'),
                                dataType: 'json',
                                data: 'recaptcha_response=' + token,
                                cache: false
                            }).fail(function(jqXHR, textStatus, errorThrown) {
                                alert('Сервис временно недоступен, попробуйте позже.' + textStatus);
                            }).done(function(data) {
                                if (data.status) {
                                    curForm.addClass('loading');
                                    var formData = new FormData(form);

                                    if (curForm.find('[type=file]').length != 0) {
                                        var file = curForm.find('[type=file]')[0].files[0];
                                        formData.append('file', file);
                                    }

                                    $.ajax({
                                        type: 'POST',
                                        url: curForm.attr('action'),
                                        processData: false,
                                        contentType: false,
                                        dataType: 'html',
                                        data: formData,
                                        cache: false
                                    }).done(function(html) {
                                        curForm.replaceWith(html);
                                    });
                                } else {
                                    alert('Не пройдена проверка Google reCAPTCHA v3.');
                                }
                            });
                        });
                    });
                } else {
                    curForm.addClass('loading');
                    var formData = new FormData(form);

                    if (curForm.find('[type=file]').length != 0) {
                        var file = curForm.find('[type=file]')[0].files[0];
                        formData.append('file', file);
                    }

                    $.ajax({
                        type: 'POST',
                        url: curForm.attr('action'),
                        processData: false,
                        contentType: false,
                        dataType: 'html',
                        data: formData,
                        cache: false
                    }).done(function(html) {
                        curForm.replaceWith(html);
                    });
                }
            } else if (curForm.hasClass('recaptcha-form')) {
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LdHSvgcAAAAAHfkqTliNRLNbN8n4oSa0UJfMCU3', {action: 'submit'}).then(function(token) {
                        $.ajax({
                            type: 'POST',
                            url: curForm.attr('data-captchaurl'),
                            dataType: 'json',
                            data: 'recaptcha_response=' + token,
                            cache: false
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            alert('Сервис временно недоступен, попробуйте позже.' + textStatus);
                        }).done(function(data) {
                            if (data.status) {
                                form.submit();
                            } else {
                                alert('Не пройдена проверка Google reCAPTCHA v3.');
                            }
                        });
                    });
                });
            } else if (curForm.hasClass('window-form')) {
                var formData = new FormData(form);

                if (curForm.find('[type=file]').length != 0) {
                    var file = curForm.find('[type=file]')[0].files[0];
                    formData.append('file', file);
                }

                windowOpen(curForm.attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

function filterParamsUpdate() {
    $('.catalogue-filter-group').each(function() {
        var curGroup = $(this);
        var paramsHTML = '';
        curGroup.find('.catalogue-filter-item input:checked').each(function() {
            var curInput = $(this);
            var curIndex = curGroup.find('.catalogue-filter-item').index(curInput.parents().filter('.catalogue-filter-item'));
            paramsHTML += '<div class="catalogue-filter-group-params-item" data-id="' + curIndex + '">' + curInput.parent().find('span').html() + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#catalogue-filter-group-params-item-remove"></use></svg></a></div>';
        });
        curGroup.find('.catalogue-filter-slider').each(function() {
            var curSlider = $(this);
            var curIndex = 0;
            var sliderText = '';
            if (curSlider.find('.form-slider-from').val() !== curSlider.find('.form-slider-min').html()) {
                sliderText += curSlider.find('.form-slider-hints-from').html();
            }
            if (curSlider.find('.form-slider-to').val() !== curSlider.find('.form-slider-max').html()) {
                sliderText += ' ' + curSlider.find('.form-slider-hints-to').html();
            }
            if (sliderText != '') {
                paramsHTML += '<div class="catalogue-filter-group-params-item" data-id="' + curIndex + '">' + sliderText + '<a href="#"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#catalogue-filter-group-params-item-remove"></use></svg></a></div>';
            }
        });
        curGroup.find('.catalogue-filter-group-params').html(paramsHTML);
        if (paramsHTML != '') {
            curGroup.find('.catalogue-filter-group-params').addClass('visible');
        } else {
            curGroup.find('.catalogue-filter-group-params').removeClass('visible');
        }
    });
}

function filterCatalogue() {
    $('.catalogue-container').addClass('loading');
    var curForm = $('.catalogue-filter-form');
    var curData = curForm.serialize();
    curData += '&page=' + $('.pager a.active').attr('data-value');
    curData += '&size=' + $('.catalogue-pager-size li.active').attr('data-value');
    curData += '&sort=' + $('.catalogue-sort-item.active').attr('data-value') + '&sortdir=' + $('.catalogue-sort-item.active').attr('data-dir');
    $.ajax({
        type: 'POST',
        url: curForm.attr('action'),
        dataType: 'html',
        data: curData,
        cache: false
    }).done(function(html) {
        $('.catalogue-container .catalogue-list').html($(html).find('.catalogue-list').html());
        $('.catalogue-container .pager').html($(html).find('.pager').html());
        $('.catalogue-header-status-from').html($(html).find('.catalogue-list').attr('data-statusfrom'));
        $('.catalogue-header-status-to').html($(html).find('.catalogue-list').attr('data-statusto'));
        $('.catalogue-header-status-count').html($(html).find('.catalogue-list').attr('data-statuscount'));
        $('.catalogue-container').removeClass('loading');
        $('html, body').animate({'scrollTop': $('.catalogue-container').offset().top});
    });
}

function filterPortfolio() {
    $('.portfolio-container').addClass('loading');
    var curURL = $('.portfolio-container').attr('data-ajax');
    var curData = '';
    curData += '&page=' + $('.pager a.active').attr('data-value');
    curData += '&size=' + $('.portfolio-pager-size li.active').attr('data-value');
    $.ajax({
        type: 'POST',
        url: curURL,
        dataType: 'html',
        data: curData,
        cache: false
    }).done(function(html) {
        $('.portfolio-container .portfolio').html($(html).find('.portfolio').html());
        $('.portfolio-container .pager').html($(html).find('.pager').html());
        $('.portfolio-container').removeClass('loading');
        $('html, body').animate({'scrollTop': $('.portfolio-container').offset().top - $('header').outerHeight()});
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});
        $('header').css({'padding-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('footer').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        $('.window .catalogue-card-tabs').each(function() {
            var curTabs = $(this);
            var curTabsMenu = curTabs.find('> .catalogue-card-tabs-menu');
            var curTabsContainer = curTabs.find('> .catalogue-card-tabs-container');
            var newHTML = '<ul>';
            curTabsContainer.find('> .catalogue-card-tab').each(function() {
                var curTabTitle = $(this).find('> .catalogue-card-tab-title span').html();
                newHTML += '<li><a href="#">' + curTabTitle + '</a></li> ';
            });
            curTabsContainer.find('> .catalogue-card-tab').eq(0).addClass('active');
            newHTML += '</ul>';
            curTabsMenu.html(newHTML);
            curTabsMenu.find('li').eq(0).addClass('active');
        });

        $('.window .catalogue-card-text').each(function() {
            var curBlock = $(this);
            curBlock.removeClass('open with-more');
            if (curBlock.find('.catalogue-card-text-wrap').height() > curBlock.find('.catalogue-card-text-inner').height()) {
                curBlock.addClass('with-more');
            }
        });

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        if ($('.order-media-window').length == 1) {
            $('.window').addClass('order-media-window-container');
            $('.window-close').html('<svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#order-media-window-close"></use></svg>');
            $('.order-media-window-ctrl-add-popup-search input').attr('autocomplete', 'off');
            recalcMediaWindow();
        }
    });
}

function windowClose() {
    if ($('.window').length > 0) {

        var isEditForm = false;
        $('.order-media-window').each(function() {
            if ($('.order-media-window').hasClass('is-edit') && !$('.order-media-window').hasClass('is-edit-confirm')) {
                isEditForm = true;
            }
        });
        if (!isEditForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
            $('.wrapper').css({'top': 0});
            $('footer').css({'top': 0});
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            if (confirm('Close the form?')) {
                $('.order-media-window').addClass('is-edit-confirm');
                windowClose();
            }
        }
    }
}

var timerLoadFonts = null;

$(window).on('load', function() {
    timerLoadFonts = window.setTimeout(checkFontsLoaded, 300);
});

function checkFontsLoaded() {
    if ($('html').hasClass('fonts-loaded')) {
        var $grid = $('.services-list').masonry({
            itemSelector: '.services-item'
        });
        $('.services-list img').one('load', function() {
             $grid.masonry('layout');
        });
    } else {
        timerLoadFonts = window.setTimeout(checkFontsLoaded, 300);
    }
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    if (windowScroll > 77) {
        $('html').addClass('header-fixed');
    } else {
        $('html').removeClass('header-fixed');
    }

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight / 2) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }
});

function updateCardPrice() {
    $('.catalogue-card-price').each(function() {
        var curSumm = 0;
        $('.catalogue-card-price-item.checked').each(function() {
            curSumm += Number($(this).attr('data-cost'));
        });
        $('.catalogue-card-price-summ-value span').html(curSumm);
    });
}

function updateOrder() {
    $('.order').each(function() {
        var curSumm = 0;
        $('.order-cart-item').each(function() {
            var curItem = $(this);
            curSumm += Number(curItem.find('.order-cart-item-header').attr('data-cost'));
            if (curItem.find('.order-cart-item-article input:checked').length == 1) {
                curSumm += Number(curItem.find('.order-cart-item-article').attr('data-cost'));
            }
        });
        $('.order-cart-summ-value span').html(curSumm);
    });
}

function recalcMediaWindow() {
    var curSumm = 0;
    $('.order-media-window-item').each(function() {
        var curItem = $(this);
        var itemCost = Number(curItem.find('.order-media-window-item-input-cost .form-input input').val());
        if (isNaN(itemCost)) {
            itemCost = 0;
        }
        var itemArticle = 0;
        if (curItem.find('.order-media-window-item-input-need label input:checked').length == 1) {
            itemArticle = Number(curItem.find('.order-media-window-item-input-need .form-input input').val())
            if (isNaN(itemArticle)) {
                itemArticle = 0;
            }
        }
        var itemSumm = itemCost + itemArticle;
        curItem.find('.order-media-window-item-cost span').html(itemSumm);
        curSumm += itemSumm;
    });
    $('.order-media-window-summ-value span').html(curSumm);
}