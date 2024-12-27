<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

include 'bd.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $uploadDir = './IMAGEN/';
  $uploadedFile = null;

  if (!empty($_FILES['img_veh']['name'])) {
    $fileName = time() . '_' . basename($_FILES['img_veh']['name']);
    $uploadFilePath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['img_veh']['tmp_name'], $uploadFilePath)) {
      $uploadedFile = $uploadFilePath;
    } else {
      $response = array(
        "status" => false,
        "code" => 400,
        "message" => "No se pudo actualizar el vehículo"
      );
      echo json_encode($response);
      exit;
    }
  } else {
    $uploadedFile = 'default.png'; 
  }

  if (isset($_POST['mat_veh']) && !empty($_POST['mat_veh'])) {
    $matricula = $_POST['mat_veh'];
  } else {
    $response = array(
      "status" => false,
      "message" => "La matrícula no fue proporcionada."
    );
    echo json_encode($response);
    exit();
  }

  $marca = $_POST['mar_veh'];
  $modelo = $_POST['mod_veh'];
  $tipo = $_POST['tip_veh'];
  $anio = $_POST['anio_veh'];
  $estado = $_POST['est_veh'];
  $transmision = $_POST['tip_trans_veh'];
  $kilometros = $_POST['kil_veh'];
  $ocupantes = $_POST['num_ocu_veh'];
  $puertas = $_POST['num_pue_veh'];
  $chasis = $_POST['chasis'];
  $combustible = $_POST['comb_veh'];

  $query = '
    UPDATE VEHICULOS SET
        MAR_VEH = :marca,
        MOD_VEH = :modelo,
        TIP_VEH = :tipo,
        ANIO_VEH = :anio,
        EST_VEH = :estado,
        TIP_TRANS_VEH = :transmision,
        KIL_VEH = :kilometros,
        NUM_OCU_VEH = :ocupantes,
        NUM_PUE_VEH = :puertas,
        IMG_VEH = :img,
        CHASIS = :chasis,
        COMBUSTIBLE = :combustible
    WHERE MAT_VEH = :matricula
  ';

  $stmt = $conn->prepare($query);

  try {
    $stmt->execute([
      ':matricula' => $matricula,
      ':marca' => $marca,
      ':modelo' => $modelo,
      ':tipo' => $tipo,
      ':anio' => $anio,
      ':estado' => $estado,
      ':transmision' => $transmision,
      ':kilometros' => $kilometros,
      ':ocupantes' => $ocupantes,
      ':puertas' => $puertas,
      ':img' => $uploadedFile,
      ':chasis' => $chasis,
      ':combustible' => $combustible
    ]);

    if ($stmt->rowCount() > 0) {
      $response = array(
        "status" => true,
        "message" => "Vehículo actualizado exitosamente"
      );
    } else {
      $response = array(
        "status" => false,
        "message" => "No se pudo actualizar el vehículo o no hubo cambios."
      );
    }
  } catch (PDOException $e) {
    $response = array(
      "status" => false,
      "message" => "Error al actualizar el vehículo: " . $e->getMessage()
    );
  }
} else {
  $response = array(
    "status" => false,
    "message" => "Método no permitido"
  );
}

$conn = null;
header("Access-Control-Allow-Origin: " . ($_SERVER['HTTP_ORIGIN'] ?? '*'));

echo json_encode($response);
?>
