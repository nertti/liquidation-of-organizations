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
