const form = document.getElementById("form-container");
const input = document.getElementById("task-input");

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
            body: JSON.stringify({task: taskValue})
        })
    } catch (err) {
        console.error(err);
    }
});

