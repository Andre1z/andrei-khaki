<?php
$servidor = "";
$usuario = ""; // Cambia esto según tus credenciales
$contraseña = "";
$base_de_datos = "";

$conexion = new mysqli($servidor, $usuario, $contraseña, $base_de_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
