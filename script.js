const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateEmptyState();
});

// Add task when pressing Enter key
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = inputBox.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    
    createTaskElement(taskText);
    inputBox.value = "";
    inputBox.focus();
    saveTasks();
    updateEmptyState();
}

function createTaskElement(taskText) {
    let li = document.createElement("li");
    
    // Create span for task text
    let span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = toggleCompleted;
    
    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = deleteTask;
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
}

function toggleCompleted(e) {
    const li = e.target.closest("li");
    li.classList.toggle("completed");
    saveTasks();
}

function deleteTask(e) {
    const li = e.target.closest("li");
    li.style.animation = "popOut 0.4s ease forwards";
    setTimeout(() => {
        li.remove();
        saveTasks();
        updateEmptyState();
    }, 400);
}

function saveTasks() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        const isCompleted = li.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text);
        if (task.completed) {
            listContainer.lastChild.classList.add("completed");
        }
    });
}

function updateEmptyState() {
    if (listContainer.children.length === 0) {
        emptyState.classList.add("show");
    } else {
        emptyState.classList.remove("show");
    }
}
