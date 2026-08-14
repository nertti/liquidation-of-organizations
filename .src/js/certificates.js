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

    function openModal(src, alt) {
        modalImage.src = src;
        modalImage.alt = alt || '';
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lock');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lock');
        modalImage.removeAttribute('src');
    }

    closeBtn.addEventListener('click', closeModal);

    grid.addEventListener('click', (e) => {
        const img = e.target.closest('.certificates__item img');
        if (!img) return;
        openModal(img.src, img.alt);
    });
})();
