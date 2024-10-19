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

$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if ($username && $email && $password) {
    $stmt = $pdo->prepare("SELECT * FROM USUARIOS WHERE NOM_USU = :username OR COR_USU = :email");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        http_response_code(409); 
        echo json_encode([
            'success' => false,
            'message' => 'El nombre de usuario o el correo ya están en uso.'
        ]);
    } else {
        // Hash de la contraseña antes de guardarla
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
        // Inserta el nuevo usuario en la base de datos
        $stmt = $pdo->prepare("INSERT INTO USUARIOS (NOM_USU, COR_USU, CON_USU) VALUES (:username, :email, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Registro exitoso.'
            ]);
        } else {
            http_response_code(500); 
            echo json_encode([
                'success' => false,
                'message' => 'Error al registrar el usuario.'
            ]);
        }
    }
} else {
    http_response_code(400); 
    echo json_encode([
        'success' => false,
        'message' => 'Faltan datos para el registro.'
    ]);
}