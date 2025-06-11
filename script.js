const form = document.getElementById('todo-form');
const input = document.getElementById("todo-input");
const list = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button onclick="toggleTask(${index})">✔</button>
            <button onclick="removeTask(${index})">🗑</button>
        </div>
        `;

        list.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        tasks.push({ text, done: false });
        input.value = '';
        saveTasks();
        renderTasks();
    }
})

window.toggleTask = function (index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

window.removeTask = function (index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks()