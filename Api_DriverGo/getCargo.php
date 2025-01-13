<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'bd.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $correo = $input['correo'] ?? null;

    if (!$correo) {
        $response = array(
            "status" => false,
            "message" => "El correo es requerido."
        );
    } else {
        $query = "SELECT cargo FROM usuarios WHERE corr_usu = :correo";
        $stmt = $conn->prepare($query);

        try {
            $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $cargo = $stmt->fetch(PDO::FETCH_ASSOC)['cargo'];

                $response = array(
                    "status" => true,
                    "message" => "Cargo encontrado con éxito.",
                    "cargo" => $cargo
                );
            } else {
                $response = array(
                    "status" => false,
                    "message" => "No se encontró un usuario con el correo proporcionado."
                );
            }
        } catch (PDOException $e) {
            $response = array(
                "status" => false,
                "message" => "Error al consultar los datos: " . $e->getMessage()
            );
        }
    }
} else {
    $response = array(
        "status" => false,
        "message" => "Método no permitido."
    );
}

$conn = null;

header('Content-Type: application/json');
echo json_encode($response);
?>
