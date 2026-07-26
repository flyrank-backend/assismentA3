const express = require("express");
const TaskRouter = require("./src/routes/task_route");
const MetaDataRouter = require("./src/routes/meta_route");
const { errorHandler } = require("./src/middleware/error-handle");
const { connectRedis } = require("./src/db/redis");

const app = express();

app.use(express.json());

app.use("/tasks", TaskRouter);
app.use("/", MetaDataRouter);

app.use(errorHandler);

async function startServer() {
    try {

        await connectRedis();

        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });

    } catch (err) {

        console.error("Failed to start server:", err);

    }
}

startServer();