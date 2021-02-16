<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

require '../../ini/database/db_netgo_connect.php';

$getCategories = $connection -> prepare("SELECT * FROM categories");
$getCategories -> execute();

$categories = [];

while($return = $getCategories -> fetch()) {
  array_push($categories, $return);
}
  
if(count($categories) < 1) {
  endScript(false, "Es ist ein Fehler aufgetreten. Bitte lade die Seite neu.");
}else {
  endScript(true, $categories);
}