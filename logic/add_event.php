<?php
// Incluye la conexión a la base de datos
include '../includes/db_config.php';

// Verifica que los datos se hayan enviado correctamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $conexion->real_escape_string($_POST['titulo']);
    $descripcion = $conexion->real_escape_string($_POST['descripcion']);
    $fecha_inicio = $conexion->real_escape_string($_POST['fecha_inicio']);
    $fecha_fin = $conexion->real_escape_string($_POST['fecha_fin']);

    if (isset($_POST['identificador']) && !empty($_POST['id'])) {
        // Si hay un ID, actualizamos el evento existente
        $id = intval($_POST['identificador']);
        $query = "UPDATE eventos SET titulo='$titulo', descripcion='$descripcion', fecha_inicio='$fecha_inicio', fecha_fin='$fecha_fin' WHERE id=$id";
    } else {
        // Si no hay ID, creamos un nuevo evento
        $query = "INSERT INTO eventos (titulo, descripcion, fecha_inicio, fecha_fin) VALUES ('$titulo', '$descripcion', '$fecha_inicio', '$fecha_fin')";
    }

    if ($conexion->query($query) === TRUE) {
        header('Location: ../index.php'); // Redirige a la página principal tras el éxito
        exit();
    } else {
        echo "Error al procesar el evento: " . $conexion->error;
    }
}
?>