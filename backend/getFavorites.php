<?php
session_start();
require_once '../../ini/lib/mainFunctions.php';

if(!isLoggedIn()) {
  endScript(false, 'Hierfür musst du eingeloggt sein.');
}

if(!isset($json['userId'])) {
  if(!empty($_SESSION['favorites'])) {
    $movies = [];

    require_once '../../ini/database/db_netgo_connect.php';

    $getMovies = $connection -> prepare("SELECT movieId, name FROM movies WHERE movieId=?");

    $movies = [];

    foreach ($_SESSION['favorites'] as $key => $value) {
      $getMovies -> execute($_SESSION['favorites']);
      $return = $getMovies -> fetch();

      if(empty($return)) {
        $key = array_search($value, $_SESSION['favorites']);
        
        unset($_SESSION['favorites'][$key]);
      }
      
      array_push($movies, $return);
    }

    if(empty($movies)) {
      $_SESSION['favorites'] = [];
      endScript(false, "Eventuell ist etwas schief gelaufen oder du hast keine Favoriten mehr.");
    }

    endScript(true, $movies);
  }else {
    endScript(false, "Du hast noch keine Favoriten.");
  }
}else {

  validateJSON('userId');

  require_once '../../ini/database/db_netgo_connect.php';

  $getFavorites = $connection -> prepare("SELECT * FROM favorites WHERE userId=?");
  $getFavorites -> execute([$json['userId']]);

  $favorites = [];

  while($return = $getFavorites -> fetch()) {
    array_push($favorites, $return);
  }

  if(count($favorites) < 1) {
    endScript(false, "Du hast noch keine Favoriten.");
  }

  $movies = [];

  $getMovies = $connection -> prepare("SELECT movieId, name FROM movies WHERE movieId=?");
  $getMovies -> execute([$favorites['movieid']]);

  while($return = $getMovies -> fetch()) {
    array_push($movies, $return);
  }

  endScript(true, $movies);
}
?>