import React from "react";
import { Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const TaskProgress = ({ tasks }) => {
  const theme = useTheme();

  // Calculate task counts based on user data
  const inProgressTasksCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  const doneTasksCount = tasks.filter((task) => task.status === "Done").length;
  const inQueueTasksCount = tasks.filter(
    (task) => task.status === "In Queue"
  ).length;

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
          <Paper
            className="task-paper"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.contrastText,
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Tasks left</div>
            <div>{inProgressTasksCount}</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid container spacing={0}>
              <Grid item xs>
                <div>Tasks done</div>
                <div>{doneTasksCount}</div>
              </Grid>
              <Grid item xs>
                <div>Tasks in progress</div>
                <div>{inProgressTasksCount}</div>
              </Grid>
              <Grid item xs>
                <div>Tasks in queue</div>
                <div>{inQueueTasksCount}</div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskProgress;
