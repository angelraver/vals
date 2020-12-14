<?php
class ClienteController {
  private $db;

  public $id;
  private $firstName;
  private $lastName;
  private $gender;
  private $email;
  private $phone;
  public $descripcion;

	public function __construct($params) {
    $this->id = orNull($params->id);
    $this->firstName = orNull($params->firstName);
    $this->lastName = orNull($params->lastName);
    $this->gender = orNull($params->gender);
    $this->email = orNull($params->email);
    $this->phone = orNull($params->phone);
    $this->descripcion = orNull($params->descripcion);
    $database = new Database();
    $this->db = $database->getConnection();
	}

  public function get($id){
    $sql = $this->db->prepare("CALL clienteGet(:id);");
    $sql->bindParam("id", orNull($id));
    $sql->execute();
    while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
      $datos []= $row;
    }

    return $datos;
  }

  function create(){
    if(empty($this->firstName)) return "ko";
    // echo "CALL clienteCreate(".$this->firstName.", ".$this->lastName.", ".$this->gender.", ".$this->email.", ".$this->phone.", ".$this->descripcion.")";
    // die();
    $sql = $this->db->prepare("CALL clienteCreate(:firstName, :lastName, :gender, :email, :phone, :descripcion)");
    $sql->bindParam("firstName", $this->firstName);
    $sql->bindParam("lastName", $this->lastName);
    $sql->bindParam("gender", $this->gender);
    $sql->bindParam("email", $this->email);
    $sql->bindParam("phone", $this->phone);
    $sql->bindParam("descripcion", $this->descripcion);
  
    if($sql->execute()) {
      return "ok";
    }
    return "ko";
  }

  function update(){
    if(empty($this->firstName)) return "ko";
    $sql = $this->db->prepare("CALL clienteUpdate(:id, :firstName, :lastName, :gender, :email, :phone, :descripcion)");
    $sql->bindParam("id", $this->id);
    $sql->bindParam("firstName", $this->firstName);
    $sql->bindParam("lastName", $this->lastName);
    $sql->bindParam("gender", $this->gender);
    $sql->bindParam("email", $this->email);
    $sql->bindParam("phone", $this->phone);
    $sql->bindParam("descripcion", $this->descripcion);
  
    if($sql->execute()) {
      return "ok";
    }
    return "ko";
  }

  function delete($id){
    if(empty($id)) return "ko";

    $sql = $this->db->prepare("CALL clienteDelete(:id)");
    $sql->bindParam("id", $id);  
    if($sql->execute()) {
      return "ok";
    }
    return "ko";
  }
};
