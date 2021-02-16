<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(isLoggedIn()) {
  endScript(false, 'In diesem Zustand kannst du das nicht tun.');
}

validateJson('email', 'name', 'surname', 'password');

$userDataSql = "INSERT INTO userdata (
email,
name,
surname,
authtoken, 
password
) VALUES (?, ?, ?, ?, ?)";

$hash = password_hash($json['password'], PASSWORD_DEFAULT);

$identifier = query($userDataSql, [$json['email'], $json['name'], $json['surname'], "0", $hash], "Couldnt create user.");

$authToken = generateToken($identifier);

$userId = $connection -> lastInsertId();

$_SESSION['userId'] = $userId;
$_SESSION['favorites'] = [];

endScript(true, $authToken);
?>