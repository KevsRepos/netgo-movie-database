<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

validateJson('movieId', 'toUpdate');

$queryString = "";
$executeArray = [];

$counter = count($json['toUpdate']);
$i = 0;

foreach ($json['toUpdate'] as $key => $value) {
  $i++;
  
  if($i === $counter) {
    $queryString .= $key . "=? ";
  }else {
    $queryString .= $key . "=?, ";
  }

  array_push($executeArray, $value);
}

array_push($executeArray, $json['movieId']);

$updateMovie = "UPDATE movies SET " . $queryString . "WHERE movieId=?";
  
if(query($updateMovie, $executeArray, "The movie you tried to update does not exist.")) {
  $checkCategory = "SELECT categoryId FROM categories WHERE category=?";

  if(!query($checkCategory, [$json['toUpdate']['category']], "Fehler")) {
    $insertCategory = "INSERT INTO categories (category) VALUES (?)";

    query($insertCategory, [$json['toUpdate']['category']], "Fehler beim hinzufügen der Kategorie.");
  }
}

endScript(true, "Der Film wurde erfolgreich aktualisiert.");