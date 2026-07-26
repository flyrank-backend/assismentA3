CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (title, done)
VALUES
    ('Learn Docker', false),
    ('Learn PostgreSQL', false),
    ('Build REST API', true);

INSERT INTO tasks (title, done)
SELECT 'Learn Docker', false
WHERE NOT EXISTS (
    SELECT 1 FROM tasks
);