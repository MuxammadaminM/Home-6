document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addTodoButton').addEventListener('click', addTodo);
    loadTodos();
});

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoName = todoInput.value.trim();
    if (todoName) {
        const now = new Date();
        const todo = {
            id: Date.now(),
            name: todoName,
            time: now.toLocaleTimeString('en-GB')
        };
        todos.push(todo);
        saveTodos();
        displayTodos();
        todoInput.value = '';
    }
}

function displayTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todoItem';
        todoItem.innerHTML = `
            ${todo.name} <span class="time">${todo.time}</span>
            <button class="deleteButton" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(todoItem);
    });
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    displayTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    displayTodos();
}
