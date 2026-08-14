$(document).ready(function () {
    $('.nav__burger').click(function (event) {
        $('.nav__burger,.nav__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.nav_link[data-goto]').click(function (event) {
        $('.nav__burger,.nav__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});