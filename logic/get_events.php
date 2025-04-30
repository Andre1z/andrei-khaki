<?php
include '../includes/db_config.php';

// Consulta los eventos
$query = "SELECT titulo AS title, fecha_inicio AS start FROM eventos";
$resultado = $conexion->query($query);

$events = [];
while ($evento = $resultado->fetch_assoc()) {
    $events[] = $evento;
}

echo json_encode($events);
?>