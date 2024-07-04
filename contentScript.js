document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoTable = document.getElementById('todo-table').getElementsByTagName('tbody')[0];
    const noRecords = document.getElementById('no-records');
    const submitButton = document.getElementById('submit-button');
    let tasks = [];
    let editIndex = -1;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const heading = document.getElementById('heading').value.trim();
        const description = document.getElementById('description').value.trim();
        let valid = true;

        if (!heading) {
            document.getElementById('heading-error').textContent = "Heading is required.";
            valid = false;
        } else {
            document.getElementById('heading-error').textContent = "";
        }

        if (!description) {
            document.getElementById('description-error').textContent = "Description is required.";
            valid = false;
        } else {
            document.getElementById('description-error').textContent = "";
        }

        if (!valid) {
            return;
        }

        if (editIndex === -1) {
            addTask(heading, description);
        } else {
            updateTask(editIndex, heading, description);
        }

        form.reset();
        submitButton.textContent = "Add Task";
        editIndex = -1;
    });

    function addTask(heading, description) {
        const task = {
            id: Date.now(),
            heading,
            description
        };
        tasks.push(task);
        renderTasks();
    }

    function updateTask(index, heading, description) {
        tasks[index].heading = heading;
        tasks[index].description = description;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function renderTasks() {
        todoTable.innerHTML = '';
        tasks.forEach((task, index) => {
            const row = todoTable.insertRow();
            const headingCell = row.insertCell(0);
            const descriptionCell = row.insertCell(1);
            const actionsCell = row.insertCell(2);

            headingCell.textContent = task.heading;
            descriptionCell.textContent = task.description;
            actionsCell.innerHTML = `
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
        });

        checkNoRecords();
    }

    function checkNoRecords() {
        if (tasks.length === 0) {
            noRecords.style.display = 'block';
        } else {
            noRecords.style.display = 'none';
        }
    }

    window.editTask = function(index) {
        const task = tasks[index];
        document.getElementById('heading').value = task.heading;
        document.getElementById('description').value = task.description;

        submitButton.textContent = "Edit Task";
        editIndex = index;
    };

    window.deleteTask = function(index) {
        deleteTask(index);
    };

    checkNoRecords();
});
