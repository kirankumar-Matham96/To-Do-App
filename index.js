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

  taskEl.innerHTML = `<div class="task-details">
  <label for="task-radio-${taskNumber}" class="task-data">
  <input type="radio" class="task-radio-input" id="task-radio-${taskNumber}" />
  <p>${value}</p>
  </label>
  </div>
  <button class="remove-btn" onclick="removeTask()">
  <i class="fa-regular fa-circle-xmark"></i>
  </button>`;
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
  if (event.key == "Enter" && mainInputEl.value.trim() != "") {
    addTask(event.target.value);
  } else {
    alert("Please enter something to create a task!");
  }
});
