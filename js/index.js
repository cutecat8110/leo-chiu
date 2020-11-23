$("header").click(function () {
    if (!$("body").hasClass('nav-open')) {
        $("body").addClass('nav-open')
    }
})

$(".navCloser").click(function () {
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