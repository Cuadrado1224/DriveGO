<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../db.php';
global $pdo;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        if (isset($_GET['cedula'])) {
            // Consultar reservas por cédula
            $cedula = $_GET['cedula'];
            $stmt = $pdo->prepare(
                "SELECT r.ID_RES, r.CED_USU_RES, r.NOM_USU_RES, r.MATRICULA_VEH, r.FEC_RES, r.FEC_DEV, r.EST_VEH_DEV, r.TAR_ADI, r.DES_DEV, 
                        v.MOD_VEH, v.MARCA_VEH, v.TIP_VEH
                FROM RESERVAS r
                LEFT JOIN VEHICULOS v ON r.MATRICULA_VEH = v.MATRICULA
                WHERE r.CED_USU_RES = ?"
            );
            $stmt->execute([$cedula]);
            $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["success" => true, "data" => $reservas]);
            exit;
        } else {
            // Consultar todas las reservas
            $stmt = $pdo->prepare(
                "SELECT r.ID_RES, r.CED_USU_RES, r.NOM_USU_RES, r.MATRICULA_VEH, r.FEC_RES, r.FEC_DEV, r.EST_VEH_DEV, r.TAR_ADI, r.DES_DEV, 
                        v.MOD_VEH, v.MARCA_VEH, v.TIP_VEH
                FROM RESERVAS r
                LEFT JOIN VEHICULOS v ON r.MATRICULA_VEH = v.MATRICULA"
            );
            $stmt->execute();
            $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(["success" => true, "data" => $reservas]);
            exit;
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al obtener las reservas: " . $e->getMessage()]);
        exit;
    }
}

?>