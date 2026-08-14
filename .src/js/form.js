
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
