const listadoDeTareas = document.querySelector('#listadoDeTareas');
const tareaInput = document.querySelector('#nuevaTarea');
const agregarTarea = document.querySelector('#agregarTarea');
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");


let listaTarea = [
    { id: 1, tarea: 'tarea1', realizada: false },
    { id: 2, tarea: 'tarea2', realizada: false },
    { id: 3, tarea: 'tarea3', realizada: false }
];


function obtenerSiguienteId() {
    let maxId = 0;
    listaTarea.forEach(tarea => {
        if (tarea.id > maxId) {
            maxId = tarea.id;
        }
    });
    return maxId + 1;
}


function actualizarContadores() {
    total.innerHTML = listaTarea.length;
    realizadas.innerHTML = listaTarea.filter(tarea => tarea.realizada).length;
}


function renderTarea() {
    listadoDeTareas.innerHTML = ''; 
    listaTarea.forEach(listado => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.id = `tarea-${listado.id}`; 
        nuevaFila.innerHTML = `
            <th scope="row">${listado.id}</th>
            <td>${listado.tarea}</td>
            <td><input type="checkbox" ${listado.realizada ? 'checked' : ''} onchange="marcarRealizada(${listado.id})"/></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarTarea(${listado.id})">X</button></td>
        `;
        listadoDeTareas.appendChild(nuevaFila);
    });
}


agregarTarea.addEventListener('click', (event) => {
    event.preventDefault(); 

    const tarea = tareaInput.value.trim();
    if (tarea) {
        const nuevaTarea = { 
            id: obtenerSiguienteId(), 
            tarea: tarea, 
            realizada: false 
        };
        listaTarea.push(nuevaTarea);
        tareaInput.value = '';
        actualizarContadores();
        renderTarea();
    }
});

function eliminarTarea(id) {
    listaTarea = listaTarea.filter(tarea => tarea.id !== id);
    actualizarContadores();
    renderTarea();
}


function marcarRealizada(id) {
    const tarea = listaTarea.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        actualizarContadores();

       
        const checkbox = document.querySelector(`#tarea-${id} input[type="checkbox"]`);
        checkbox.checked = tarea.realizada; 
    }
}


actualizarContadores();
renderTarea();