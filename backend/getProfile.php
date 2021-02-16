<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

if(empty($json['userId'])) {
  $userId  = $_SESSION['userId'];
}else {
  $userId = $json['userId'];
}

$getUser = "SELECT name, surname, email, created FROM userdata WHERE userid=?";

$user = query($getUser, [$userId], "Fehler.");

if($user) {
  endScript(true, $user);
}else {
  endScript(false, 'Dieser Nutzer existiert nicht.');
}