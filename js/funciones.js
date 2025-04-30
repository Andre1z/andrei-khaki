document.addEventListener('DOMContentLoaded', function () {
    const calendarGrid = document.querySelector('.days-grid');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    // Función para generar el calendario de un mes
    function generarCalendario(mes, anio) {
        calendarGrid.innerHTML = ''; // Limpiar el calendario

        // Obtener el primer y último día del mes
        const primerDia = new Date(anio, mes, 1);
        const ultimoDia = new Date(anio, mes + 1, 0);

        // Llenar días vacíos al inicio de la primera semana
        const primerDiaSemana = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1;
        for (let i = 0; i < primerDiaSemana; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            calendarGrid.appendChild(emptyDiv);
        }

        // Crear casillas para los días del mes
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
                eventDiv.dataset.detalles = evento.description || "Sin descripción"; // Detalles adicionales
                eventDiv.addEventListener('click', (e) => mostrarDetalles(evento)); // Manejar clic para ver detalles
                diaDiv.appendChild(eventDiv);
            }
        });
    }

    // Función para mostrar los detalles de un evento en un modal
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

    // Crear nuevo evento al hacer clic en un día vacío
    calendarGrid.addEventListener('click', (e) => {
        if (e.target.dataset.fecha && !e.target.querySelector('.event')) {
            const fechaSeleccionada = e.target.dataset.fecha;
            const titulo = prompt('Introduce el título del evento:', 'Nuevo evento');
            const descripcion = prompt('Introduce una descripción:', 'Descripción del evento');
            if (titulo && descripcion) {
                guardarEvento(titulo, descripcion, fechaSeleccionada);
            }
        }
    });

    // Función para guardar un nuevo evento en la base de datos
    async function guardarEvento(titulo, descripcion, fecha) {
        const response = await fetch('../logic/add_event.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `titulo=${encodeURIComponent(titulo)}&descripcion=${encodeURIComponent(descripcion)}&fecha_inicio=${fecha}&fecha_fin=${fecha}`
        });

        if (response.ok) {
            alert('Evento creado con éxito.');
            location.reload(); // Recargar el calendario para actualizar los eventos
        } else {
            alert('Hubo un error al crear el evento.');
        }
    }

    // Generar el calendario y cargar los eventos
    const hoy = new Date();
    generarCalendario(hoy.getMonth(), hoy.getFullYear());
    cargarEventos();
});