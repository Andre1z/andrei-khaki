<?php include 'includes/db_config.php'; ?>
<?php include 'includes/header.php'; ?>
<link rel="stylesheet" href="css/evento_form.css">

<main>
    <h2>Añadir o Editar Evento</h2>
    <form action="logic/add_event.php" method="POST">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" required>
        
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" rows="4" required></textarea>
        
        <label for="fecha_inicio">Fecha y hora de inicio:</label>
        <input type="datetime-local" id="fecha_inicio" name="fecha_inicio" required>
        
        <label for="fecha_fin">Fecha y hora de fin:</label>
        <input type="datetime-local" id="fecha_fin" name="fecha_fin" required>
        
        <label for="categoria">Categoría:</label>
        <select id="categoria" name="categoria" required>
            <option value="Reunión">Reunión</option>
            <option value="Capacitación">Capacitación</option>
            <option value="Presentación">Presentación</option>
            <option value="General" selected>General</option>
        </select>
        
        <button type="submit">Guardar evento</button>
    </form>
</main>

<?php include 'includes/footer.php'; ?>
