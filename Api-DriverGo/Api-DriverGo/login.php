<?php

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'bd.php'; 

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['nombre_usuario']) && isset($input['contrasena'])) {
    $nombre_usuario = $input['nombre_usuario'];
    $contrasena = $input['contrasena'];

    $query = "SELECT * FROM usuarios WHERE nom_usu = $1 AND con_usu = $2";
    $result = pg_query_params($conn, $query, array($nombre_usuario, $contrasena));

    if ($result && pg_num_rows($result) > 0) {
        $user = pg_fetch_assoc($result);
        $rol = $user['corr_usu'];

        $response = array(
            "status" => "success", 
            "message" => "Inicio de sesión exitoso",
            "rol" => $rol
        );
    } else {
        $response = array("status" => "error", "message" => "Usuario o contraseña incorrectos");
    }

    pg_free_result($result);
} else {
    $response = array("status" => "error", "message" => "Datos incompletos");
}

pg_close($conn);

header('Content-Type: application/json');
echo json_encode($response);
?>