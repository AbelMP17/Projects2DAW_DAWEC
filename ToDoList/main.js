/**
 * @author: Abel Martinez Peinado
 * @description: 
 - [x] Mostrar Gráifco muestra un grafico sectorial con las tareas (completas y no completas).
 - [x] CREAR UN MODULO errores.js que le pase como parametro el texto que quiero mostrar y como segundo parametro el elemento del DOM donde lo quiero mostrar, de tal forma que cuando inserte una tarea cuyo nombre(title) ya exista mostrara un error debajo del input cuya duracion sea de 3 segundos

 - [x] DOble click sobre el title de una tarea me lanzara un prompt con el contenido de esa tarea, pudiendo modificar solo el texto

 - [c] Añadir un boton al lado de eliminar tarea, imprimir tarea, que imprimira en un PDF los siguientes datos:
   -  1- Texto tarea
   - 2- Id Tarea
   - 3- SI esta completada o no
   - 4- Fecha actual en la que se imprimie
 
 - [x] Utilizando Blob descargar el pdf a nuestro PC con el nombre que sea las Cuatro primeras letras de tu texto de la tarea_dia_mes_año.pdf
 
 - [x] Pulsando el boton de la lupa, e introduciendo cualquier texto, al lanzar el evento del enter me filtrará todas aquellas tareas que contengan en su title el texto introducido.
 */

 /*

 - [x] Crear un boton al lado de mostrar grafico llamado, Generar Evento Calendario, de tipo ICS  que genere  un evento del calendario cuya fecha de inicio sea la actual  y cuya fecha de finalizacion sea justamente 30 dias despues y cuyo contenido sea el numero de tareas que tengo sin realizar.

 */

// Imports
import "./main.css";
import { v4 as uuidv4 } from "uuid";
import autoAnimate from "@formkit/auto-animate";
import crearGrafico from "./components/grafico";
import error from "./components/error";
import { createPDF } from "./components/jspdf";

//------------------------------------------------------------------------- ICS ----------------------------------------------------------------
// ...

const generarEventoBtn = document.createElement("button");
generarEventoBtn.textContent = "Generar Evento Calendario";
generarEventoBtn.className = "generar-evento-btn";

// Evento para generar el evento de calendario
generarEventoBtn.addEventListener("click", () => {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 30);

  const icsContent = generateICSContent(today, endDate, app.tasks.length);

  // Crear un enlace para descargar el archivo ICS
  const downloadLink = document.createElement("a");
  downloadLink.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  downloadLink.download = "evento-calendario.ics";
  downloadLink.click();
});

// Agregar el botón al DOM
document.getElementById("action-list").appendChild(generarEventoBtn);
// ...

