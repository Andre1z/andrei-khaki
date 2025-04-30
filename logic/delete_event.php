<?php
include '../includes/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['identificador']);

    $query = "DELETE FROM eventos WHERE identificador=$id";

    if ($conexion->query($query)) {
        echo "Evento eliminado con éxito.";
    } else {
        echo "Error al eliminar el evento: " . $conexion->error;
    }
}
?>