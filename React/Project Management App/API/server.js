// Import express to simplify the process of building web applications and APIS
const express = require("express");

// Import Cors middleware to enable cross resource sharing while using express
const cors = require("cors");

// Import SQLite
const sqlite3 = require("sqlite3").verbose();

// Create an instance of the Express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 5000;

// Apply Cors to express app
app.use(cors());

// Parse incoming request bodies as JSON and expose it on req.body
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("database.db");

// GET route to fetch tasks from the database
app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/api/users_simplified", (req, res) => {
  db.all("SELECT * FROM users_simplified", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET route to fetch a single user by ID from the database
app.get("/api/users_simplified/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = "SELECT * FROM users_simplified WHERE user_id = ?";
  const values = [userId];

  db.get(sql, values, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(row);
  });
});

// DELETE route to delete a user by ID from the database
app.delete("/api/users_simplified/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = "DELETE FROM users_simplified WHERE user_id = ?";
  const values = [userId];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "User deleted successfully" });
  });
});

//add user
app.post("/api/users_simplified", (req, res) => {
  const { username, email, avatar, role } = req.body;

  const rolesArray = role.split(",");

  const sql = `
    INSERT INTO users_simplified (username, email, avatar, role)
    VALUES (?, ?, ?, ?)
  `;

  const values = [username, email, avatar, JSON.stringify(rolesArray)];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json({ message: "User created successfully" });
  });
});

// PUT route to update a task by ID in the database
app.put("/api/users_simplified/:userId", (req, res) => {
  const userId = req.params.userId;
  const { username, email, avatar, role } = req.body;

  const rolesString = JSON.stringify(Array.isArray(role) ? role : [role]);

  const sql = `
    UPDATE users_simplified 
    SET username = ?, email = ?, avatar = ?, role = ?
    WHERE user_id = ?
  `;
  const values = [username, email, avatar, rolesString, userId];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "User updated successfully" });
  });
});

// POST route to create a new task in the database
app.post("/api/tasks", (req, res) => {
  const {
    title,
    description,
    due_date,
    priority_level,
    status,
    tag,
    user_id,
    project_id,
  } = req.body;

  const sql = `
    INSERT INTO tasks (title, description, due_date, priority_level, status, tag, user_id, project_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    description,
    due_date,
    priority_level,
    status,
    tag,
    user_id,
    project_id,
  ];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res
      .status(201)
      .json({ message: "Task created successfully", task_id: this.lastID });
  });
});

// GET route to fetch a single task by ID from the database
app.get("/api/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;

  const sql = "SELECT * FROM tasks WHERE task_id = ?";
  const values = [taskId];

  db.get(sql, values, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(row);
  });
});

// DELETE route to delete a task by ID from the database
app.delete("/api/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;

  const sql = "DELETE FROM tasks WHERE task_id = ?";
  const values = [taskId];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json({ message: "Task deleted successfully" });
  });
});

// PUT route to update a task by ID in the database
app.put("/api/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const {
    title,
    description,
    due_date,
    priority_level,
    status,
    tag,
    user_id,
    project_id,
  } = req.body;

  const sql = `
    UPDATE tasks 
    SET title = ?, description = ?, due_date = ?, priority_level = ?, status = ?, tag = ?, user_id = ?, project_id = ?
    WHERE task_id = ?
  `;
  const values = [
    title,
    description,
    due_date,
    priority_level,
    status,
    tag,
    user_id,
    project_id,
    taskId,
  ];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json({ message: "Task updated successfully" });
  });
});

// GET route to projects from the database
app.get("/api/projects", (req, res) => {
  db.all("SELECT * FROM projects", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/api/projects/:projectId", (req, res) => {
  const projectId = req.params.projectId;

  const sql = "SELECT * FROM projects WHERE project_id = ?";
  const values = [projectId];

  db.get(sql, values, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(row);
  });
});

// POST route to create a new project in the database
app.post("/api/projects", (req, res) => {
  const { project_name, project_description } = req.body;

  const sql = `
    INSERT INTO projects (project_name, project_description)
    VALUES (?, ?)
  `;

  const values = [project_name, project_description];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.status(201).json({
      message: "Project created successfully",
      project_id: this.lastID,
    });
  });
});

// DELETE route to delete a project by ID and corresponding tasks from the database
app.delete("/api/projects/:projectId", (req, res) => {
  const projectId = req.params.projectId;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    const deleteTasksSql = "DELETE FROM tasks WHERE project_id = ?";
    db.run(deleteTasksSql, [projectId], function (err) {
      if (err) {
        db.run("ROLLBACK");
        res.status(500).json({ error: err.message });
        return;
      }
    });

    const deleteProjectSql = "DELETE FROM projects WHERE project_id = ?";
    db.run(deleteProjectSql, [projectId], function (err) {
      if (err) {
        db.run("ROLLBACK");
        res.status(500).json({ error: err.message });
        return;
      }

      if (this.changes === 0) {
        db.run("ROLLBACK");
        res.status(404).json({ error: "Project not found" });
        return;
      }

      db.run("COMMIT");
      res.json({ message: "Project and related tasks deleted successfully" });
    });
  });
});

// PUT route to update a project by ID in the database
app.put("/api/projects/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const { project_name, project_description } = req.body;

  const sql = `
    UPDATE projects 
    SET project_name = ?, project_description = ?
    WHERE project_id = ?
  `;
  const values = [project_name, project_description, projectId];

  db.run(sql, values, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json({ message: "Project updated successfully" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
