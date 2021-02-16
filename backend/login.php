<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(isLoggedIn()) {
  endScript(false, 'Du bist bereits eingeloggt.');
}

validateJson('email', 'password');

$getUserDataSql = "SELECT userId, email, name, surname, password FROM userdata WHERE email=?";
$userData = query($getUserDataSql, [$json['email']], '');

if(!$userData) {
  endScript(false, 'Diese Email-Adresse existiert nicht.');
}

if(password_verify($json['password'], $userData['password'])) {

  $identifier = $userData['userId'];

  $authToken = generateToken($identifier);

  $updateToken = "UPDATE userdata SET authtoken=? WHERE userId=?";

  query($updateToken, [$authToken, $userData['userId']], 'Couldnt update token.');

  require '../../ini/database/db_netgo_connect.php';

  $getFavorites = $connection -> prepare("SELECT movieId FROM favorites WHERE userId=?");
  $getFavorites -> execute([$userData['userId']]);

  $favorites = [];

  while($return = $getFavorites -> fetch()) {
    array_push($favorites, $return['movieId']);
  }

  $_SESSION['userId'] = $userData['userId'];
  $_SESSION['favorites'] = $favorites;

  endScript(true, $authToken);
}else {
  endScript(false, 'Password is wrong.');
}
?>