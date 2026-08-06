# Task API Service

A Node.js Express task management API with PostgreSQL persistence and Docker support.

## Project structure

- `NodeJS/`
  - `app.js` — Express server wiring and middleware registration
  - `index.js` — standalone API with Swagger docs for local/in-memory testing
  - `src/routes/` — task and metadata route definitions
  - `src/services/` — business logic and validation
  - `src/repositories/` — PostgreSQL data access layer
  - `src/middleware/` — centralized error handling
  - `sql/init.sql` — PostgreSQL schema and initial seed data
  - `openapi.json` — API documentation definition
  - `Dockerfile` — container image build instructions
  - `docker-compose.yaml` — local development stack with Postgres

## Features

- CRUD task operations
- Mark all tasks complete
- PostgreSQL-backed persistence
- Validation and error handling
- Docker Compose ready for local development

## Prerequisites

- Node.js 20+
- npm
- Docker and Docker Compose (for containerized setup)

## Setup

1. Open a terminal in `NodeJS/`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `NodeJS/`  and take a copy of variable in the `.env.example` and put your values.


## Running locally

Start the server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/`.

## Running with Docker

From the `NodeJS/` folder, use:

```bash
docker compose up --build
```

This starts two services:

- `app` — Node.js API on port `3000`
- `db` — PostgreSQL on port `5432`

The database is initialized from `sql/init.sql`.

## API Endpoints

- `GET /tasks` — list all tasks
- `GET /tasks/:id` — get a task by id
- `POST /tasks` — create a new task
- `PUT /tasks/:id` — update a task's title or done status
- `PUT /tasks/update-all` — mark all tasks completed
- `DELETE /tasks/:id` — delete a task

## Notes

- `NodeJS/app.js` uses the PostgreSQL repository implementation.
- `NodeJS/index.js` includes a simplified in-memory version of the API and Swagger setup.
- Error responses are handled centrally in `src/middleware/error-handle.js`.
### Author : Mariam Abdelsalam.
 
