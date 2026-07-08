import express from 'express';
import fs from 'node:fs/promises'

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

async function checkFile() {
    try {
        await fs.readFile('storage.json', 'utf-8')
    } catch (err) {
        console.warn("First run or file doesnt exist, creating new");
        await fs.writeFile('storage.json', '[]');
    }
}

app.post("/api/task", async (req, res) => {
    const task = req.body.task;

})

app.listen(PORT, () => {
    console.log(`Succesfully running server on port ${PORT}`)
})

checkFile();