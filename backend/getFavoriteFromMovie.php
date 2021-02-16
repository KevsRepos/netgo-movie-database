<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

if(count($_SESSION['favorites']) < 1) {
  endScript(false, false);
}

validateJson('movieId');

if(array_search($json['movieId'], $_SESSION['favorites']) !== false) {
  endScript(true, true);
}else {
  endScript(false, false);
}
?>