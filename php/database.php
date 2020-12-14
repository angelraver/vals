<?php 
class Database {
  public $conn;

  public function getConnection(){
    // $user = "root";
    // $pass = "";
    // $dns = "mysql:host=127.0.0.1;dbname=vals";

    // $host = getenv("CLOUD_DSN");
  
    $user = "root";
    $pass = "Guachito2020!";
    $dns = "mysql:dbname=vals;unix_socket=/cloudsql/fuegoazuladmin:us-central1:fuegoazuladmin";

    $this->conn = null;
    try{
      $this->conn = new PDO($dns, $user, $pass);
      $this->conn->exec("set names utf8");
    }catch(PDOException $exception){
      echo "Database could not be connected: " . $exception->getMessage();
    }
    return $this->conn;
  }
}  
?>