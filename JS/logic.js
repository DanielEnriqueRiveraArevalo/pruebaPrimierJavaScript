(function () {
	// Variables
	var list = document.getElementById("list"),
		inputTasks = document.getElementById("inputTasks"),
		btnNewTasks = document.getElementById("btn-addTasks");

	// Funciones
	var loadTasks = function () {
		var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
		tasks.forEach(function (task) {
			addTaskToDOM(task);
		});
	};

	var saveTasks = function () {
		var tasks = [];
		for (var i = 0; i < list.children.length; i++) {
			tasks.push(list.children[i].textContent);
		}
		localStorage.setItem('tasks', JSON.stringify(tasks));
	};

	var addTask = function () {
		var tasks = inputTasks.value;
		if (tasks === "") {
			inputTasks.setAttribute("placeholder", "Por favor registrar una tarea válida");
			inputTasks.className = "error";
			return false;
		}

		addTaskToDOM(tasks);
		inputTasks.value = "";
		saveTasks();
	};

	var addTaskToDOM = function (task) {
		var newTasks = document.createElement("li"),
			link = document.createElement("a"),
			content = document.createTextNode(task);

		// Agregamos el contenido al enlace
		link.appendChild(content);
		// Le establecemos un atributo href
		link.setAttribute("href", "#");
		// Agregamos el enlace (a) a la nueva tarea (li)
		newTasks.appendChild(link);
		// Agregamos la nueva tarea a la lista
		list.appendChild(newTasks);

		// Añadir evento de eliminación a la nueva tarea
		link.addEventListener("click", deleteTask);
	};

	var checkInput = function () {
		inputTasks.className = "";
		inputTasks.setAttribute("placeholder", "Por favor registrar su tarea");
	};

	var deleteTask = function (event) {
		event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
		if (window.confirm('¿Desea eliminar la tarea?')) {
			this.parentNode.removeChild(this);
			saveTasks();
		}
	};

	// Eventos

	// Agregar Tarea
	btnNewTasks.addEventListener("click", addTask);

	// Comprobar Input
	inputTasks.addEventListener("click", checkInput);

	// Cargar tareas al cargar la página
	document.addEventListener('DOMContentLoaded', loadTasks);
}());