<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'bd.php';

$input = json_decode(file_get_contents('php://input'), true);

if ($input === null) {
    $response = array(
        "status" => false,
        "message" => "Entrada inválida. Asegúrate de enviar un JSON válido."
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}

if (
    isset($input['mat_veh'], $input['mar_veh'], $input['mod_veh'], $input['tip_veh'], $input['anio_veh'],
          $input['est_veh'], $input['tip_trans_veh'], $input['kil_veh'], $input['num_ocu_veh'], 
          $input['num_pue_veh'], $input['chasis'], $input['combustible'])
) {
    $matricula = $input['mat_veh'];
    $marca = $input['mar_veh'];
    $modelo = $input['mod_veh'];
    $tipo = $input['tip_veh'];
    $anio = $input['anio_veh'];
    $estado = $input['est_veh'];
    $transmision = $input['tip_trans_veh'];
    $kilometros = $input['kil_veh'];
    $ocupantes = $input['num_ocu_veh'];
    $puertas = $input['num_pue_veh'];
    $chasis = $input['chasis'];
    $combustible = $input['combustible'];

    $query = "
        UPDATE vehiculos
        SET 
            mar_veh = :marca,
            mod_veh = :modelo,
            tip_veh = :tipo,
            anio_veh = :anio,
            est_veh = :estado,
            tip_trans_veh = :transmision,
            kil_veh = :kilometros,
            num_ocu_veh = :ocupantes,
            num_pue_veh = :puertas,
            chasis = :chasis,
            combustible = :combustible
        WHERE mat_veh = :matricula
    ";

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
            ':chasis' => $chasis,
            ':combustible' => $combustible
        ]);

        $response = array(
            "status" => $stmt->rowCount() > 0,
            "message" => $stmt->rowCount() > 0 
                        ? "Vehículo actualizado exitosamente"
                        : "No se encontró el vehículo o no hubo cambios"
        );
    } catch (PDOException $e) {
        error_log("Error en la consulta SQL: " . $e->getMessage());
        $response = array(
            "status" => false,
            "message" => "Error al actualizar el vehículo"
        );
    }
} else {
    $response = array(
        "status" => false,
        "message" => "Datos incompletos"
    );
}

$conn = null;
header('Content-Type: application/json');
echo json_encode($response);
?>