// Función para generar el contenido del archivo ICS
function generateICSContent(startDate, endDate, taskCount) {
  const dateFormat = (date) => date.toISOString().replace(/-|:|\.\d+/g, "");

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Tareas Pendientes
DESCRIPTION:Tienes ${taskCount} tareas pendientes.
DTSTART:${dateFormat(startDate)}
DTEND:${dateFormat(endDate)}
END:VEVENT
END:VCALENDAR`;
}



//----------------------------------------------------------------------------------------------------------------------------------------------

const mostrarGraficoBtn = document.querySelector(
  ".mostrar-grafico-link"
);

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    buscarTask(searchInput.value);
  }
});

function buscarTask(search){
  const filterTasks = app.tasks.filter(task => task.title.toLowerCase().includes(search));
  taskListUl.innerHTML = "";
  filterTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskListUl.appendChild(taskElement);
  });
  searchInput.value = "";
}

let creado = 0;

const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskListUl = document.querySelector(".tasks-list-ul");
const contenedor = document.getElementById("grafico-container");

autoAnimate(taskListUl);

// Estado de la aplicación
const tasks = [];

// app es el objeto que almacena el estado de mi aplicación
const app = {
  tasks,
  newTaskInput,
  taskListUl,
};

// Funcion para crear una tarea
function createNewTask(title, isCompleted = false) {
  return {
    id: uuidv4().toString(),
    title,
    isCompleted,
  };
}

//funcion que añade un element <li> al <ul> generando un hijo nuevo.
function addTaskToList(task, tasksListUl) {
  // aqui mando a llamar a la funcioon que cree la tarea en html.
  const taskElement = createTaskElement(task);
  tasksListUl.appendChild(taskElement);
}

// ----- Creacion de los elementos en HTML de la tarea -----
// Funcion que genera el codigo li para insertarlo a la ul
function createTaskElement(task) {
  const taskElement = document.createElement("li");
  const taskCheckBox = document.createElement("input");
  taskCheckBox.type = "checkbox";
  taskCheckBox.checked = task.isCompleted;
  taskCheckBox.id = "taskCheckBox";

  const taskTitleElement = document.createElement("span");
  taskTitleElement.textContent = task.title;
  taskTitleElement.className = "taskTitle";

  // aqui pondria cambiar el color del texto si pulso el check

  const taskImptBtn = document.createElement("button");
  taskImptBtn.textContent = "Imprimir tarea";
  taskImptBtn.className = "imp-btn";
  taskImptBtn.id = "taskImpBtn";

  taskTitleElement.classList.toggle("completed", task.isCompleted);

  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.textContent = "Eliminar tarea";
  taskDeleteBtn.className = "delete-btn";
  taskDeleteBtn.id = "taskDeleteBtn";

  // Programo el elemnto de eliminar el checkbox
  taskDeleteBtn.addEventListener("click", () => {
    const taskIndex = app.tasks.indexOf(task);
    if (taskIndex > -1) {
      app.tasks.splice(taskIndex, 1);
      taskElement.remove();
      saveTasksToLocalStorage();
      crearGrafico(contenedor, app);
    }
  });

  // Programo el elemento de checkbox
  taskCheckBox.addEventListener("change", () => {
    task.isCompleted ? (task.isCompleted = false) : (task.isCompleted = true);
    taskTitleElement.classList.toggle("completed", task.isCompleted);
    contenedor.style.display = "flex"
    crearGrafico(contenedor, app);
  });

  taskImptBtn.addEventListener("click", () => {
    createPDF(task);
  });

  taskTitleElement.addEventListener("dblclick", (e) => {
    e.preventDefault();      
    const newTitle = prompt("Edita el titulo de la tarea: ", task.title);
    if(newTitle!== null){
      task.title = newTitle;
      taskTitleElement.textContent = newTitle;
      saveTasksToLocalStorage();
    }
  });
  
  taskElement.appendChild(taskCheckBox);
  taskElement.appendChild(taskTitleElement);
  taskElement.appendChild(taskImptBtn);
  taskElement.appendChild(taskDeleteBtn);

  return taskElement;
}

function addTask() {
  const newTaskTitle = app.newTaskInput.value;

  if (newTaskTitle && app.tasks.filter(task => task.title == newTaskTitle).length == 0) {
    const newTask = createNewTask(newTaskTitle);

    app.tasks.push(newTask);

    addTaskToList(newTask, app.taskListUl);

    app.newTaskInput.value = "";
  }else{
    app.newTaskInput.value = "";
    error(`Task ${newTaskTitle} already exists`, document.querySelector('.img-titulo'));
  }
}

// -------------- Eventos --------------

  // Funcion para mostrar grafico
  mostrarGraficoBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    
    const btn = document.getElementById("btn-grafico");

    if(creado == 0){

      contenedor.style.display = "flex";

      btn.style.background = "rgba(10, 240, 10, 0.3)";

      autoAnimate(contenedor);

      crearGrafico(contenedor, app);
      creado = 1;
    }
    
  });

  // Función para cargar tareas desde el localStorage al iniciar la aplicación
  function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON) {
      const storedTasks = JSON.parse(tasksJSON);
      app.tasks.push(...storedTasks);
      app.tasks.forEach(task => addTaskToList(task, app.taskListUl));
    }
  }
  
  // Función para guardar las tareas en el localStorage
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(app.tasks));
  }

  // Función para manejar cambios en el estado completado de una tarea
  function handleTaskCompletion(task, checkbox) {
    task.isCompleted = checkbox.checked;
    saveTasksToLocalStorage();
  }

  // ...
  
  // Evento para guardar tareas al agregar o eliminar una tarea
  addTaskBtn.addEventListener('click', () => {
    addTask();
    saveTasksToLocalStorage();
    contenedor.style.display = 'flex';
    crearGrafico(contenedor, app)
  });
  
  // Evento para cambiar el estado completado de una tarea
  taskListUl.addEventListener('change', (event) => {
    if (event.target.id === 'taskCheckBox') {
      const taskElement = event.target.parentNode;
      const taskId = taskElement.querySelector('span').textContent;
      const task = app.tasks.find(t => t.title === taskId);
  
      if (task) {
        handleTaskCompletion(task, event.target);
      }
    }
  });

  // ...
// -------------- Inicio de la aplicacion --------------
    // Evento para cargar tareas al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        loadTasksFromLocalStorage();
    });

    newTaskInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        addTask();
        saveTasksToLocalStorage();
        contenedor.style.display = 'flex';
        crearGrafico(contenedor, app)
      }
    })
// ...


  
