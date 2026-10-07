// Keep the JavaScript breakpoint identical to the SCSS pad breakpoint.
var mobileLayout = window.matchMedia('(max-width: 768px)');
var $mobileNav = $('header nav').attr('id', 'mobile-navigation');
var $desktopNav = $('aside nav').attr('id', 'desktop-navigation');

$('.headerHumburger, .headerCloser, .humburger, .navCloser, .faqCate')
    .attr({ role: 'button', tabindex: '0' });
$('.headerHumburger').attr({ 'aria-label': '開啟導覽', 'aria-controls': 'mobile-navigation' });
$('.humburger').attr({ 'aria-label': '開啟導覽', 'aria-controls': 'desktop-navigation' });
$('.headerCloser, .navCloser').attr('aria-label', '關閉導覽');

function setDesktopNav(open) {
    $('body').toggleClass('nav-open', open);
    $('.humburger').attr({ 'aria-expanded': String(open), tabindex: open ? '-1' : '0' });
    $('.navCloser').attr('tabindex', open ? '0' : '-1');
    $desktopNav.prop('inert', !open);
}

function setMobileNav(open, animate) {
    $('header').toggleClass('active', open);
    $('.headerHumburger').attr({
        'aria-expanded': String(open),
        'aria-label': open ? '關閉導覽' : '開啟導覽'
    });
    // Finish the current transition and discard queued animations before toggling.
    $mobileNav.stop(true, true).prop('inert', !open);
    if (animate === false) {
        $mobileNav.toggle(open);
    } else if (open) {
        $mobileNav.slideDown(450);
    } else {
        $mobileNav.slideUp(300);
    }
}

$('aside').on('click', function () {
    if (!mobileLayout.matches) setDesktopNav(true);
});
$('.navCloser').on('click', function (event) {
    event.stopPropagation();
    setDesktopNav(false);
    $('.humburger').trigger('focus');
});
$('#container').on('click', function () { setDesktopNav(false); });
$('.headerHumburger').on('click', function () {
    setMobileNav(!$('header').hasClass('active'));
});
$('.headerCloser').on('click', function () {
    setMobileNav(false);
    $('.headerHumburger').trigger('focus');
});

$('header nav a[href^="#"]').on('click', function () {
    setMobileNav(false);
    // Move focus out of the now-inert navigation without changing native scrolling.
    var target = document.getElementById(this.hash.slice(1));
    if (target) {
        var section = target.parentElement;
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
    }
});

function resetNavigation() {
    setDesktopNav(false);
    setMobileNav(false, false);
}
mobileLayout.addEventListener('change', resetNavigation);
resetNavigation();

$(document).on('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if ($('header').hasClass('active')) {
        setMobileNav(false);
        $('.headerHumburger').trigger('focus');
    } else if ($('body').hasClass('nav-open')) {
        setDesktopNav(false);
        $('.humburger').trigger('focus');
    }
});

// Tabs and FAQ retain their original appearance and independent open/closed state.
var $options = $('.option');
var $panels = $('.contact-content');
$('.option-wrapper').attr({ role: 'tablist', 'aria-label': '聯絡資訊' });
$options.each(function (index) {
    $(this).attr({ role: 'tab', id: 'contact-tab-' + index,
        'aria-controls': 'contact-panel-' + index });
    $panels.eq(index).attr({ role: 'tabpanel', id: 'contact-panel-' + index,
        'aria-labelledby': 'contact-tab-' + index });
});

function selectContactTab(index) {
    $options.removeClass('active').attr({ 'aria-selected': 'false', tabindex: '-1' });
    $options.eq(index).addClass('active').attr({ 'aria-selected': 'true', tabindex: '0' });
    $panels.removeClass('active').eq(index).addClass('active');
}
$options.on('click', function () { selectContactTab($options.index(this)); });
$options.on('keydown', function (event) {
    var index = $options.index(this);
    if (event.key === 'ArrowRight') index = (index + 1) % $options.length;
    else if (event.key === 'ArrowLeft') index = (index + $options.length - 1) % $options.length;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = $options.length - 1;
    else return;
    event.preventDefault();
    selectContactTab(index);
    $options.eq(index).trigger('focus');
});
selectContactTab(0);

$('.faqCate').each(function (index) {
    $(this).attr({ id: 'faq-trigger-' + index, 'aria-expanded': 'false',
        'aria-controls': 'faq-panel-' + index });
    $(this).next().attr({ id: 'faq-panel-' + index, role: 'region',
        'aria-labelledby': 'faq-trigger-' + index });
}).on('click', function () {
    var open = !$(this).hasClass('active');
    $(this).toggleClass('active', open).attr('aria-expanded', String(open));
    $(this).children('i').toggleClass('fa-caret-up', open).toggleClass('fa-caret-down', !open);
    var $content = $(this).next().stop(true, true);
    if (open) $content.slideDown(450);
    else $content.slideUp(300);
});

$('.headerHumburger, .headerCloser, .humburger, .navCloser, .faqCate, .option')
    .on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });

// Update only the navigation state classes, once per frame, including initial hashes.
var sections = ['banner', 'about', 'newsLetter', 'menu', 'shopInfo', 'contact'];
var navClasses = sections.map(function (id) { return id + '-point'; }).join(' ');
var scrollFrame = null;
function updateNavigation() {
    scrollFrame = null;
    var current = sections[0];
    sections.forEach(function (id) {
        if (document.getElementById(id + '-point').getBoundingClientRect().top <= window.innerHeight / 5) {
            current = id;
        }
    });
    $('header nav, aside nav').removeClass(navClasses).addClass(current + '-point');
    $('nav a[href^="#"]').removeAttr('aria-current')
        .filter('[href="#' + current + '-point"]').attr('aria-current', 'location');
}
function scheduleNavigationUpdate() {
    if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateNavigation);
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);
updateNavigation();

// Swiper
var bannerSwiper = new Swiper('.banner-swiper', {
    loop: true,
    effect: 'fade',

    autoplay: {
        delay: 4500,
    },
});



var newsLetterSwiper = new Swiper('.newsLetter-swiper', {
    slidesPerView: 3,
    spaceBetween: 36,
    loop: true,

    navigation: {
        nextEl: '#newsLetter .swiper-button-next',
        prevEl: '#newsLetter .swiper-button-prev',
        addIcons: false,
    },
});




var submenuSwiper = new Swiper('.subMenu-swiper', {
    direction: 'vertical',
    spaceBetween: 16,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var menuSwiper = new Swiper('.menu-swiper', {
    direction: 'vertical',
    loop: true,
    autoplay: {
        delay: 4500,
    },
    thumbs: {
        swiper: submenuSwiper
    }
});

$('.subMenu-swiper .swiper-slide').attr({ role: 'button', tabindex: '0' })
    .each(function () { $(this).attr('aria-label', $(this).find('p').text()); })
    .on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            menuSwiper.slideToLoop($(this).index());
        }
    });




var shopSwiper01 = new Swiper('.shopSwiper-01', {
    loop: true,
    effect: 'fade',

    autoplay: {
        delay: 4500,
    },
});


var shopSwiper02 = new Swiper('.shopSwiper-02', {
    loop: true,
    effect: 'fade',

    autoplay: {
        delay: 4500,
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
