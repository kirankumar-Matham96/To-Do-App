// dom elements
const addBtn = document.querySelector(".add-btn");
const mainInputEl = document.querySelector(".main-input");
const taskListContainerEl = document.querySelector(".list-container");
const tasksCountEl = document.querySelector("#tasks-count");
const allBtn = document.querySelector(".all-btn");
const incompleteBtn = document.querySelector(".incomplete-btn");
const completedBtn = document.querySelector(".completed-btn");
const completedAllTasksBtn = document.querySelector(".complete-all-btn");
const clearCompletedBtn = document.querySelector(".clear-btn");

let tab = "All";
let tasksListArr = [];
let taskNumber = 0;

// to remove the relevant task element
function removeTask(taskId) {
  document.querySelector(`#${taskId}`).remove();
  tasksListArr = tasksListArr.filter((item) => item.id !== taskId);
  tasksCountEl.textContent = tasksListArr.length;
}

// to get the completed tasks
function getCompleteTasks() {
  const completedTasks = tasksListArr.filter((taskItem) => {
    if (taskItem.isCompleted === true) {
      return true;
    } else {
      return false;
    }
  });

  return completedTasks;
}

// to get the incomplete tasks
function getIncompleteTasks() {
  const inCompleteTasks = tasksListArr.filter((taskItem) => {
    if (taskItem.isCompleted !== true) {
      return true;
    } else {
      return false;
    }
  });

  return inCompleteTasks;
}

// to render all the tasks
function renderAllTasks() {
  taskListContainerEl.innerHTML = "";
  tasksListArr.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.setAttribute("id", `${task.id}`);

    if (task.isCompleted) {
      taskEl.classList.add("task", "stroked");
    } else {
      taskEl.classList.add("task");
    }

    taskEl.innerHTML = `<div class="task-details">
    <div class="radio ${task.isCompleted && "bg-completed"}"></div>
    <p>${task.data}</p>
    </div>
    <button class="remove-btn" onclick="removeTask('${task.id}')">
      <i class="fa-regular fa-circle-xmark"></i>
      </button>`;

    // to stop the event propagation for the remove button
    taskEl.querySelector(".remove-btn").addEventListener("click", (event) => {
      event.stopPropagation();
    });

    // to strike the completed tasks
    taskEl.addEventListener("click", (event) => {
      if (!taskEl.classList.contains("stroked")) {
        taskEl.querySelector(".radio").classList.add("bg-completed");
        taskEl.classList.add("stroked");
        const currentTask = tasksListArr.find(
          (taskItem) => taskItem.id == task.id
        );
        currentTask.isCompleted = true;
        renderAllTasks();
      }
    });
    taskListContainerEl.appendChild(taskEl);
    mainInputEl.value = "";
  });
  console.log("in all render: ", tasksListArr);
  tasksCountEl.textContent = tasksListArr.length;
}

// to render completed tasks
function renderCompletedTasks() {
  const completedTasksArr = getCompleteTasks();
  taskListContainerEl.innerHTML = "";
  completedTasksArr.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.setAttribute("id", `${task.id}`);

    if (task.isCompleted) {
      taskEl.classList.add("task", "stroked");
    } else {
      taskEl.classList.add("task");
    }

    taskEl.innerHTML = `<div class="task-details">
      <div class="radio ${task.isCompleted && "bg-completed"}"></div>
      <p>${task.data}</p>
      </div>
      <button class="remove-btn" onclick="removeTask('${task.id}')">
      <i class="fa-regular fa-circle-xmark"></i>
      </button>`;

    // to stop the event propagation for the remove button
    taskEl.querySelector(".remove-btn").addEventListener("click", (event) => {
      event.stopPropagation();
    });

    // to strike the completed tasks
    taskEl.addEventListener("click", (event) => {
      if (!taskEl.classList.contains("stroked")) {
        taskEl.querySelector(".radio").classList.add("bg-completed");
        taskEl.classList.add("stroked");
        const currentTask = tasksListArr.find(
          (taskItem) => taskItem.id == task.id
        );
        currentTask.isCompleted = true;
        renderIncompleteTasks();
      }
    });
    taskListContainerEl.appendChild(taskEl);
    mainInputEl.value = "";
  });
  tasksCountEl.textContent = completedTasksArr.length;
}

