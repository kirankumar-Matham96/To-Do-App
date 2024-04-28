// dom elements
const addBtn = document.querySelector(".add-btn");
const mainInputEl = document.querySelector(".main-input");
const taskListContainerEl = document.querySelector(".list-container");
const tasksCountEl = document.querySelector("#tasks-count");
const allBtn = document.querySelector(".all-btn");
const incompleteBtn = document.querySelector(".incomplete-btn");
const completedBtn = document.querySelector(".completed-btn");

let tab = "All";

allBtn.addEventListener("click", () => {
  tab = "All";
  allBtn.classList.add("active");
  incompleteBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  renderAllTasks();
});

incompleteBtn.addEventListener("click", () => {
  tab = "Incomplete";
  allBtn.classList.remove("active");
  incompleteBtn.classList.add("active");
  completedBtn.classList.remove("active");
  renderIncompleteTasks();
});

completedBtn.addEventListener("click", () => {
  tab = "Completed";
  allBtn.classList.remove("active");
  incompleteBtn.classList.remove("active");
  completedBtn.classList.add("active");
  renderCompletedTasks();
});

let tasksListArr = [];

let taskNumber = 0;

// to remove the relevant task element
function removeTask(taskId) {
  document.querySelector(`#${taskId}`).remove();
  console.log("before: ", tasksListArr);
  tasksListArr = tasksListArr.filter((item) => item.id !== taskId);
  console.log("after: ", tasksListArr);
  // tasksCountEl.textContent = taskNumber;
}

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

    // <button class="remove-btn" onclick="removeTask(${task.id})">
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
    tasksCountEl.textContent = getIncompleteTasks().length;
    mainInputEl.value = "";
  });
}

function renderCompletedTasks() {
  const completedTasksArr = getCompleteTasks();
  taskListContainerEl.innerHTML = "";
  completedTasksArr.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.setAttribute("id", `div-${task.id}`);

    if (task.isCompleted) {
      taskEl.classList.add("task", "stroked");
    } else {
      taskEl.classList.add("task");
    }

    taskEl.innerHTML = `<div class="task-details">
      <div class="radio ${task.isCompleted && "bg-completed"}"></div>
      <p>${task.data}</p>
      </div>
      <button class="remove-btn" onclick="removeTask('div-${task.id}')">
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
    tasksCountEl.textContent = completedTasksArr.length;
    mainInputEl.value = "";
  });
}

function renderIncompleteTasks() {
  const incompleteTasksArr = getIncompleteTasks();
  taskListContainerEl.innerHTML = "";
  incompleteTasksArr.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.setAttribute("id", `div-${task.id}`);

    if (task.isCompleted) {
      taskEl.classList.add("task", "stroked");
    } else {
      taskEl.classList.add("task");
    }

    taskEl.innerHTML = `<div class="task-details">
      <div class="radio ${task.isCompleted && "bg-completed"}"></div>
      <p>${task.data}</p>
      </div>
      <button class="remove-btn" onclick="removeTask('div-${task.id}')">
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
    tasksCountEl.textContent = incompleteTasksArr.length;
    mainInputEl.value = "";
  });
}

function createTask(value) {
  taskNumber++;
  // creating the task object to track
  const task = { id: `div-${taskNumber}`, data: value, isCompleted: false };
  // pushing the task to the array
  tasksListArr.push(task);
}

addBtn.addEventListener("click", () => {
  if (mainInputEl.value.trim() != "") {
    // addTask(mainInputEl.value);
    createTask(mainInputEl.value);
    renderAllTasks();
  } else {
    alert("Please enter something to create a task!");
  }
});

mainInputEl.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    if (mainInputEl.value.trim() != "") {
      // debugger;
      createTask(mainInputEl.value);
      renderAllTasks(); //addTask(event.target.value)
    } else {
      alert("Please enter something to create a task!");
    }
  }
});
