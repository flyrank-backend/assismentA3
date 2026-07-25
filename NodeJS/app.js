const express = require("express");
const TaskRouter = require("./src/routes/task_route");
const MetaDataRouter = require("./src/routes/meta_route");
const { errorHandler } = require("./src/middleware/error-handle");

const app = express();
app.use(express.json());
app.use("/tasks", TaskRouter);
app.use("/" , MetaDataRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});