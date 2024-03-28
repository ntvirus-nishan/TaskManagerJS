//Global variable
const closeBtn = document.querySelector(".close");
const formBox = document.querySelector(".form-box");
const backDrop = document.querySelector("#modalBackdrop");

//Showing form model
function showModal() {
  formBox.style.display = "block";
  backDrop.style.display = "block";
}

//Form close event
closeBtn.addEventListener("click", () => {
  formBox.style.display = "none";
  backDrop.style.display = "none";
});

// Global variable for input element  in the form
//Array to store tasks
let tasks = [];
let titleEl = document.querySelector("#title");
let categoryEl = document.querySelector("#category");
let descriptionEl = document.querySelector("#description");
let priorityEl = document.querySelector("#priority");
let deadlineEl = document.getElementById("deadline");
let addTaskBtn = document.getElementById("addTaskBtn");
let editBtn = document.getElementById("editBtn");
let taskForm = document.getElementById("taskForm");

//Handling form event
addTaskBtn.onclick = function (e) {
  e.preventDefault();
  addTask();
  displayTask();
  totalTasks();
};
if (localStorage.getItem("Tasks") != null) {
  tasks = JSON.parse(localStorage.getItem("Tasks"));
  displayTask();
}
//Creating Function to addTask
function addTask() {
  //Create task object push object into the tasks array
  tasks.push({
    title: titleEl.value,
    category: categoryEl.value,
    description: descriptionEl.value,
    priority: priorityEl.value,
    deadline: deadlineEl.value,
    completed: false,
  });
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("Tasks", tasksString);
  // formBox.style.display = "none";
  // backDrop.style.display = "none";
  taskForm.reset();
}

// Function to display tasks in table
function displayTask() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskRow = document.createElement("tr");
    taskRow.innerHTML = `
    <td>${task.title}</td>
    <td>${task.description}</td>
    <td>${task.category}</td>
    <td>${task.priority}</td>
    <td>${task.deadline}</td>
    <td class="action-td">
      <button id="editBtn" class="actionBtn" onclick="editTask(${index})">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button id="delBtn" class="actionBtn"
      onclick="deleteTask(${index})">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </td>`;
    taskRow.className = task.completed ? "completed" : "";
    taskRow.onclick = function () {
      toogleCompleted(task);
    };
    taskList.appendChild(taskRow);
  });
  //function to calculate total task and completed task
  calculateTask();
}
//Toogle to completed task
function toogleCompleted(task) {
  task.completed = !task.completed;
  displayTask();
}
//search task function start
function filterTasks() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  let filteredTask = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchInput) ||
      task.priority.toLowerCase().includes(searchInput) ||
      task.description.toLowerCase().includes(searchInput) ||
      task.category.toLowerCase().includes(searchInput) ||
      task.deadline.toLowerCase().includes(searchInput)
    );
  });

  updateTaskWithFilter(filteredTask);
}
//End search task function
function updateTaskWithFilter(filteredTask) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  filteredTask.forEach((task, index) => {
    const taskRow = document.createElement("tr");
    taskRow.innerHTML = `
    <td>${task.title}</td>
    <td>${task.description}</td>
    <td>${task.category}</td>
    <td>${task.priority}</td>
    <td>${task.deadline}</td>
    <td class="action-td">
      <button id="editBtn" class="actionBtn" onclick="editTask(${index})">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button id="delBtn" class="actionBtn"
      onclick="deleteTask(${index})">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </td>`;
    taskRow.className = task.completed ? "completed" : "";
    taskRow.onclick = function () {
      toogleCompleted(task);
    };
    taskList.appendChild(taskRow);
  });
  //function to calculate total task and completed task
  calculateTask();
}

function editTask(index) {
  const taskToEdit = tasks[index];
  // console.log(taskToEdit);
  titleEl.value = taskToEdit.title;
  categoryEl.value = taskToEdit.category;
  descriptionEl.value = taskToEdit.description;
  priorityEl.value = taskToEdit.priority;
  deadlineEl.value = taskToEdit.deadline;
  showModal();

  addTaskBtn.onclick = function (e) {
    e.preventDefault();
    updateTask(index);
    taskForm.reset("");
  };
}

// Function to update a task
function updateTask(index) {
  // Update the task object in the tasks array based on the provided index
  tasks[index] = {
    title: titleEl.value,
    category: categoryEl.value,
    description: descriptionEl.value,
    priority: priorityEl.value,
    deadline: deadlineEl.value,
    completed: false,
  };

  // Update local storage
  localStorage.setItem("Tasks", JSON.stringify(tasks));

  // Update display
  displayTask();
}
//calculate total and completed task
function calculateTask(task) {
  const totalTask = document.getElementById("totalTask");
  const completedTask = document.getElementById("completed");
  let count = tasks.length;
  //using accumulator
  let completed = tasks.reduce((accumulator, task) => {
    return task.completed ? accumulator + 1 : accumulator;
  }, 0);

  totalTask.innerText = count;
  completedTask.innerText = completed;
}

// Function to delete a task
function deleteTask(index) {
  // Remove task from tasks array
  tasks.splice(index, 1);

  // Update local storage
  localStorage.setItem("Tasks", JSON.stringify(tasks));

  // Update display
  displayTask();
}
