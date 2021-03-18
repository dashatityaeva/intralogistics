(function ($) {
    "use strict";
    //=======бургер=====
    $('.header__burger').on('click', function (e) {
        e.preventDefault;
        $(this).toggleClass('header__burger_active');
        $('.header').toggleClass('menu-active');
    })
    //=======слайдеры=====
    $('#slider1').slick({
        infinite: false,
        // autoplay: true,
        autoplaySpeed: 1500,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        draggable: false,
        waitForAnimate: false

    });


    //=======скролл наверх=====
    let btn = $('.scroll__btn');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('scroll__btn_show');
        } else {
            btn.removeClass('scroll__btn_show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });

    //========маска телефона=======
    $('input[type="tel"]').mask("+7 (999) 999-99-99");

    //============валидация============
    $('#formOrder').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: '',
                minlength: ''
            },
            phone: {
                required: '',
                minlength: ''
            }

        },
        errorClass: 'invalid'
    });

    //============стилизованный скролл================

})(jQuery);