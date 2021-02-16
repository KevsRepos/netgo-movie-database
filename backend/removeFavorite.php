<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

validateJson('movieId');

if(array_search($json['movieId'], $_SESSION['favorites'])) {
  endScript(false, 'Dieser Film ist nicht mehr in deiner Favoritenliste.');
}

$deleteFavorites = "DELETE FROM favorites WHERE movieId=? AND userId=? LIMIT 1";

if(query($deleteFavorites, [$json['movieId'], $_SESSION['userId']], "Leider ist ein Fehler beim löschen des Favoriten aufgetreten.")) {
  $key = array_search($json['movieId'], $_SESSION['favorites']);
  
  unset($_SESSION['favorites'][$key]);

  endScript(true, "Film von den Favoriten entfernt");
}else {
  endScript(false, "Es ist ein Fehler beim entfernen des Favorits aufgetreten.");
}
