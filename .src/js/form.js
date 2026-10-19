$(document).ready(function () {
    $('#feedback-form').on('submit', function (e) {
        e.preventDefault();

        var $form = $(this);
        var $submitBtn = $form.find('.feedback__submit');
        var $statusText = $form.find('.feedback__status');
        var name = $.trim($form.find('[name="name"]').val());
        var phone = $.trim($form.find('[name="phone"]').val());

        if (name === '' || phone === '') {
            $statusText.css('color', 'red').text('Пожалуйста, заполните поля Имя и Телефон.');
            return false;
        }

        $submitBtn.prop('disabled', true).text('Отправка...');
        $statusText.text('');

        $.ajax({
            url: '/ajax/mail.php',
            type: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    $statusText.css('color', 'green').text('Спасибо за заявку, с вами свяжутся!');
                    $form[0].reset();
                } else {
                    $statusText.css('color', 'red').text(response.message || 'Ошибка отправки.');
                }
            },
            error: function (xhr) {
                $statusText.css('color', 'red');

                try {
                    var errJson = JSON.parse(xhr.responseText);
                    $statusText.text(errJson.message || 'Произошла ошибка при отправке.');
                } catch (e) {
                    $statusText.text('Произошла ошибка сервера или неверный путь к mail.php.');
                }
            },
            complete: function () {
                $submitBtn.prop('disabled', false).text('Отправить заявку');
            }
        });
    });
});
