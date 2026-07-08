import express from 'express';
import fs from 'node:fs/promises';

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

async function checkFile() {
    try {
        await fs.readFile('storage.json', 'utf-8');
    } catch (err) {
        console.warn("First run or file doesnt exist, creating new");
        await fs.writeFile('storage.json', '[]');
    }
}

checkFile();

app.post("/api/task", async (req, res) => {
    try {
        const task = req.body.task;
        const taskString = await fs.readFile('storage.json', 'utf-8');
        const taskArray = JSON.parse(taskString);

        const newTask = {
            id: Date.now().toString(),
            task: task
        };

        taskArray.push(newTask);
        await fs.writeFile('storage.json', JSON.stringify(taskArray, null, 2));

        res.status(200).json({
            success: true
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Failed to save task.'
        });
    }
});

app.get('/api/task', async (req, res) => {
    try {
        const taskData = await fs.readFile('storage.json', 'utf-8');
        
        if (taskData.trim().length == 0) {
            return res.status(200).json({ success: true, taskData: [] });
        }
        
        const taskArray = JSON.parse(taskData);
        
        res.status(200).json({
            success: true,
            taskData: taskArray
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Failed to get data'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Succesfully running server on port ${PORT}`);
});