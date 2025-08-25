const addTaskButton = document.getElementById('addTaskButton');
const loadTaskButton = document.getElementById('loadTaskButton');
const saveTaskButton = document.getElementById('saveTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add a task
function addTask(taskText = null) {
    // If no text passed, take it from the input
    const text = taskText ? taskText : taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    // Create list item
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save updated status
    });

    // Task name
    const taskName = document.createElement('span');
    taskName.textContent = text;

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    // Append to item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    // Clear input
    taskInput.value = '';
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        const text = item.querySelector('span').textContent;
        const completed = item.classList.contains('completed');
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    taskList.innerHTML = '';
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            taskList.lastChild.classList.add('completed');
            taskList.lastChild.querySelector('input').checked = true;
        }
    });
}

// Event listeners — fixed so we don't get PointerEvent issue
addTaskButton.addEventListener('click', () => addTask());
saveTaskButton.addEventListener('click', saveTasks);
loadTaskButton.addEventListener('click', loadTasks);

// Allow Enter key to add tasks
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Auto-load tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);
