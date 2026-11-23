var swiper = new Swiper('.mySwiper', {
        cssMode: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          
        },
        pagination: {
          el: '.swiper-pagination',
        },
        mousewheel: true,
        keyboard: true,
});