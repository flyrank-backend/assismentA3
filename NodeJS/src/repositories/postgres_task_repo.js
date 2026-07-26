const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

class PostgresTaskRepository {

    async getAll() {

        const result = await pool.query(
            "SELECT id, title, done FROM tasks ORDER BY id"
        );

        return result.rows;
    }

    async getById(id) {
        console.log("ID received by repository:", id);
        const result = await pool.query(
            "SELECT id, title, done FROM tasks WHERE id = $1",
            [id]
        );

        return result.rows[0];
    }

    async create(title) {

        const result = await pool.query(
            `INSERT INTO tasks (title, done)
             VALUES ($1, false)
             RETURNING id, title, done`,
            [title]
        );

        return result.rows[0];
    }

    async update(id, title, done) {

        const result = await pool.query(
            `UPDATE tasks
             SET title = $1, done = $2
             WHERE id = $3`,
            [title, done, id]
        );

        return result.rowCount;
    }

    async delete(id) {

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        );

        return result.rowCount;
    }

    async markAllCompleted() {

        const result = await pool.query(
            "UPDATE tasks SET done = true"
        );

        return result.rowCount;
    }
}

module.exports = new PostgresTaskRepository();