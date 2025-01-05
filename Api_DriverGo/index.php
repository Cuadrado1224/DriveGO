<?php
// Configurar cabeceras para API
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

$allowedFiles = [
    'Borrar_Usuarios.php',
    'Borrar_vehiculo.php',
    'Cargar_veh.php',
    'Correo_cont.php',
    'Crear_Usuario.php',
    'Editar_usuarios.php',
    'Editar_veh.php',
    'Recuperar_contr.php',
    'Ver_usuarios.php',
    'Ver_vehiculos.php',
    'Verificar_usuario.php',
    'actualizar_tarifa.php',
    'bd.php',
    'config.php',
    'devolucion.php',
    'getReservaPorCed.php',
    'getReservas.php',
    'login.php',
    'mostrar_veh.php',
    'mostrar_veh_home.php',
    'reserva.php',
];

$file = basename($requestUri);

if (in_array($file, $allowedFiles)) {
    require_once __DIR__ . "/$file";
} else {
    http_response_code(404);
    echo json_encode([
        "error" => "Archivo no encontrado o no permitido."
    ]);
}