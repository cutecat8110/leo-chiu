// 側邊欄開合

$("aside").click(function () {
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

$("#banner").click(function () {
    if ($("body").hasClass('nav-open')) {
        $("body").removeClass('nav-open')
    }
})


//當前導航位置

window.onscroll = function () {


    if (window.scrollY > $("#contact-point").offset().top - window.innerHeight / 5) {
        $("nav").removeClass()
        $("nav").addClass('contact-point')
    } else if (window.scrollY > $("#shopInfo-point").offset().top - window.innerHeight / 5) {
        $("nav").removeClass()
        $("nav").addClass('shopInfo-point')
    } else if (window.scrollY > $("#menu-point").offset().top - window.innerHeight / 5) {
        $("nav").removeClass()
        $("nav").addClass('menu-point')
    } else if (window.scrollY > $("#newsLetter-point").offset().top - window.innerHeight / 5) {
        $("nav").removeClass()
        $("nav").addClass('newsLetter-point')
    } else if (window.scrollY > $("#about-point").offset().top - window.innerHeight / 5) {
        $("nav").removeClass()
        $("nav").addClass('about-point')
    } else if (window.scrollY < $("#banner-point").offset().top + window.innerHeight / 5) {
        $("nav").removeClass()
        $("nav").addClass('banner-point')
    }
}

// Swiper
var bannerSwiper = new Swiper('.banner-swiper', {
    direction: 'vertical',
    autoHeight: true,
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 4000,
    },
});

var newsLetterSwiper = new Swiper('.newsLetter-swiper', {
    slidesPerView: 3,
    spaceBetween: 36,
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});



var galleryThumbs = new Swiper('.gallery-thumbs', {
    direction: 'vertical',
    spaceBetween: 16,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

var galleryTop = new Swiper('.gallery-top', {
    direction: 'vertical',
    spaceBetween: 16,

    loop: true,
    autoplay: {
        delay: 4000,
    },
    thumbs: {
        swiper: galleryThumbs
    }
});



var shopSwiper01 = new Swiper('.shopSwiper-01', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    loop: true,
    autoplay: {
        delay: 4000,
    },
});
// img>svg 直接css改顏色

jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest   
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG   
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG   
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org   
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.   
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG   
        $img.replaceWith($svg);

    }, 'xml');

});  