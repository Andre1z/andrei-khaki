document.addEventListener('DOMContentLoaded', function () {
    const calendarGrid = document.querySelector('.days-grid');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    // Función para generar un mes
    function generarCalendario(mes, anio) {
        calendarGrid.innerHTML = ''; // Limpia el calendario
        const primerDia = new Date(anio, mes, 1);
        const ultimoDia = new Date(anio, mes + 1, 0);

        const primerDiaSemana = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1;
        for (let i = 0; i < primerDiaSemana; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            calendarGrid.appendChild(emptyDiv);
        }

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
                eventDiv.dataset.detalles = evento.description || "Sin descripción"; // Agregar detalles si existen
                eventDiv.addEventListener('click', (e) => mostrarDetalles(evento)); // Vincular clic al evento
                diaDiv.appendChild(eventDiv);
            }
        });
    }

    // Función para mostrar detalles del evento en un modal
    function mostrarDetalles(evento) {
        modalContent.innerHTML = `
            <h3>${evento.title}</h3>
            <p>${evento.description || 'Sin descripción disponible'}</p>
            <p><strong>Inicio:</strong> ${evento.start}</p>
            <p><strong>Fin:</strong> ${evento.end || 'No especificado'}</p>
        `;
        modal.style.display = 'block';
    }

    // Cerrar el modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Generar calendario y cargar eventos
    const hoy = new Date();
    generarCalendario(hoy.getMonth(), hoy.getFullYear());
    cargarEventos();
});