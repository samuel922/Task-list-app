const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault()

    const description = document.getElementById('description').value;

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(description)

    localStorage.setItem('tasks', JSON.stringify(tasks))
})