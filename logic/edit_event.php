<?php
include '../includes/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);
    $titulo = $conexion->real_escape_string($_POST['titulo']);
    $descripcion = $conexion->real_escape_string($_POST['descripcion']);
    $fecha_inicio = $conexion->real_escape_string($_POST['fecha_inicio']);
    $fecha_fin = $conexion->real_escape_string($_POST['fecha_fin']);

    $query = "UPDATE eventos SET titulo='$titulo', descripcion='$descripcion', fecha_inicio='$fecha_inicio', fecha_fin='$fecha_fin' WHERE id=$id";

    if ($conexion->query($query)) {
        echo "Evento actualizado con éxito.";
    } else {
        echo "Error al actualizar el evento: " . $conexion->error;
    }
}
?>