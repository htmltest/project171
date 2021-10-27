$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

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
        window.open($(this).attr('data-href'), '_blank');
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
        if (!curItem.hasClass('active')) {
            $('.catalogue-sort-item.active').removeClass('active');
            curItem.addClass('active');
            filterCatalogue();
        }
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

    $('body').on('click', '.window-close', function(e) {
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

    $('.nav ul li a').click(function(e) {
        if ($(window).width() < 1120) {
            if ($(this).parent().find('ul').length > 0) {
                $(this).parent().toggleClass('open');
                e.preventDefault();
            }
        }
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

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

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
                $(this).on('input', function() {
                    this.style.height = '99px';
                    this.style.height = (this.scrollHeight) + 'px';
                });
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

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (curForm.hasClass('ajax-form')) {
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
    curData += '&sort=' + $('.catalogue-sort-item.active').attr('data-value');
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
            $('.window-container').html(html + '<a href="#" class="window-close"></a>');
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

    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
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

var captchaKey = '6Ldk5DMUAAAAALWRTOM96EQI_0OApr59RQHoMirA';
var captchaArray = [];

var onloadCallback = function() {
    $('.g-recaptcha').each(function() {
        var newCaptcha = grecaptcha.render(this, {
            'sitekey' : captchaKey,
            'callback' : verifyCallback,
        });
        captchaArray.push([newCaptcha, $(this)]);
    });
};

var verifyCallback = function(response) {
    for (var i = 0; i < captchaArray.length; i++) {
        try {
            if (grecaptcha.getResponse(captchaArray[i][0])) {
                var curInput = captchaArray[i][1].next();
                curInput.val(response);
                curInput.removeClass('error');
                curInput.parent().find('label.error').remove();
            }
        } catch (err) {
        }
    }
};