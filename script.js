function addTask() {
  const input = document.getElementById("taskInput");
  const inputText = input.value.trim();
  if (inputText === "") return;
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = inputText;
  span.onclick = function () {
    li.classList.toggle("completed");
  };
  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";

  deletebtn.onclick = function () {
    li.remove();
  };
  li.appendChild(span);
  li.appendChild(deletebtn);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}
