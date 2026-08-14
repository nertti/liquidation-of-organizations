$(document).ready(function () {
    $(window).resize(function () {
        if ($(window).width() < 500) {
            $('.services__content').addClass('spoiler');
            $('.services__name').removeClass('active');
            $('.services__description').slideUp();
        }
        if ($(window).width() > 500) {
            $('.services__content').removeClass('spoiler');
            $('.services__name').removeClass('active');
            $('.services__description').slideDown();
        }
    });
    if ($(window).width() < 500) {
        $(window).scroll(function(){
            $('.services__name').removeClass('active');
            $('.services__description').slideUp();
        });
        $('.services__content').addClass('spoiler');
    }
    if ($(window).width() > 500) {
        $('.services__description').slideDown();
        $('.services__content').removeClass('spoiler');
        $('.services__name').removeClass('active');
    }
    $('.services__name').click(function () {
        if($('.services__content').hasClass('spoiler')){
            if($('.services__content').hasClass('one')){
                $('.services__name').not($(this)).removeClass('active');
                $('.services__description').not($(this).next()).slideUp();
            }
            $(this).toggleClass('active').next().slideToggle();
        }
    });
});