// to render incomplete tasks
function renderIncompleteTasks() {
  const incompleteTasksArr = getIncompleteTasks();
  taskListContainerEl.innerHTML = "";
  incompleteTasksArr.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.setAttribute("id", `${task.id}`);

    if (task.isCompleted) {
      taskEl.classList.add("task", "stroked");
    } else {
      taskEl.classList.add("task");
    }

    taskEl.innerHTML = `<div class="task-details">
      <div class="radio ${task.isCompleted && "bg-completed"}"></div>
      <p>${task.data}</p>
      </div>
      <button class="remove-btn" onclick="removeTask('${task.id}')">
      <i class="fa-regular fa-circle-xmark"></i>
      </button>`;

    // to stop the event propagation for the remove button
    taskEl.querySelector(".remove-btn").addEventListener("click", (event) => {
      event.stopPropagation();
    });

    // to strike the completed tasks
    taskEl.addEventListener("click", (event) => {
      if (!taskEl.classList.contains("stroked")) {
        taskEl.querySelector(".radio").classList.add("bg-completed");
        taskEl.classList.add("stroked");
        const currentTask = tasksListArr.find(
          (taskItem) => taskItem.id == task.id
        );
        currentTask.isCompleted = true;
        renderIncompleteTasks();
      }
    });
    taskListContainerEl.appendChild(taskEl);
    mainInputEl.value = "";
  });
  tasksCountEl.textContent = incompleteTasksArr.length;
}

// to create a new task
function createTask(value) {
  taskNumber++;
  // creating the task object to track
  const task = { id: `div-${taskNumber}`, data: value, isCompleted: false };
  // pushing the task to the array
  tasksListArr.push(task);
}

/* event listeners */
// event listener to create a new task with button
addBtn.addEventListener("click", () => {
  if (mainInputEl.value.trim() != "") {
    createTask(mainInputEl.value);
    renderAllTasks();
  } else {
    alert("Please enter something to create a task!");
  }
});

// event listener to create a new task with 'enter' key press
mainInputEl.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    if (mainInputEl.value.trim() != "") {
      createTask(mainInputEl.value);
      renderAllTasks();
    } else {
      alert("Please enter something to create a task!");
    }
  }
});

// event listener to complete all tasks with button
completedAllTasksBtn.addEventListener("click", () => {
  tasksListArr.forEach((item) => {
    item.isCompleted = true;
  });
  if (tab === "All") {
    renderAllTasks();
  } else if (tab === "Incomplete") {
    renderIncompleteTasks();
  }
});

// event listener to clear all the completed tasks with button
clearCompletedBtn.addEventListener("click", () => {
  tasksListArr = tasksListArr.filter((item) => item.isCompleted !== true);
  if (tab === "All") {
    renderAllTasks();
  } else if (tab === "Completed") {
    renderCompletedTasks();
  }
});

// event listener to render all the tasks
allBtn.addEventListener("click", () => {
  tab = "All";
  allBtn.classList.add("active");
  incompleteBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  renderAllTasks();
});

// event listener to render incomplete tasks
incompleteBtn.addEventListener("click", () => {
  tab = "Incomplete";
  allBtn.classList.remove("active");
  incompleteBtn.classList.add("active");
  completedBtn.classList.remove("active");
  renderIncompleteTasks();
});

// event listener to render completed tasks
completedBtn.addEventListener("click", () => {
  tab = "Completed";
  allBtn.classList.remove("active");
  incompleteBtn.classList.remove("active");
  completedBtn.classList.add("active");
  renderCompletedTasks();
});
