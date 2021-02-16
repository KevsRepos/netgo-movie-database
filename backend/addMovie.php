<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

validateJson('name', 'releaseDate', 'movieLength', 'category', 'description');

$getMovie = "SELECT movieId FROM movies WHERE name=? LIMIT 1";

if(query($getMovie, [$json['name']], "Fehler")) {
  endScript(false, "Dieser Film exisitert bereits.");
}

$insertMovie = "INSERT INTO movies (
  name,
  releaseDate,
  movieLength,
  category,
  description
  ) VALUES (?, ?, ?, ?, ?)";

$addQuery = query($insertMovie, [$json['name'], $json['releaseDate'], $json['movieLength'], $json['category'], $json['description']], "Leider ist ein Fehler beim hinzufügen des Films aufgetreten.");
  
if($addQuery) {
  $checkCategory = "SELECT categoryId FROM categories WHERE category=?";

  if(!query($checkCategory, [$json['category']], "Fehler")) {
    $insertCategory = "INSERT INTO categories (category) VALUES (?)";

    query($insertCategory, [$json['category']], "Fehler beim hinzufügen der Kategorie.");
  }
}
endScript(true, "Film wurde hinzugefügt.");
?>