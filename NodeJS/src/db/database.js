// <----------------------------------------------------------------------->
// <----------------------------------------------------------------------->
// <------------- This is for the sql lite code --------------------------->
// <----------------------------------------------------------------------->
// <----------------------------------------------------------------------->






// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("tasks.db", (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log("Connected to SQLite.");
//     }
// });

// db.serialize(() => {

//     db.run(`
//         CREATE TABLE IF NOT EXISTS tasks (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             title TEXT NOT NULL,
//             done INTEGER NOT NULL
//         )
//     `);

//     db.get(
//         "SELECT COUNT(*) AS count FROM tasks",
//         (err, row) => {

//             if (err) {
//                 return console.error(err.message);
//             }

//             if (row.count === 0) {

//                 db.run(
//                     "INSERT INTO tasks(title, done) VALUES (?, ?)",
//                     ["Learn Node.js", 0]
//                 );

//                 db.run(
//                     "INSERT INTO tasks(title, done) VALUES (?, ?)",
//                     ["Build REST API", 0]
//                 );

//                 db.run(
//                     "INSERT INTO tasks(title, done) VALUES (?, ?)",
//                     ["Practice SQLite", 1]
//                 );

//                 console.log("Sample tasks inserted.");
//             }
//         }
//     );

// });

// module.exports = db;