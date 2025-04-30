<?php
// Incluye la configuración de la base de datos
include 'includes/db_config.php';

// Incluye el encabezado común
include 'includes/header.php';
?>

<main>
    <h2>Eventos del Calendario</h2>
    <!-- Enlace al formulario para añadir nuevos eventos -->
    <a href="templates/evento_form.php" style="display: inline-block; margin-bottom: 20px; color: #4CAF50; text-decoration: none;">Añadir un nuevo evento</a>
    <hr>

    <!-- Lista de eventos -->
    <?php
    // Consulta para obtener los eventos
    $query = "SELECT * FROM eventos ORDER BY fecha_inicio ASC";
    $resultado = $conexion->query($query);

    if ($resultado->num_rows > 0) {
        echo "<ul style='list-style-type: none; padding: 0;'>";
        while ($evento = $resultado->fetch_assoc()) {
            echo "<li style='border: 1px solid #ccc; margin-bottom: 10px; padding: 10px;'>";
            echo "<strong>" . htmlspecialchars($evento['titulo']) . "</strong><br>";
            echo htmlspecialchars($evento['descripcion']) . "<br>";
            echo "<small>Inicio: " . htmlspecialchars($evento['fecha_inicio']) . "</small><br>";
            echo "<small>Fin: " . htmlspecialchars($evento['fecha_fin']) . "</small>";
            echo "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No hay eventos por ahora.</p>";
    }
    ?>
</main>

<?php
// Incluye el pie de página común
include 'includes/footer.php';
?>