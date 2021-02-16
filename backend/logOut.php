<?php
session_start();
session_destroy();

echo json_encode(['success' => true, 'httpstatus' => http_response_code(), 'return' => 'Logged out.']);
?>