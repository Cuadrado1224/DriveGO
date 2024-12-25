<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'bd.php';
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($data['idReserva'], $data['estadoVehiculo'], $data['descripcionDevolucion'], $data['tarifaAdicional'])) {
        echo json_encode(["error" => "Datos incompletos."]);
        exit;
    }

    $idReserva = $data['idReserva'];
    $estadoVehiculo = $data['estadoVehiculo'];
    $descripcionDevolucion = $data['descripcionDevolucion'];
    $tarifaAdicional = $data['tarifaAdicional'];

    try {
        // Actualizar la reserva con la devolución
        $stmt = $conn->prepare(
            "UPDATE RESERVAS SET EST_VEH_DEV = ?, DES_DEV = ?, TAR_ADI = ? WHERE ID_RES = ?"
        );
        $stmt->execute([$estadoVehiculo, $descripcionDevolucion, $tarifaAdicional, $idReserva]);

        // Si el estado del vehículo es "Descompuesto", actualizar el estado del vehículo a "Mantenimiento"
        if ($estadoVehiculo === "DESCOMPUESTO") {
            // Obtener la matrícula del vehículo desde la reserva
            $stmt = $conn->prepare("SELECT matricula_veh FROM RESERVAS WHERE ID_RES = ?");
            $stmt->execute([$idReserva]);
            $reserva = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($reserva) {
                $matriculaVehiculo = $reserva['matricula_veh'];

                // Verificar si la matrícula existe en la tabla VEHICULOS
                $stmt = $conn->prepare("SELECT mat_veh FROM VEHICULOS WHERE mat_veh = ?");
                $stmt->execute([$matriculaVehiculo]);
                $vehiculo = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($vehiculo) {
                    // Actualizar el estado del vehículo a "Mantenimiento"
                    $stmt = $conn->prepare("UPDATE VEHICULOS SET est_veh = 'Mantenimiento' WHERE mat_veh = ?");
                    $stmt->execute([$matriculaVehiculo]);
                } else {
                    echo json_encode(["error" => "El vehículo no existe en la base de datos."]);
                    exit;
                }
            } else {
                echo json_encode(["error" => "No se encontró la matrícula del vehículo en la reserva."]);
                exit;
            }
        }

        echo json_encode(["success" => "Devolución registrada exitosamente."]);
        exit;
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al registrar la devolución: " . $e->getMessage()]);
        exit;
    }
}
?>