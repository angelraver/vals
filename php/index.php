<?php
require './headers.php';
require './utils.php';
require './database.php';
require './controller/tratamientoController.php';
require './controller/clienteController.php';
require './controller/turnoController.php';

$params = json_decode(file_get_contents("php://input"));
$method = $_SERVER['REQUEST_METHOD'];
$uris = explode("/", "$_SERVER[REQUEST_URI]");
$endpoint = $uris[1];
$id = $uris[2];

switch ($endpoint) {
  case 'tratamiento':
    $tratamiento = new TratamientoController($params);
    switch($method) {
      case 'GET':
        $data = $tratamiento->get($id);
        echo json_encode($data);
      break;
      case 'POST':
        $result = $tratamiento->create();
        echo json_encode("{ status: $result }");
      break;
      case 'PUT':
        $result = $tratamiento->update();
        echo json_encode("{ status: $result }");
      break;
      case 'DELETE':
        $result = $tratamiento->delete($id);
        echo json_encode("{ status: $result }");
      break;
    }
  break;
  case 'cliente':
    $cliente = new ClienteController($params);
    switch($method) {
      case 'GET':
        $data = $cliente->get($id);
        echo json_encode($data);
      break;
      case 'POST':
        $result = $cliente->create();
        echo json_encode("{ status: $result }");
      break;
      case 'PUT':
        $result = $cliente->update();
        echo json_encode("{ status: $result }");
      break;
      case 'DELETE':
        $result = $cliente->delete($id);
        echo json_encode("{ status: $result }");
      break;
    }
  break;
  case 'turno':
    $turno = new TurnoController($params);
    switch($method) {
      case 'POST':
        if ($params->get) {
          $data = $turno->get();
          echo json_encode($data);
        } else {
          $result = $turno->create();
          echo json_encode("{ status: $result }");
        }
      break;
      case 'PUT':
        $result = $turno->update();
        echo json_encode("{ status: $result }");
      break;
    }
  break;
  break;
  default:
    include "site.php";
  break;
};
