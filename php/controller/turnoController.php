<?php
class TurnoController {
  private $db;
  
  public $id;
  public $idCliente;
  public $idTratamiento;
  public $fecha;
  public $hora;
  public $status;
  public $next;

	public function __construct($params) {
    $this->id = orNull($params->id);
    $this->idCliente = orNull($params->idCliente);
    $this->idTratamiento = orNull($params->idTratamiento);
    $this->fecha = orNull($params->fecha);
    $this->hora = orNull($params->hora);
    $this->status = orNull($params->status);
    $this->next = orNull($params->next);

    $database = new Database();
    $this->db = $database->getConnection();
	}

  public function get(){
    $sql = $this->db->prepare("CALL turnoGet(:id, :idCliente, :idTratamiento, :fecha, :status, :next);");
    $sql->bindParam("id", orNull($this->id));
    $sql->bindParam("idCliente", orNull($this->idCliente));
    $sql->bindParam("idTratamiento", orNull($this->idTratamiento));
    $sql->bindParam("fecha", orNull($this->fecha));
    $sql->bindParam("status", orNull($this->status));
    $sql->bindParam("next", orNull($this->next));
    $sql->execute();
    $datos = [];
    while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
      $datos []= $row;
    }

    return $datos;
  }

  function create(){
    if(empty($this->idCliente) || empty($this->idTratamiento) || empty($this->fecha) || empty($this->hora)) return "ko";
    $sql = $this->db->prepare("CALL turnoCreate(:idCliente, :idTratamiento, :fecha, :hora)");
    $sql->bindParam("idCliente", $this->idCliente);
    $sql->bindParam("idTratamiento", $this->idTratamiento);
    $sql->bindParam("fecha", $this->fecha);
    $sql->bindParam("hora", $this->hora);
    if($sql->execute()) {
      return "ok";
    }
    return "ko";
  }

  function update(){
    if(empty($this->id) || empty($this->status)) return "ko";

    $sql = $this->db->prepare("CALL turnoUpdate(:id, :status)");
    $sql->bindParam("id", $this->id);
    $sql->bindParam("status", $this->status);
  
    if($sql->execute()) {
      return "ok";
    }
    return "ko";
  }
};
