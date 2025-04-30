<?php
// Incluye la configuración de conexión a la base de datos
include 'includes/db_config.php';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendario - Andrei Khaki</title>
    <link rel="stylesheet" href="css/estilos.css"> <!-- Enlace al archivo CSS -->
</head>
<body>
    <header>
        <h1>Bienvenido al Calendario</h1>
    </header>

    <main>
        <h2>Eventos del Calendario</h2>
        <?php
        // Consulta para obtener los eventos
        $query = "SELECT * FROM eventos ORDER BY fecha_inicio ASC";
        $resultado = $conexion->query($query);

        // Verifica si hay resultados
        if ($resultado->num_rows > 0): ?>
            <ul>
                <?php while ($evento = $resultado->fetch_assoc()): ?>
                    <li>
                        <strong><?php echo htmlspecialchars($evento['titulo']); ?></strong><br>
                        <?php echo htmlspecialchars($evento['descripcion']); ?><br>
                        Inicio: <?php echo htmlspecialchars($evento['fecha_inicio']); ?><br>
                        Fin: <?php echo htmlspecialchars($evento['fecha_fin']); ?>
                    </li>
                <?php endwhile; ?>
            </ul>
        <?php else: ?>
            <p>No hay eventos por ahora.</p>
        <?php endif; ?>
        ?>
    </main>

    <footer>
        <p>&copy; 2025 - Desarrollado por Andrei</p>
    </footer>
</body>
</html>