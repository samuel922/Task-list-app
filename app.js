const form = document.getElementById('task-form');
const inputField = document.getElementById('task');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter')
const lists = document.querySelector('.collection')

//Load Event Listeners
loadEventListeners()

//Load Event Listeners Function
function loadEventListeners() {
    //Add task
    form.addEventListener('submit', addTask)
    //Delete task
    lists.addEventListener('click', removeTask);
    //Clear task
    clearTasks.addEventListener('click', clearTask);
    //Filter tasks
    filter.addEventListener('keyup', filterTask);
}

//Add Task function
function addTask(e) {

    if (inputField.value === "") {
        alert("Input value required");
    }
    //Create a li
    const li = document.createElement('li')
    //Add a class to li
    li.className = 'collection-item'
    //Create text node and append to li
    li.appendChild(document.createTextNode(inputField.value))
    //Create link
    const link = document.createElement('a');
    //Add class to link
    link.className = 'delete-item secondary-content';
    //Add delete icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link)
    //Append li to collection
    lists.appendChild(li)

    inputField.value = ""

    e.preventDefault()
}

function removeTask(e) {
    console.log(e.target)
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove()
    }
}

function clearTask() {
    while(lists.firstChild) {
        lists.removeChild(lists.firstChild)
    }
}

function filterTask(e) {
    const text = e.target.value;
    console.log(text)

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}