document.addEventListener('DOMContentLoaded', function () {
    const calendarGrid = document.querySelector('.days-grid');

    // Función para generar un mes
    function generarCalendario(mes, anio) {
        // Limpia el calendario
        calendarGrid.innerHTML = '';

        // Obtener el primer día del mes
        const primerDia = new Date(anio, mes, 1);
        const ultimoDia = new Date(anio, mes + 1, 0);

        // Días previos para llenar la primera semana
        const primerDiaSemana = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1;
        for (let i = 0; i < primerDiaSemana; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            calendarGrid.appendChild(emptyDiv);
        }

        // Días del mes
        for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = dia;
            dayDiv.dataset.fecha = `${anio}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
            calendarGrid.appendChild(dayDiv);
        }
    }

    // Función para cargar eventos desde la base de datos
    async function cargarEventos() {
        const response = await fetch('../logic/get_events.php');
        const eventos = await response.json();

        eventos.forEach(evento => {
            const diaDiv = document.querySelector(`[data-fecha="${evento.start.split(' ')[0]}"]`);
            if (diaDiv) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.textContent = evento.title;
                diaDiv.appendChild(eventDiv);
            }
        });
    }

    // Generar calendario actual
    const hoy = new Date();
    generarCalendario(hoy.getMonth(), hoy.getFullYear());

    // Cargar eventos
    cargarEventos();
});