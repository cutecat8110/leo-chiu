$(".humburger").click(function () {
    $(this).parent().parent("body").toggleClass('nav-open')
})

$("#container").click(function () {
    if ($('body').hasClass('nav-open')) {
        $('body').removeClass('nav-open')
    }
})