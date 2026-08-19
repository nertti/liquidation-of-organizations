$(document).ready(function () {
    $('.nav__burger').on('click', function () {
        $('.nav__burger, .nav__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.nav__menu .nav_link[data-goto]').on('click', function () {
        $('.nav__burger, .nav__menu').removeClass('active');
        $('body').removeClass('lock');
    });
});