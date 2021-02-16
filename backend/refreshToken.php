<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

$json = file_get_contents("php://input");
$json = json_decode($json, true);

if(empty($json['authToken'])) {
  session_destroy();
  endScript(false, "Bitte logge dich erneut ein.");
}

$checkUser = "SELECT userId FROM userdata WHERE authToken=?";

$userData = query($checkUser, [$json['authToken']], "Ein Fehler");

if(!$userData) {
  endScript(false, "Bitte logge dich erneut ein.");
}

$identifier = $userData['userId'];

$authToken = generateToken($identifier);

$updateToken = "UPDATE userdata SET authToken=? WHERE userId=?";

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
?>