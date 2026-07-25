const express = require("express");
const taskService = require("../services/task_service");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const task = await taskService.getTaskById(
            Number(req.params.id)
        );

        res.json(task);
    } catch (err) {
        next(err);
    }
});
router.post("/" , async (req , res , next)=>{
    try{
        title= req.body.title ;
        const task = await taskService.CreateTask(title);
        res.status(201).json(task);
    }
    catch(err){
        next(err);
    }
})

router.put("/update-all", async (req, res, next) => {

    try {

        const result = await taskService.markAllCompleted();

        res.json(result);

    } catch (err) {

        next(err);

    }

});
router.put("/:id" , async (req , res , next)=>{
    try {
        const update_task = await taskService.updateTask(
            Number(req.params.id) , 
            req.body.title , 
            req.body.done
        );
        res.json(update_task);
    }
    catch (err){
        next(err);
    }
})
router.delete("/:id", async (req, res, next) => {

    try {

        await taskService.deleteTask(
            Number(req.params.id)
        );

        res.sendStatus(204);

    } catch (err) {

        next(err);

    }

});
module.exports = router;