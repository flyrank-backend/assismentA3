const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// In-memory database
const tasks = [
    { id: 1, title: "Learn Express", done: false },
    { id: 2, title: "Build Task API", done: true },
    { id: 3, title: "Deploy Project", done: false }
];

// Home endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// GET /tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);
});

// POST /tasks
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    // Validation
    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required."
        });
    }

    // Create new task
    const newTask = {
        id: tasks.length + 1,
        title: title.trim(),
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    // Task not found
    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    const { title, done } = req.body;

    // Validation: request body cannot be empty
    if (title === undefined && done === undefined) {
        return res.status(400).json({
            error: "Request body must contain title or done."
        });
    }

    
    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                error: "Title must be a non-empty string."
            });
        }

        task.title = title.trim();
    }

    
    if (done !== undefined) {
        if (typeof done !== "boolean") {
            return res.status(400).json({
                error: "Done must be true or false."
            });
        }

        task.done = done;
    }

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});