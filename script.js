let todos = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const todolist = document.getElementById("todolist");
    const taskDiv = document.createElement("div");
    taskDiv.className = "listContent";

    const checkboxDiv = document.createElement("div");
    checkboxDiv.className = "checkbox";
    checkboxDiv.innerHTML = '<div class="check"><img src="./assets/icon-check.svg" /></div>';

    const textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.innerHTML = `<p>${taskText}</p>`;

    const delDiv = document.createElement("div");
    delDiv.className = "del";
    delDiv.innerHTML = '<img src="./assets/icon-cross.svg" />';

    taskDiv.appendChild(checkboxDiv);
    taskDiv.appendChild(textDiv);
    taskDiv.appendChild(delDiv);

    todolist.appendChild(taskDiv);


    checkboxDiv.addEventListener("click", () => completeTask(taskDiv));
    delDiv.addEventListener("click", () => deleteTask(taskDiv));

    todos.push({ text: taskText, completed: false });

    taskInput.value = "";
    updateTaskCount();
}

function completeTask(task) {
    task.classList.toggle("completed");

    const span = task.querySelector("p");

    const taskText = span.textContent;
    const index = todos.findIndex(todo => todo.text === taskText);
    if (index !== -1) {
        todos[index].completed = !todos[index].completed;

        if (todos[index].completed) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }
    }

    updateTaskCount();
}

function deleteTask(task) {
    const todolist = document.getElementById("todolist");
    const span = task.querySelector("p");
    const taskText = span.textContent;


    const index = todos.findIndex(todo => todo.text === taskText);
    if (index !== -1) {
        todos.splice(index, 1);
    }


    todolist.removeChild(task);

    updateTaskCount();
}

function filterTasks(filter) {
    const todolist = document.getElementById("todolist");
    const tasks = todolist.getElementsByClassName("listContent");

    for (const task of tasks) {
        const isCompleted = task.classList.contains("completed");
        if (filter === "all" || (filter === "active" && !isCompleted) || (filter === "completed" && isCompleted)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    }


    const filterButtons = document.querySelectorAll(".filter");
    filterButtons.forEach(button => button.classList.remove("active"));
    document.getElementById(filter + "Btn").classList.add("active");

    updateTaskCount();
}

function clearCompleted() {
    const todolist = document.getElementById("todolist");
    const completedTasks = todolist.getElementsByClassName("completed");

    while (completedTasks.length > 0) {
        todolist.removeChild(completedTasks[0]);
    }


    todos = todos.filter(todo => !todo.completed);
    updateTaskCount();
}

function updateTaskCount() {
    const itemsLeft = document.getElementById("itemsleft");
    const totalTasks = todos.length;
    const incompleteTasks = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `Task (${incompleteTasks})`;
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const backgroundImage = document.querySelector(".backgroundImg img");
    const listContents = document.querySelectorAll(".listContent");
    const addButton = document.querySelector(".newTodo button");
    const todoInfo = document.querySelector(".todoInfo");
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    const tasks = document.querySelectorAll(".task");
    for (const task of tasks) {
        task.classList.toggle("dark-mode");
        task.classList.toggle("light-mode");
    }

    const taskInput = document.getElementById("taskInput");
    taskInput.classList.toggle("dark-mode");
    taskInput.classList.toggle("light-mode");

    for (const listContent of listContents) {
        listContent.classList.toggle("light-mode");
        listContent.classList.toggle("dark-mode");
        listContent.style.backgroundColor = body.classList.contains("light-mode") ? "white" : "rgb(45, 51, 45)";
        listContent.style.color = body.classList.contains("light-mode") ? "rgb(45, 51, 45)" : "white";
    }

    if (body.classList.contains("dark-mode")) {
        themeToggle.src = "./assets/icon-sun.svg";
        backgroundImage.src = "./assets/bg-desktop-dark.jpg";
        addButton.style.backgroundColor = "#333";
        addButton.style.color = "white";
        todoInfo.style.backgroundColor = "rgb(45, 51, 45)";
        todoInfo.style.border = "1px solid rgb(67 67 67)";
    } else {
        themeToggle.src = "./assets/icon-moon.svg";
        backgroundImage.src = "./assets/bg-desktop-light.jpg";
        addButton.style.backgroundColor = "white";
        addButton.style.color = "#333";
        todoInfo.style.backgroundColor = "white";
        todoInfo.style.border = "1px solid rgb(219, 218, 218)";
    }
}

