document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    const calendarGrid = document.querySelector('.days-grid');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    let mesActual = new Date().getMonth(); // Mes actual (0-11)
    let anioActual = new Date().getFullYear(); // Año actual

    // Función para actualizar el título del mes
    function actualizarTituloMes() {
        const nombreMeses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        document.getElementById('current-month').textContent = `${nombreMeses[mesActual]} ${anioActual}`;
    }

    // Función para generar el calendario de un mes
    function generarCalendario(mes, anio) {
        calendarGrid.innerHTML = ''; // Limpiar el calendario
        const primerDia = new Date(anio, mes, 1); // Primer día del mes
        const ultimoDia = new Date(anio, mes + 1, 0); // Último día del mes
        const primerDiaSemana = primerDia.getDay() === 0 ? 6 : primerDia.getDay() - 1;

        // Días vacíos antes del inicio del mes
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
                eventDiv.dataset.detalles = evento.description || "Sin descripción"; // Detalles adicionales
                eventDiv.addEventListener('click', () => mostrarDetalles(evento)); // Manejar clic para ver detalles
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
            <button id="edit-event" style="background:blue; color:white; padding:5px; margin-right:5px; cursor:pointer;">Editar</button>
            <button id="delete-event" style="background:red; color:white; padding:5px; cursor:pointer;">Eliminar</button>
        `;
        modal.style.display = 'block';

        // Editar el evento
        document.getElementById('edit-event').addEventListener('click', () => editarEvento(evento));

        // Eliminar el evento
        document.getElementById('delete-event').addEventListener('click', () => eliminarEvento(evento.id));
    }

    // Cerrar el modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Función para crear un nuevo evento al hacer clic en un día vacío
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

    // Función para editar un evento existente
    async function editarEvento(evento) {
        const nuevoTitulo = prompt('Editar título del evento:', evento.title);
        const nuevaDescripcion = prompt('Editar descripción del evento:', evento.description || '');
        const nuevaFechaInicio = prompt('Editar fecha de inicio (YYYY-MM-DD HH:MM):', evento.start);
        const nuevaFechaFin = prompt('Editar fecha de fin (YYYY-MM-DD HH:MM):', evento.end || evento.start);

        if (nuevoTitulo && nuevaDescripcion && nuevaFechaInicio) {
            const response = await fetch('../logic/edit_event.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${evento.id}&titulo=${encodeURIComponent(nuevoTitulo)}&descripcion=${encodeURIComponent(nuevaDescripcion)}&fecha_inicio=${nuevaFechaInicio}&fecha_fin=${nuevaFechaFin}`
            });

            if (response.ok) {
                alert('Evento actualizado con éxito.');
                location.reload(); // Refrescar el calendario
            } else {
                alert('Error al actualizar el evento.');
            }
        }
    }

    // Función para eliminar un evento existente
    async function eliminarEvento(eventId) {
        const confirmar = confirm('¿Estás seguro de que quieres eliminar este evento?');

        if (confirmar) {
            const response = await fetch('../logic/delete_event.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${eventId}`
            });

            if (response.ok) {
                alert('Evento eliminado con éxito.');
                location.reload(); // Refrescar el calendario
            } else {
                alert('Error al eliminar el evento.');
            }
        }
    }

    // Navegación entre meses
    document.getElementById('prev-month').addEventListener('click', () => {
        mesActual--;
        if (mesActual < 0) {
            mesActual = 11;
            anioActual--;
        }
        generarCalendario(mesActual, anioActual);
        cargarEventos();
        actualizarTituloMes();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        mesActual++;
        if (mesActual > 11) {
            mesActual = 0;
            anioActual++;
        }
        generarCalendario(mesActual, anioActual);
        cargarEventos();
        actualizarTituloMes();
    });

    // Inicializar el calendario
    actualizarTituloMes(); // Actualizar el título del mes
    generarCalendario(mesActual, anioActual); // Generar el calendario del mes actual
    cargarEventos(); // Cargar eventos desde la base de datos
});