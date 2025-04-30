<?php include '../includes/header.php'; ?>

<main>
    <h2>Calendario de Eventos</h2>
    <!-- Contenedor principal del calendario -->
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
            <!-- Los días y los eventos se generarán dinámicamente con JavaScript -->
        </div>
    </div>

    <!-- Modal para mostrar detalles de eventos -->
    <div id="modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000;">
        <div id="modal-content" style="background:white; color:black; padding:20px; border-radius:8px; max-width:400px; margin:auto; position:relative; margin-top:10%;">
            <!-- Contenido dinámico de los detalles del evento -->
        </div>
        <button id="modal-close" style="position:absolute; top:10px; right:10px; background:red; color:white; border:none; padding:5px; cursor:pointer;">
            Cerrar
        </button>
    </div>
</main>

<?php include '../includes/footer.php'; ?>