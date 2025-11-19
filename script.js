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
}
