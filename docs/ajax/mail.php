<?php
// Защита: обрабатываем только POST-запросы
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Доступ запрещен"]);
    exit;
}

// Настройка заголовков ответа JSON
header('Content-Type: application/json; charset=utf-8');

// Получаем и очищаем данные из формы
$name     = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$phone    = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$email    = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$org_type = isset($_POST['org_type']) ? trim(strip_tags($_POST['org_type'])) : '';
$message  = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Валидация обязательных полей
if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Пожалуйста, заполните обязательные поля (Имя и Телефон)"]);
    exit;
}

// --- НАСТРОЙКИ ПОЧТЫ ---
//$to        = "dneretin01@gmail.com";
$to        = "80447406357y@gmail.com";
$subject   = "Новая заявка на ликвидацию ($org_type)";
$fromName  = "Лендинг Ликвидация";
$fromEmail = "info@likvidacia-rb.com";
// Формируем HTML-текст письма
$emailBody = "
    <h2>Новая заявка с сайта</h2>
    <p><b>Имя:</b> {$name}</p>
    <p><b>Телефон:</b> {$phone}</p>
    <p><b>Email:</b> " . ($email ?: 'Не указан') . "</p>
    <p><b>Тип организации:</b> {$org_type}</p>
    <p><b>Сообщение:</b><br>" . nl2br($message ?: 'Передано пустое сообщение') . "</p>
";

// Заголовки для корректной кодировки UTF-8 и HTML
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: =?utf-8?B?' . base64_encode($fromName) . '?= <' . $fromEmail . '>',
    'Reply-To: ' . ($email ?: $fromEmail),
    'X-Mailer: PHP/' . phpversion()
];

// Кодируем тему в Base64 для избежания "кракозябр"
$encoded_subject = '=?utf-8?B?' . base64_encode($subject) . '?=';

// Отправка
if (mail($to, $encoded_subject, $emailBody, implode("\r\n", $headers), "-f" . $fromEmail)) {
    echo json_encode(["status" => "success", "message" => "Заявка успешно отправлена!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Ошибка сервера при отправке почты."]);
}
