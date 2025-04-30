<link rel="stylesheet" href="../css/calendario.css">
<link rel="stylesheet" href="../css/estilos.css">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendario - Andrei Khaki</title>
</head>
<body>
<header>
    <h1>Calendario Personalizado</h1>
</header>
<main>
    <h2>Calendario de Eventos</h2>
    <div id="calendar-controls">
        <button id="prev-month">Mes Anterior</button>
        <span id="current-month"></span>
        <button id="next-month">Mes Siguiente</button>
    </div>
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
        <div class="days-grid"></div>
    </div>
    <div id="modal">
        <div id="modal-content"></div>
        <button id="modal-close">Cerrar</button>
    </div>
</main>

<?php include '../includes/footer.php'; ?>