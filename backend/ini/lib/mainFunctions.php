<?php
$json = file_get_contents("php://input");
$json = json_decode($json, true);

$dbString = '../../ini/database/db_netgo_connect.php';

function endScript($success, $returnMsg) {
  echo json_encode(['success' => $success, 'httpstatus' => http_response_code(), 'return' => $returnMsg]);
  $connection = null;
  exit;
}

function isLoggedIn() {
  if(!empty($_SESSION['userId'])) {
    return true;
  }else {
    return false;
  }
}

function validateJson() {
  global $json;
  $keys = func_get_args();

  for ($i=0; $i < count($keys); $i++) { 
    if(empty($json[$keys[$i]])) {
      endScript(false, "Fehler beim übermitteln der Daten.");
    }
  }

  return true;
}

function query($sql, $insertingArray, $errMsg) {
  global $dbString, $connection;

  require_once $_SERVER['DOCUMENT_ROOT'] . $dbString;

  $query = $connection -> prepare($sql);
  if($query -> execute($insertingArray)) {

    switch (substr($sql, 0, 6)) {
      case 'INSERT':
        return $connection -> lastInsertId();
      break;

      case 'SELECT':
        if($data = $query -> fetch()) {
          return $data;
        }else {
          return false;
        }
      break;

      case 'UPDATE':
      case 'DELETE':
        return true;
      break;
    }
  }else {
    endScript(false, $errMsg);
  }
}

function generateToken($uniqe) {
  $newToken = bin2hex(random_bytes(7)) . bin2hex(random_bytes(7)) . time() . $uniqe;
  return $newToken;
}
?>