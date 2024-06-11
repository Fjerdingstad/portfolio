import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";

const StatsTasks = ({ tasks }) => {
  const numTasks = tasks.length;
  // Calculate task counts based on user data
  const inProgressTasksCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const doneTasksCount = tasks.filter((task) => task.status === "Done").length;
  const inQueueTasksCount = tasks.filter(
    (task) => task.status === "In Queue"
  ).length;

  const donePercent = (doneTasksCount / numTasks) * 100;
  const inProgressPercent = (inProgressTasksCount / numTasks) * 100;
  const inQueuePercent = (inQueueTasksCount / numTasks) * 100;
  return (
    <Box>
      <Paper
        className="task-paper"
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "165px",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {numTasks}
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "rgb(255, 165, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgb(255, 165, 0, 0.2)",
                    cursor: "default",
                  },
                }}
              >
                <TaskIcon sx={{ color: "#ffa500" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Typography sx={{ color: "text.light" }}>Total Tasks</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            mr: 1,
            mt: "1.25em",
            mb: "1.5em",
            position: "relative",
          }}
        >
          <Box
            sx={{
              height: 10,
              borderRadius: "20px 0px 0px 20px",
              backgroundColor: "#3DCF3D",
              width: `${donePercent}%`,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <Box
            sx={{
              height: 10,
              borderRadius: "0px 0px 0px 0px",
              backgroundColor: "#ff9900",
              width: `${inProgressPercent}%`,
              position: "absolute",
              top: 0,
              left: `${donePercent}%`,
            }}
          />
          <Box
            sx={{
              height: 10,
              borderRadius: "0px 20px 20px 0px",
              backgroundColor: "#2979FF",
              width: `${inQueuePercent}%`,
              position: "absolute",
              top: 0,
              left: `${donePercent + inProgressPercent}%`,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "#3DCF3D",
                width: "1em",
                height: "1em",
                padding: "5px",
                borderRadius: "5px",
                mr: "0.25em",
              }}
            ></Box>
            <Typography
              sx={{ mr: "0.25em", fontWeight: "bold", color: "#3DCF3D" }}
            >
              {doneTasksCount}
            </Typography>
            <Typography sx={{ color: "text.light" }}>Done</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "#ff9900",
                width: "1em",
                height: "1em",
                padding: "5px",
                borderRadius: "5px",
                mr: "0.25em",
              }}
            ></Box>
            <Typography
              sx={{ mr: "0.25em", fontWeight: "bold", color: "#ff9900" }}
            >
              {inProgressTasksCount}
            </Typography>
            <Typography sx={{ color: "text.light" }}>In Progress</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "#2979FF",
                width: "1em",
                height: "1em",
                padding: "5px",
                borderRadius: "5px",
                mr: "0.25em",
              }}
            ></Box>
            <Typography
              sx={{ mr: "0.25em", fontWeight: "bold", color: "#2979FF" }}
            >
              {inQueueTasksCount}
            </Typography>
            <Typography sx={{ color: "text.light" }}>In Queue</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatsTasks;
