import * as React from "react";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import TaskCalendar from "./TaskCalendar";

const TasksToDoSoon = ({ tasks, projects, users_simplified }) => {
  const navigate = useNavigate();
  // Ensure tasks is an array, filter out 'done' tasks, and sort by due_date to get the closest ones
  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.status !== "Done")
    : [];

  const sortedTasks = filteredTasks
    .slice()
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  // Limit to 3 items after sorting
  const limitedTasks = sortedTasks.slice(0, 4);

  // Function to format the due date based on the user's locale
  const formatDate = (dueDate) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dueDate).toLocaleDateString(navigator.language, options);
  };

  // Function to determine the color based on the due date
  const getDueDateColor = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffInDays = Math.floor(
      (dueDateObj - currentDate) / (1000 * 60 * 60 * 24)
    );

    if (dueDateObj < currentDate) {
      return "red"; // Due date is past
    } else if (diffInDays <= 14) {
      return "orange"; // Due date is within 2 weeks
    } else if (diffInDays > 30) {
      return "green"; // Due date is in more than a month
    } else {
      return "gray"; // Default color for other cases
    }
  };

  const projectMap = projects.reduce((map, project) => {
    map[project.project_id] = project;
    return map;
  }, {});

  const usersMap = users_simplified.reduce((map, user) => {
    map[user.user_id] = user;
    return map;
  }, {});

  const handleClickNavigate = (taskId) => {
    navigate(`/tasks/details/${taskId}`);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" gutterBottom>
          Due Tasks
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {limitedTasks.length === 0 ? (
              <Typography variant="body1">No tasks due soon</Typography>
            ) : (
              limitedTasks.map((task) => (
                <Paper
                  key={task.task_id}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    display: "flex",

                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.mode === "light" ? "#dff1f1" : "#4a6371",
                    },
                  }}
                  onClick={() => handleClickNavigate(task.task_id)}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ mr: 3, ml: 3 }}
                      alt={usersMap[task.user_id].username}
                      src={usersMap[task.user_id].avatar}
                    />
                    <Typography variant="body1">
                      {usersMap[task.user_id].username}
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "auto" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2">
                      {projectMap[task.project_id].project_name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccessTimeIcon
                      sx={{
                        marginRight: "0.25em",
                        color: getDueDateColor(task.due_date),
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: getDueDateColor(task.due_date),
                        fontWeight: "bold",
                      }}
                    >
                      {formatDate(task.due_date)}
                    </Typography>
                  </Box>
                </Paper>
              ))
            )}
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <TaskCalendar tasks={tasks} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TasksToDoSoon;
