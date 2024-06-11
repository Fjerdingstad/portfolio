import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";

const Tasks = ({
  tasks,
  users,
  deleteTask,
  users_simplified,
  projects,
  fetchTasks,
}) => {
  const numTasks = tasks.length;
  return (
    <>
      <Box sx={{ mb: "1em", display: "flex", alignItems: "center" }}>
        <Typography variant="h4">Task List</Typography>
        <Typography sx={{ ml: "1em" }} variant="body1" color="text.light">
          {numTasks} Tasks
        </Typography>
        <Box sx={{ margin: "auto" }}></Box>
        <Button variant="contained" component={Link} to="/tasks/create">
          <AddTaskIcon sx={{ mr: 1 }} /> Create Task
        </Button>
      </Box>

      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              fetchTasks={fetchTasks}
              users={users}
              deleteTask={deleteTask}
              users_simplified={users_simplified}
              projects={projects}
            />
          }
        />
        <Route path="create" element={<CreateTask />} />
      </Routes>
    </>
  );
};

export default Tasks;
