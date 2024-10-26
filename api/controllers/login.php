<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization'); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../db.php';
global $pdo;

$data = json_decode(file_get_contents('php://input'), true);

$nombre_usuario = $data['username'] ?? null;  
$contrasena = $data['password'] ?? null;  

if ($nombre_usuario && $contrasena) {
    // Selecciona al usuario por su nombre de usuario
    $stmt = $pdo->prepare("SELECT * FROM USUARIOS WHERE NOM_USU = :nombre_usuario");
    $stmt->bindParam(':nombre_usuario', $nombre_usuario);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($contrasena, $usuario['con_usu'])) {  // Verifica la contraseña con el hash
        echo json_encode([
            'success' => true,
            'message' => 'Login exitoso',
            'usuario' => $usuario
        ]);
    } else {
        http_response_code(401); 
        echo json_encode([
            'success' => false,
            'message' => 'Usuario o contraseña incorrectos'
        ]);
    }
} else {
    http_response_code(400); 
    echo json_encode([
        'success' => false,
        'message' => 'Faltan datos para el login'
    ]);
}