<?php
include '../includes/db_config.php';

$query = "SELECT id, titulo AS title, descripcion AS description, fecha_inicio AS start, fecha_fin AS end, categoria FROM eventos";
$resultado = $conexion->query($query);

$events = [];
while ($evento = $resultado->fetch_assoc()) {
    $events[] = $evento;
}

echo json_encode($events);
?>