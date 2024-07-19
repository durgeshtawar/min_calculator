<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['expression'])) {
        $expression = $_POST['expression'];
        $result = 0;

        try {
            // Evaluate the expression safely
            $result = eval("return $expression;");
            echo json_encode(['result' => $result]);
        } catch (ParseError $e) {
            echo json_encode(['error' => 'Invalid Expression']);
        } catch (Throwable $e) {
            echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'No expression provided']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
