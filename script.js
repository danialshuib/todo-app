const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value.trim() !== "") {
    addTask(input.value.trim());
    input.value = "";
  }
});

// Add task to DOM and localStorage
function addTask(text, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button onclick="toggleComplete(this)">✔</button>
      <button onclick="deleteTask(this)">✖</button>
    </div>
  `;

  list.appendChild(li);
  saveTasks();
}

// Toggle complete status
function toggleComplete(btn) {
  const li = btn.closest("li");
  li.classList.toggle("completed");
  saveTasks();
}

// Delete task
function deleteTask(btn) {
  const li = btn.closest("li");
  li.remove();
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  list.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").innerText;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTask(task.text, task.completed));
}
