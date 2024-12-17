<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'bd.php';

// Verificar si se recibió una solicitud POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos enviados
    $data = json_decode(file_get_contents("php://input"));

    $id_veh = $data->id_veh;   // ID del vehículo
    $nueva_tarifa = $data->tarifa_veh;  // Nueva tarifa

    if (empty($id_veh) || empty($nueva_tarifa)) {
        echo json_encode(["status" => false, "message" => "Faltan datos"]);
        exit();
    }

    // Actualizar la tarifa en la base de datos
    try {
        $stmt = $pdo->prepare("UPDATE vehiculos SET precio_veh = :tarifa_veh WHERE id_veh = :id_veh");
        $stmt->bindParam(':tarifa_veh', $nuevaTarifa);
        $stmt->bindParam(':id_veh', $idVehiculo);

        $stmt->execute();

        // Verificar si la actualización fue exitosa
        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => true, "message" => "Tarifa actualizada con éxito"]);
        } else {
            echo json_encode(["status" => false, "message" => "No se encontró el vehículo o no hubo cambios"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => false, "message" => "Error al actualizar la tarifa: " . $e->getMessage()]);
    }
}
?>
