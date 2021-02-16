<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

validateJson('movieId');

$deleteMovie = "DELETE FROM movies WHERE movieId = ? LIMIT 1";

query($deleteMovie, [$json['movieId']], "Film konnte nicht gelöscht werden.");

$deleteFavorites = "DELETE FROM favorites WHERE movieId = ?";

query($deleteFavorites, [$json['movieId']], "Fehler");

endScript(true, true);