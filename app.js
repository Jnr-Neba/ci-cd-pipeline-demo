const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];
let currentId = 1;

app.get('/tasks', (_req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: 'Task is required' });
    const newTask = { id: currentId++, task };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });
    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
});

app.get('/healthz', (_req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`To-Do API running on port ${PORT}`));

// test commit to trigger workflow
