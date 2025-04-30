<?php
include '../includes/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $conexion->real_escape_string($_POST['titulo']);
    $descripcion = $conexion->real_escape_string($_POST['descripcion']);
    $fecha_inicio = $conexion->real_escape_string($_POST['fecha_inicio']);
    $fecha_fin = $conexion->real_escape_string($_POST['fecha_fin']);
    $categoria = $conexion->real_escape_string($_POST['categoria']);

    if (isset($_POST['identificador']) && !empty($_POST['identificador'])) {
        // Actualiza el evento existente
        $id = intval($_POST['identificador']);
        $query = "UPDATE eventos SET titulo='$titulo', descripcion='$descripcion', fecha_inicio='$fecha_inicio', fecha_fin='$fecha_fin', categoria='$categoria' WHERE id=$id";
    } else {
        // Crea un nuevo evento
        $query = "INSERT INTO eventos (titulo, descripcion, fecha_inicio, fecha_fin, categoria) VALUES ('$titulo', '$descripcion', '$fecha_inicio', '$fecha_fin', '$categoria')";
    }

    if ($conexion->query($query) === TRUE) {
        header('Location: ../index.php'); // Redirige al calendario
        exit();
    } else {
        echo "Error al procesar el evento: " . $conexion->error;
    }
}
?>