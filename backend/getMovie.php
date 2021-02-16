<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

validateJson('name');

$getMovie = "SELECT * FROM movies WHERE name=?";

$movie = query($getMovie, [$json['name']], "Fehler.");

if($movie) {
  endScript(true, $movie);
}else {
  endScript(false, "Dieser Film existiert nicht.");
}