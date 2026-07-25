const taskRepository = require("../repositories/task_repo");
const { NotFoundError, ValidationError } = require("../errors");

class TaskService {

    async getAllTasks() {

        return await taskRepository.getAll();

    }

    async getTaskById(id) {

        const task = await taskRepository.getById(id);

        if (!task) {
            throw new NotFoundError("Task not found");
        }

        return task;

    }
    async CreateTask(title){
        if(!title)
        {
            throw new ValidationError("Title is Required.");
        }
        return await taskRepository.create(title);

    }

    async updateTask(id, title, done) {

        if (!title) {
            throw new ValidationError("Title is required");
        }

        const updated = await taskRepository.update(
            id,
            title,
            done
        );

        if (updated === 0) {
            throw new NotFoundError("Task not found");
        }

        return await taskRepository.getById(id);

    }

    async deleteTask(id) {

        const deleted = await taskRepository.delete(id);

        if (deleted === 0) {
            throw new NotFoundError("Task not found");
        }

    }
    async markAllCompleted() {

    const updated = await taskRepository.markAllCompleted();

    return {
        message: `${updated} task(s) marked as completed`
    };

}
}


module.exports = new TaskService();