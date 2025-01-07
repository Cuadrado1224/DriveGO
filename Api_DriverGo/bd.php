<?php
$host = 'dpg-ctu98f3qf0us73f25n70-a';
$dbname = '5432';
$user = 'admin';
$password = 'OSVOdxpyIn5vQ4Vy1uUMUqdAvF37Gl9t';
try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

?>
