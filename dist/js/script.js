(function ($) {
    "use strict";
    //=======бургер=====
    $('.header__burger').on('click', function (e) {
        e.preventDefault;
        $(this).toggleClass('header__burger_active');
        $('.header').toggleClass('menu-active');
        $('body').toggleClass('overflow-hidden');
        $('header').toggleClass('pos-stat');
    })



    //=======слайдеры=====
    if (!!($('#slider1').length)) {
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
    }

    if (!!($('#equipments-slider').length)) {
        $('#equipments-slider').slick({
            infinite: false,
            dots: true,
            // autoplay: true,
            autoplaySpeed: 1500,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            draggable: false,
            waitForAnimate: false
        });
    }
 
    if (!!($('#promo-slider').length)) {
        $('#promo-slider').slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 9000,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            draggable: false,
            waitForAnimate: false,
            // fade: true,
            // cssEase: 'ease-out'
            
        });
    }

    //============promo-animation==============
    $('#promo-slider').on('afterChange', function(event, slick, currentSlide){
        $('.slick-current').addClass('anim');
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

    // //============валидация============
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
    $('#formOrder2').validate({
        rules: {
            name2: {
                required: true,
                minlength: 2
            },
            phone2: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name2: {
                required: '',
                minlength: ''
            },
            phone2: {
                required: '',
                minlength: ''
            }

        },
        errorClass: 'invalid'
    });




})(jQuery);

let machineryInfoElem = document.querySelectorAll('.machinery__info');
let dotsItemElem = document.querySelectorAll('.dots__item');


const addFocus = (index) => {
    dotsItemElem.forEach(dot => {
        if (dot.dataset.dots === index) {
            dot.classList.add('current');
        }
    })
}
const removeFocus = (index) => {
    dotsItemElem.forEach(dot => {
        if (dot.dataset.dots === index) {
            dot.classList.remove('current');
        }
    })
}


machineryInfoElem.forEach(item => {
    let index = item.dataset.text;
    item.addEventListener('mouseover', function () {
        addFocus(index);
    });
    item.addEventListener('mouseout', function () {
        removeFocus(index);
    });
})