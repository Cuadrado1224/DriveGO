<?php
$host = 'localhost';
$db = 'drivego';
$user = 'admin';
$pass = 'admin';
$port = '3030'; 

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
}
