$(document).ready(function () {
    $('.nav__burger').click(function (event) {
        $('.nav__burger,.nav__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.nav_link[data-goto]').click(function (event) {
        $('.nav__burger,.nav__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});;
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
});;

const menuLinks = document.querySelectorAll('.nav_link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
};

const feedbackForm = document.getElementById('feedback-form');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = feedbackForm.querySelector('[name="name"]').value.trim();
        const phone = feedbackForm.querySelector('[name="phone"]').value.trim();
        const email = feedbackForm.querySelector('[name="email"]').value.trim();
        const orgType = feedbackForm.querySelector('[name="org_type"]').value;
        const message = feedbackForm.querySelector('[name="message"]').value.trim();
        const statusEl = feedbackForm.querySelector('.feedback__status');

        if (!name || !phone) {
            showStatus(statusEl, 'Заполните имя и телефон.', 'error');
            return;
        }

        const subject = encodeURIComponent('Заявка на ликвидацию с сайта');
        const body = encodeURIComponent(
            'Имя: ' + name + '\n' +
            'Телефон: ' + phone + '\n' +
            'Email: ' + (email || 'не указан') + '\n' +
            'Тип организации: ' + orgType + '\n' +
            'Сообщение: ' + (message || 'не указано')
        );

        window.location.href = 'mailto:neretindaniil01@gmail.com?subject=' + subject + '&body=' + body;

        showStatus(statusEl, 'Спасибо! Откроется почтовый клиент для отправки заявки.', 'success');
        feedbackForm.reset();
    });
}

function showStatus(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'feedback__status feedback__status_' + type;
}
;