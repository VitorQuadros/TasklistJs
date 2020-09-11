const inputTask = document.querySelector('.input-new-task');
const btnTask = document.querySelector('.add-task');
const tasks = document.querySelector('.tasks')

function createLi() {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e) {
    if (e.keyCode === 13){
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createDeleteButton(li) {
    li.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'delete');
    deleteButton.setAttribute('title', 'Remove this task');
    li.appendChild(deleteButton);
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li)
    clearInput();
    createDeleteButton(li);
    saveTasks();
}

btnTask.addEventListener('click', function () {
    if (!inputTask.value) return;
    createTask(inputTask.value)
});

document.addEventListener('click', function(e) {
    const element = e.target;
    if (element.classList.contains('delete')) {
        element.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const liTasks = document.querySelectorAll('li');
    const tasksList = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        tasksList.push(taskText);
    }

    const tasksJSON = JSON.stringify(tasksList);
    localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const tasksList = JSON.parse(tasks);
    for (let task of tasksList) {
        createTask(task);
    }
}

addSavedTasks();