<?php
include '../includes/db_config.php';

$query = "SELECT identificador, titulo AS title, descripcion AS description, fecha_inicio AS start, fecha_fin AS end, categoria FROM eventos";
$resultado = $conexion->query($query);

echo "<table border='1'>";
echo "<tr>
    <th>Identificador</th>
    <th>Título</th>
    <th>Descripción</th>
    <th>Fecha Inicio</th>
    <th>Fecha Fin</th>
    <th>Categoría</th>
      </tr>";

while ($evento = $resultado->fetch_assoc()) {
    echo "<tr>
        <td>{$evento['identificador']}</td>
        <td>{$evento['title']}</td>
        <td>{$evento['description']}</td>
        <td>{$evento['start']}</td>
        <td>{$evento['end']}</td>
        <td>{$evento['categoria']}</td>
      </tr>";
}
echo "</table>";
?>
