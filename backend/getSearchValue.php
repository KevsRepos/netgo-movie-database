<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

validateJson('value');

$value = $json['value'];

require '../../ini/database/db_netgo_connect.php';

$getMovie = $connection -> prepare("SELECT name, releaseDate, movieId FROM movies WHERE name LIKE ?");
$getMovie -> execute(["%$value%"]);

$matchingMovies = [];

while($fetch = $getMovie -> fetch()) {
  array_push($matchingMovies, $fetch);
}

if(count($matchingMovies) >= 1) {
  endScript(true, $matchingMovies);
}else {
  endScript(false, 'Keine Filme unter dem Suchbegriff "' . $json['value'] . '" gefunden.');
}