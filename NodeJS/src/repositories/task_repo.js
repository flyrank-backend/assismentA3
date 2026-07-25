const db = require("../db/database");

class TaskRepository {

    getAll() {
        return new Promise((resolve, reject) => {

            db.all(
                "SELECT * FROM tasks",
                [],
                (err, rows) => {

                    if (err) return reject(err);

                    resolve(rows);

                }
            );

        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {

            db.get(
                "SELECT * FROM tasks WHERE id = ?",
                [id],
                (err, row) => {

                    if (err) return reject(err);

                    resolve(row);

                }
            );

        });
    }
    markAllCompleted() {
    return new Promise((resolve, reject) => {

        const sql = "UPDATE tasks SET done = 1";

        db.run(sql, function (err) {

            if (err) {
                return reject(err);
            }

            resolve(this.changes);

        });

    });
}
    
    create(title) {
    return new Promise((resolve, reject) => {

        const sql =
            "INSERT INTO tasks(title, done) VALUES(?, ?)";

        db.run(sql, [title, 0], function (err) {

            if (err) {
                return reject(err);
            }
            // console.log(`+++ this si the this object ${this} from insert Function.`)
            resolve({
                id: this.lastID,
                title,
                done: 0
            });

        });

    });
}

    update(id, title, done) {
        return new Promise((resolve, reject) => {

            const sql =
                "UPDATE tasks SET title = ?, done = ? WHERE id = ?";

            db.run(sql, [title, done, id], function (err) {

                if (err) {
                    return reject(err);
                }
                // console.log(`--- this si the this object ${this} from the update function.`)
                resolve(this.changes);

            });

        });
    }

    delete(id){
        return new Promise((resolve , reject) =>{
            const sql="DELETE FROM tasks WHERE id=?"
            db.run(sql , [id] , function(err){
                if (err)
                {
                    return reject(err);
                }
                // console.log(`-=-=- this si the this object ${this} from the delete function `)
                resolve(this.changes);
            })
        })
    }


}

module.exports = new TaskRepository();