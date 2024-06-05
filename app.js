const buttonElement = document.querySelector('.tasks__add');
const taskList = document.querySelector('.tasks__list');
const taskInput = document.querySelector('.tasks__input');
const buttonClear = document.querySelector('.header__link');

function createTask(taskInput) {
    const taskValue = taskInput.value;

    // Проверка на пустую строку
    if (taskValue.trim() === '') {
        alert('Пожалуйста, введите название задачи.');
        return;
    }

    // Проверка на дубликат задачи
    const taskTitles = Array.from(document.querySelectorAll('.task__title'));
    for (let i = 0; i < taskTitles.length; i++) {
        if (taskTitles[i].textContent === taskValue) {
            alert('Такая задача уже есть в списке.');
            return;
        }
    }

    addTask(taskValue);
    taskInput.value = '';
    updateLocalStorage();
}

buttonElement.addEventListener("click", function (evt) {
    evt.preventDefault();
    createTask(taskInput);
});

taskInput.addEventListener("keydown", function (evt) {
    if (evt.key === 'Enter') {
        evt.preventDefault();
        createTask(taskInput);
    }
});

function addTask(taskValue) {
    const task = document.createElement('div');
    task.classList.add('task');

    const title = document.createElement('div');
    title.classList.add('task__title');
    title.textContent = taskValue;
    task.appendChild(title);

    const removeButton = document.createElement('a');
    removeButton.href = '#';
    removeButton.classList.add('task__remove');
    removeButton.textContent = '×';
    task.appendChild(removeButton);

    removeButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        task.remove();
        updateLocalStorage();
    });

    taskList.appendChild(task);
}

buttonClear.addEventListener('click', function (evt) {
    evt.preventDefault();
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
});

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('.task__title')).map(title => title.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Восстановление задач при загрузке страницы
window.addEventListener('DOMContentLoaded', (event) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
});
