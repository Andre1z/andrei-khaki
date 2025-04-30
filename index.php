<?php include 'includes/db_config.php'; ?>
<?php include 'includes/header.php'; ?>

<main>
    <h2>Eventos del Calendario</h2>
    <?php
    // Consulta para mostrar eventos
    $query = "SELECT * FROM eventos ORDER BY fecha_inicio ASC";
    $resultado = $conexion->query($query);

    if ($resultado->num_rows > 0) {
        echo "<ul>";
        while ($evento = $resultado->fetch_assoc()) {
            echo "<li>";
            echo "<strong>" . htmlspecialchars($evento['titulo']) . "</strong><br>";
            echo htmlspecialchars($evento['descripcion']) . "<br>";
            echo "Inicio: " . htmlspecialchars($evento['fecha_inicio']) . "<br>";
            echo "Fin: " . htmlspecialchars($evento['fecha_fin']);
            echo "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No hay eventos por ahora.</p>";
    }
    ?>
</main>

<?php include 'includes/footer.php'; ?>
