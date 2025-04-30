<?php include '../includes/header.php'; ?>

<main>
    <h2>Añadir o Editar Evento</h2>
    <form action="../add_event.php" method="POST">
        <label for="titulo">Título:</label><br>
        <input type="text" id="titulo" name="titulo" required><br><br>
        
        <label for="descripcion">Descripción:</label><br>
        <textarea id="descripcion" name="descripcion" rows="4" required></textarea><br><br>
        
        <label for="fecha_inicio">Fecha y hora de inicio:</label><br>
        <input type="datetime-local" id="fecha_inicio" name="fecha_inicio" required><br><br>
        
        <label for="fecha_fin">Fecha y hora de fin:</label><br>
        <input type="datetime-local" id="fecha_fin" name="fecha_fin" required><br><br>
        
        <button type="submit">Guardar evento</button>
    </form>
</main>

<?php include '../includes/footer.php'; ?>