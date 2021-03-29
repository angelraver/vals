<?php 
class Database {
  public $conn;

  public function getConnection(){
    $host = '127.0.0.1';
    if($_SERVER['SERVER_NAME'] === $host) {
      $user = "root";
      $pass = "";
      $dns = "mysql:host=127.0.0.1;dbname=vals";  
    } else {
      $user = "root";
      $pass = "Guachito2020!";
      $dns = "mysql:dbname=vals;unix_socket=/cloudsql/fuegoazuladmin:us-central1:fuegoazuladmin";
    }

    $this->conn = null;
    try{
      $this->conn = new PDO("mysql:host=localhost;dbname=id15655824_vals", "id15655824_fuegoazul", "5F0kC7u68B*T02E1");
      // $this->conn = new PDO($dns, $user, $pass);
      $this->conn->exec("set names utf8");
    }catch(PDOException $exception){
      echo "Database could not be connected: " . $exception->getMessage();
    }
    return $this->conn;
  }
}  
?>