<?php
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        header("Location: index.html");
        exit;
    }
    if (isset($_POST['name'], $_POST['phone'], $_POST['tender_link'], $_POST['edrpou'])) {
        $token = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        $chat_id = "-XXXXXXXXXX";
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $tender_link = $_POST['tender_link'];
        $edrpou = $_POST['edrpou'];

        if ($tender_link === ''){
            $tender_link = 'Відсутній';
        }
        if ($edrpou === ''){
            $edrpou = 'Відсутній';
        }

        $message = "Нова заявка:\nІмʼя: $name\nНомер телефону: $phone\nПосилання на тендер: $tender_link\nКод ЄДРПОУ: $edrpou";

        $url = "https://api.telegram.org/bot$token/sendMessage";
        $data = [
            'chat_id' => $chat_id,
            'text' => $message,
        ];

        $options = [
            'http' => [
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data),
            ],
        ];

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        header('Content-Type: application/json');
        echo json_encode(['status' => 'success']);
    }   else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        header("Location: index.html");
    }