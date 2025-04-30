<?php include '../includes/header.php'; ?>

<main>
    <h2>Calendario de Eventos</h2>
    <!-- Contenedor del calendario -->
    <div id="calendar">
        <div class="days-header">
            <div class="day">Lunes</div>
            <div class="day">Martes</div>
            <div class="day">Miércoles</div>
            <div class="day">Jueves</div>
            <div class="day">Viernes</div>
            <div class="day">Sábado</div>
            <div class="day">Domingo</div>
        </div>
        <div class="days-grid">
            <!-- Aquí se generarán dinámicamente los días del mes -->
        </div>
    </div>
</main>

<?php include '../includes/footer.php'; ?>

<!-- Lógica JavaScript -->
<script src="../js/funciones.js"></script>