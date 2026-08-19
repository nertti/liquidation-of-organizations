$(document).ready(function () {
    $('.nav__burger').on('click', function () {
        $('.nav__burger, .nav__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.nav__menu .nav_link[data-goto]').on('click', function () {
        $('.nav__burger, .nav__menu').removeClass('active');
        $('body').removeClass('lock');
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
const CERTIFICATES_SLIDER_THRESHOLD = 4;

(function initCertificatesSlider() {
    const grid = document.querySelector('.certificates__grid');
    if (!grid || typeof Swiper === 'undefined') return;

    const items = grid.querySelectorAll('.certificates__item');
    if (items.length <= CERTIFICATES_SLIDER_THRESHOLD) return;

    grid.classList.add('certificates__slider', 'swiper');

    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';

    items.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(item);
        wrapper.appendChild(slide);
    });

    grid.textContent = '';
    grid.appendChild(wrapper);

    const prev = document.createElement('div');
    prev.className = 'swiper-button-prev';
    const next = document.createElement('div');
    next.className = 'swiper-button-next';
    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';

    grid.appendChild(prev);
    grid.appendChild(next);
    grid.appendChild(pagination);

    new Swiper(grid, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: items.length > CERTIFICATES_SLIDER_THRESHOLD,
        navigation: {
            nextEl: next,
            prevEl: prev,
        },
        pagination: {
            el: pagination,
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
})();

(function initCertificatesModal() {
    const modal = document.getElementById('certificates-modal');
    const grid = document.querySelector('.certificates__grid');
    if (!modal || !grid) return;

    const modalImage = modal.querySelector('.certificates-modal__image');
    const closeBtn = modal.querySelector('.certificates-modal__close');
    const overlay = modal.querySelector('.certificates-modal__overlay');
    const fixedElements = document.querySelectorAll('.nav');

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function lockScroll() {
        const scrollbarWidth = getScrollbarWidth();
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        fixedElements.forEach((el) => {
            el.style.paddingRight = `${scrollbarWidth}px`;
        });
        document.body.classList.add('lock');
    }

    function unlockScroll() {
        document.body.classList.remove('lock');
        document.body.style.paddingRight = '';
        fixedElements.forEach((el) => {
            el.style.paddingRight = '';
        });
    }

    function openModal(src, alt) {
        modalImage.src = src;
        modalImage.alt = alt || '';
        lockScroll();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        unlockScroll();
        modalImage.removeAttribute('src');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    grid.addEventListener('click', (e) => {
        const item = e.target.closest('.certificates__item');
        if (!item) return;
        const img = item.querySelector('img');
        if (!img) return;
        openModal(img.src, img.alt);
    });
})();
;