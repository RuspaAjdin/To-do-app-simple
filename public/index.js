const form = document.getElementById("form-container");
const input = document.getElementById("task-input");
const taskContainer = document.getElementById("task-container");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const taskValue = input.value.trim();
    if (taskValue.length == 0) {
        console.log("Input is empty");
        return;
    }
    try {
        const response = await fetch("/api/task", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskValue })
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error('Sending data wasnt successful');
        }
        input.value = "";
        displayTasks();
    } catch (err) {
        console.error(err);
    }
});

async function displayTasks() {
    try {
        const response = await fetch('/api/task');
        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to load tasks');
        }

        taskContainer.innerHTML = "";

        data.taskData.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-div');

            const taskParagraph = document.createElement('p');
            taskParagraph.textContent = task.task;

            taskDiv.appendChild(taskParagraph);
            taskContainer.appendChild(taskDiv);
        });

    } catch (err) {
        console.error(err);
    }
}

displayTasks();