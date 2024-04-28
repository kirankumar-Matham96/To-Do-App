// dom elements
const addBtn = document.querySelector(".add-btn");
const mainInputEl = document.querySelector(".main-input");
const taskListContainerEl = document.querySelector(".list-container");
let taskNumber = 0;

function removeTask() {
  // remove the relevant task element
}

function addTask(value) {
  taskNumber++;

  const taskEl = document.createElement("div");

  taskEl.className = "task";

  taskEl.innerHTML = `<label for="${taskNumber}" class="task-data">
  <div class="task-details" id="${taskNumber}">
  <div class="radio"></div>
  <p>${value}</p>
  </div>
  </label>
  <button class="remove-btn" onclick="removeTask()">
  <i class="fa-regular fa-circle-xmark"></i>
  </button>`;

  // to stop the event propagation for the remove button
  taskEl.querySelector(".remove-btn").addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // to strike the completed tasks
  taskEl.addEventListener("click", () => {
    if (!taskEl.classList.contains("stroked")) {
      taskEl.querySelector(".radio").classList.add("bg-completed");
      taskEl.classList.add("stroked");
    }
  });

  taskListContainerEl.appendChild(taskEl);
  mainInputEl.value = "";
}

addBtn.addEventListener("click", () => {
  if (mainInputEl.value.trim() != "") {
    addTask(mainInputEl.value);
  } else {
    alert("Please enter something to create a task!");
  }
});

mainInputEl.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    mainInputEl.value.trim() != ""
      ? addTask(event.target.value)
      : alert("Please enter something to create a task!");
  }
});
