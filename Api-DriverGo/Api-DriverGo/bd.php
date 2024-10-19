<?php
$host = 'localhost';
$dbname = 'DB_Driver';
$user = 'postgres';
$password = 'DriverG@';
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Error en la conexión a la base de datos: " . pg_last_error());
}
?>
