$("header").click(function () {
    if (!$("body").hasClass('nav-open')) {
        $("body").addClass('nav-open')
    }
})

$(".navCloser").click(function (event) {
    if ($("body").hasClass('nav-open')) {
        $("body").removeClass('nav-open')
        event.stopPropagation()
    }
})

$("#container").click(function () {
    if ($("body").hasClass('nav-open')) {
        $("body").removeClass('nav-open')
    }
})

// Swiper


var swiper = new Swiper('.swiper-container1', {   // newsLetter
    slidesPerView: 3,
    spaceBetween: 36,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


var galleryThumbs = new Swiper('.gallery-thumbs', {  //menu
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});