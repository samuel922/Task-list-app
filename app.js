const inputValue = document.getElementById('task');
const form = document.getElementById('task-form');
const filter = document.getElementById('filter');
const list = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add tasks
    form.addEventListener('submit', addTasks);
    //Delete Task
    list.addEventListener('click', deleteTask);
    //Clear Tasks
    clearTask.addEventListener('click', clearAllTasks)
    //Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

//Get tasks
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //Create dom element
        //Create an li
        const li = document.createElement('li');
        //Add a class to li
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));
        //Create a link tag
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Create html for link
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link)

        //Append li to list
        list.appendChild(li)
        })
    }

//Add Tasks function
function addTasks(e) {
    if (inputValue.value === "") {
        alert("Please input a value")
    }
    //Create an li
    const li = document.createElement('li');
    //Add a class to li
    li.className = 'collection-item';

    li.appendChild(document.createTextNode(inputValue.value));
    //Create a link tag
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Create html for link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link)

    //Append li to list
    list.appendChild(li)

    //Persist data
    storeInLocalStorage(inputValue.value);

    inputValue.value = "";

    e.preventDefault()
}

//Store data
function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove()

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index,1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear all tasks
function clearAllTasks() {
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }

    //Clear tasks from LS
    clearTasksFromLS();
}

function clearTasksFromLS() {
    localStorage.clear()
}

function filterTasks(e) {
    const text = e.target.value;

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = "none"
        }
    })
        
}


