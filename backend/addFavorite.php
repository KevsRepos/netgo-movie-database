<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

validateJson('movieId');

if(isset($_SESSION['favorites'][$json['movieId']])) {
  endScript(false, 'Dieser Film ist bereits in deiner Favoritenliste.');
}

$selectMovie = "SELECT movieId FROM movies WHERE movieId=?";

if(!query($selectMovie, [$json['movieId']], "Ein Fehler ist aufgetreten.")) {
  endScript(false, "Der Film, den du favorisieren wolltest, existiert nicht mehr.");
}

$updateFavorites = "INSERT INTO favorites (userId, movieId) VALUES (?, ?)";

query($updateFavorites, [$_SESSION['userId'], $json['movieId']], "Leider ist ein Fehler beim hinzufügen des Favoriten aufgetreten.");

array_push($_SESSION['favorites'], $json['movieId']);

endScript(true, "Film zu den Favoriten hinzugefügt!");
?>