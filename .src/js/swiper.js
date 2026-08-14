new Swiper('.image-slider',{
    //arrows
    navigation:{
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev'
    },
    pagination:{
        el: '.swiper-pagination',

        clickable: true,

        //dynamicBullets: true,

        //numbers
        // renderBullet: function (index, className) {
        //     return '<span class="' + className + '">' + (index + 1) + '</span>'
        // }

        //type: 'fraction',
    },

    //grabCursor: true,

    // hashNavigation:{
    //     watchState: true,
    // },

    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },

    // mousewheel: {
    //     sensitivity: 1,
    //     eventsTarget: '.image-slider',
    // },

    //slideToClickedSlide: true,

    //spaceBetween: 10,

    //центрирование слайда
    //centeredSlides: true,

    loop: true,

    //стартовый слайд
    initialSlide: 0,

    //freeMode: true,

    autoplay: {
        delay: 5000,
        //stopOnLastSlide: true,
        //disableOnInteraction: true,
    },

    speed: 1000,

    //direction: 'vertical',

    breakpoints: {
        320: {
            //кол-во слайдов
            slidesPerView: 1,
            //кол-во слайдов за свайп
            slidesPerGroup: 1,
        },
        1240: {
            //кол-во слайдов
            slidesPerView: 2,
            //кол-во слайдов за свайп
            slidesPerGroup: 2,
        },
    }
});