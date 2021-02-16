<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

validateJson('category');

require '../../ini/database/db_netgo_connect.php';

$getCategories = $connection -> prepare("SELECT name, releaseDate, movieId FROM movies WHERE category=?");
$getCategories -> execute([$json['category']]);

$movies = [];

while($return = $getCategories -> fetch()) {
  array_push($movies, $return);
}

if(count($movies) < 1) {
  endScript(false, "Leider gibt es noch keine Filme in dieser Kategorie.");
}else {
  endScript(true, $movies);
}