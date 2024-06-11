import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const StatsProjects = ({ projects, tasks }) => {
  const numProjects = projects.length;
  // Calculate project statuses
  const doneProjectsCount = projects.filter((project) => {
    const projectTasks = tasks.filter(
      (task) => task.project_id === project.project_id
    );
    const numDoneTasks = projectTasks.filter(
      (task) => task.status === "Done"
    ).length;
    const numTotalTasks = projectTasks.length;
    const progressPercentage =
      numTotalTasks > 0 ? (numDoneTasks / numTotalTasks) * 100 : 0;
    return progressPercentage === 100;
  }).length;

  const ongoingProjectsCount = projects.filter((project) => {
    const projectTasks = tasks.filter(
      (task) => task.project_id === project.project_id
    );
    const numDoneTasks = projectTasks.filter(
      (task) => task.status === "Done"
    ).length;
    const numTotalTasks = projectTasks.length;
    const progressPercentage =
      numTotalTasks > 0 ? (numDoneTasks / numTotalTasks) * 100 : 0;
    return progressPercentage > 50 && progressPercentage < 100;
  }).length;

  const overdueProjectsCount = projects.filter((project) => {
    const projectTasks = tasks.filter(
      (task) => task.project_id === project.project_id
    );
    const numDoneTasks = projectTasks.filter(
      (task) => task.status === "Done"
    ).length;
    const numTotalTasks = projectTasks.length;
    const progressPercentage =
      numTotalTasks > 0 ? (numDoneTasks / numTotalTasks) * 100 : 0;
    return progressPercentage <= 50;
  }).length;

  const donePercent = (doneProjectsCount / numProjects) * 100;
  const ongoingPercent = (ongoingProjectsCount / numProjects) * 100;
  const overduePercent = (overdueProjectsCount / numProjects) * 100;

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
              {numProjects}
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "rgb(61, 207, 61, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgb(61, 207, 61, 0.2)",
                    cursor: "default",
                  },
                }}
              >
                <AssignmentIcon sx={{ color: "#3DCF3D" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Typography sx={{ color: "text.light" }}>Total Projects</Typography>
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
              width: `${ongoingPercent}%`,
              position: "absolute",
              top: 0,
              left: `${donePercent}%`,
            }}
          />
          <Box
            sx={{
              height: 10,
              borderRadius: "0px 20px 20px 0px",
              backgroundColor: "#ff4d4d",
              width: `${overduePercent}%`,
              position: "absolute",
              top: 0,
              left: `${donePercent + ongoingPercent}%`,
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
              {doneProjectsCount}
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
              {ongoingProjectsCount}
            </Typography>
            <Typography sx={{ color: "text.light" }}>Ongoing</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "#ff4d4d",
                width: "1em",
                height: "1em",
                padding: "5px",
                borderRadius: "5px",
                mr: "0.25em",
              }}
            ></Box>
            <Typography
              sx={{ mr: "0.25em", fontWeight: "bold", color: "#ff4d4d" }}
            >
              {overdueProjectsCount}
            </Typography>
            <Typography sx={{ color: "text.light" }}>Overdue</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatsProjects;
