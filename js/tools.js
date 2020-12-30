$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    var userDate = new Date(curDate.substr(6, 4), Number(curDate.substr(3, 2)) - 1, Number(curDate.substr(0, 2)));
                    if ($(element).attr('min')) {
                        var minDateStr = $(element).attr('min');
                        var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                        if (userDate < minDate) {
                            $.validator.messages['inputDate'] = 'Минимальная дата - ' + minDateStr;
                            return false;
                        }
                    }
                    if ($(element).attr('max')) {
                        var maxDateStr = $(element).attr('max');
                        var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                        if (userDate > maxDate) {
                            $.validator.messages['inputDate'] = 'Максимальная дата - ' + maxDateStr;
                            return false;
                        }
                    }
                    return true;
                } else {
                    $.validator.messages['inputDate'] = 'Дата введена некорректно';
                    return false;
                }
            }
        },
        ''
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
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
        filterCatalogue();
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
            $('.catalogue-type-item.active').removeClass('active');
            curItem.addClass('active');
        }
        e.preventDefault();
    });

    $('.catalogue-ctrl-mobile-filter').click(function(e) {
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

    $('.catalogue-filter-apply').click(function(e) {
        if ($('html').hasClass('catalogue-filter-open')) {
            $('html').removeClass('catalogue-filter-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        }
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-filter-group-header', function(e) {
        $(this).parent().toggleClass('open');
        $(this).parent().addClass('open-mobile');
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

    $('.catalogue-filter-group-reset').click(function(e) {
        var curGroup = $(this).parents().filter('.catalogue-filter-group');
        curGroup.find('.catalogue-filter-item input').prop('checked', false);
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
            filterCatalogue();
        });
    });

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
});


function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date input').addClass('inputDate');

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var isCorrectDate = true;
            var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
            if ($(this).attr('min')) {
                var minDateStr = $(this).attr('min');
                var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                if (userDate < minDate) {
                    isCorrectDate = false;
                }
            }
            if ($(this).attr('max')) {
                var maxDateStr = $(this).attr('max');
                var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                if (userDate > maxDate) {
                    isCorrectDate = false;
                }
            }
            if (isCorrectDate) {
                var myDatepicker = $(this).data('datepicker');
                if (myDatepicker) {
                    var curValueArray = curValue.split('.');
                    myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                    myDatepicker.show();
                    $(this).focus();
                }
            } else {
                $(this).addClass('error');
                return false;
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            curDate.setDate(curDate.getDate() - 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            toggleSelected: false
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = '99px';
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

function filterCatalogue() {
    $('.catalogue-container').addClass('loading');
    var curForm = $('.catalogue-filter form');
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
        $('.catalogue-container .catalogue-list').html($(html).find('.catalogue-list').html())
        $('.catalogue-container .pager').html($(html).find('.pager').html())
        $('.catalogue-header-status-from').html($(html).find('.catalogue-list').attr('data-statusfrom'));
        $('.catalogue-header-status-to').html($(html).find('.catalogue-list').attr('data-statusto'));
        $('.catalogue-header-status-count').html($(html).find('.catalogue-list').attr('data-statuscount'));
        $('.catalogue-container').removeClass('loading');
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

        $('.archive-card-descr-container').each(function() {
            var curBlock = $(this);
            curBlock.removeClass('open');
            if (curBlock.height() < curBlock.find('.archive-card-descr-content').height()) {
                curBlock.addClass('with-more');
            } else {
                curBlock.removeClass('with-more');
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