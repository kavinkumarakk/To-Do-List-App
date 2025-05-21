// function addTask() {
//   const input = document.getElementById("taskInput");
//   const inputText = input.value.trim();
//   if (inputText === "") return;
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   span.textContent = inputText;
//   span.onclick = function () {
//     li.classList.toggle("completed");
//   };
//   const deletebtn = document.createElement("button");
//   deletebtn.textContent = "Delete";

//   deletebtn.onclick = function () {
//     li.remove();
//   };
//   li.appendChild(span);
//   li.appendChild(deletebtn);
//   document.getElementById("taskList").appendChild(li);
//   input.value = "";
// }

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const dueDate = document.getElementById("dueDateInput").value;
  if (!text) return;

  tasks.push({ text, dueDate, completed: false });
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDateInput").value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  list.innerHTML = "";

  const sortedTasks = [...tasks].sort(
    (a, b) =>
      new Date(a.dueDate || "2100-01-01") - new Date(b.dueDate || "2100-01-01")
  );

  sortedTasks.forEach((task, index) => {
    if (task.text.toLowerCase().includes(search)) {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";

      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <div onclick="toggleComplete(${index})" style="cursor:pointer;">
          <span>${task.text}</span>
          ${
            task.dueDate
              ? `<small class="text-muted ms-2">[${task.dueDate}]</small>`
              : ""
          }
        </div>
        <div>
          <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      list.appendChild(li);
    }
  });
}

window.onload = renderTasks;
