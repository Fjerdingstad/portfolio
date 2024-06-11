import React from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Greetings = ({ tasks, users_simplified, projects }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const darkGradient = "linear-gradient(to bottom right, #1c9d95, #009c63)";
  const lightGradient = "linear-gradient(to bottom right, #1c9d95, #b9e0ce)";
  const backgroundGradient =
    theme.palette.mode === "light" ? lightGradient : darkGradient;

  // Get the current hour
  const currentHour = dayjs().hour();

  // Determine the greeting message based on the current hour
  let greetingMessage = "";
  if (currentHour >= 6 && currentHour < 12) {
    greetingMessage = "Good Morning!";
  } else if (currentHour >= 12 && currentHour < 19) {
    greetingMessage = "Good Afternoon!";
  } else {
    greetingMessage = "Good Evening!";
  }

  // Get the current date in the desired format
  const currentDate = dayjs().format("MMMM D, YYYY");
  const currentDateFormatted = dayjs().format("YYYY-MM-DD");

  // Filter tasks that are due today and not done
  const tasksDueToday = tasks.filter(
    (task) =>
      dayjs(task.due_date).format("YYYY-MM-DD") === currentDateFormatted &&
      task.status !== "Done"
  );

  // Determine the message based on the number of tasks due today
  let taskMessage = "";
  if (tasksDueToday.length === 0) {
    taskMessage = "There are no tasks due today!";
  } else if (tasksDueToday.length === 1) {
    taskMessage = "There is 1 unfinished task due today!";
  } else {
    taskMessage = `There are ${tasksDueToday.length} unfinished tasks due today!`;
  }

  // Creating a map of projects where project_id is the key
  const projectMap = projects.reduce((map, project) => {
    map[project.project_id] = project;
    return map;
  }, {});

  // Creating a map of users where user_id is the key
  const usersMap = users_simplified.reduce((map, user) => {
    map[user.user_id] = user;
    return map;
  }, {});

  const handleClickNavigate = (taskId) => {
    navigate(`/tasks/details/${taskId}`);
  };

  return (
    <Box sx={{ mb: "3em" }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          mb: "1em",
          background: backgroundGradient,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <Typography variant="h6" color="primary.contrastText">
            {currentDate}
          </Typography>
          <Typography variant="h3" color="primary.contrastText">
            {greetingMessage}
          </Typography>
          <Typography variant="h5" color="primary.contrastText">
            {taskMessage}
          </Typography>
        </Box>
      </Paper>
      <Grid container spacing={2}>
        {tasksDueToday.map((task, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              key={task.task_id}
              sx={{
                padding: 2,
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
                  alt={usersMap[task.user_id].username}
                  src={usersMap[task.user_id].avatar}
                />
                <Typography variant="body1" sx={{ ml: 1, mr: 1 }}>
                  {usersMap[task.user_id].username}
                </Typography>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box sx={{ margin: "auto", textAlign: "left" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {task.title}
                </Typography>
                <Typography variant="body2">
                  {projectMap[task.project_id].project_name}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Greetings;
