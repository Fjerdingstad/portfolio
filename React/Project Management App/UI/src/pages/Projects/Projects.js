import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";

const Projects = ({ projects, users_simplified, tasks, fetchProjects }) => {
  const navigate = useNavigate();
  const numProjects = projects.length;

  const handleAddProject = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: "New Project", // Change to any default project name you want
          project_description: "This is a new project",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      await fetchProjects();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Box sx={{ mb: "1em", display: "flex", alignItems: "center" }}>
        <Typography variant="h4">Project List</Typography>
        <Typography sx={{ ml: "1em" }} variant="body1" color="text.light">
          {numProjects} Projects
        </Typography>
        <Box sx={{ margin: "auto" }}></Box>
        <Button variant="contained" onClick={handleAddProject}>
          <PostAddIcon sx={{ mr: 1 }} /> Create Project
        </Button>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {projects.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.project_id === project.project_id
            );

            const numDoneTasks = projectTasks.filter(
              (task) => task.status === "Done"
            ).length;
            const numTotalTasks = projectTasks.length;
            const progressPercentage =
              numTotalTasks > 0 ? (numDoneTasks / numTotalTasks) * 100 : 0;

            // Get the list of user IDs assigned to tasks in the current project
            const assignedUserIds = new Set(
              projectTasks.map((task) => task.user_id)
            );

            // Filter users_simplified based on assignedUserIds
            const assignedUsers = users_simplified.filter((user) =>
              assignedUserIds.has(user.user_id)
            );

            const handleClick = () => {
              navigate(`/projects/${project.project_id}`);
            };

            return (
              <React.Fragment key={project.project_id}>
                <Grid item xs={4}>
                  <Paper
                    elevation={5}
                    sx={{
                      padding: 2,
                      marginBottom: 2,
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      textAlign: "left",

                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? "#dff1f1"
                            : "#4a6371",
                      },
                    }}
                    onClick={handleClick}
                  >
                    <Box sx={{ mb: "1em" }}>
                      <Typography variant="h5">
                        {project.project_name}
                      </Typography>
                      <Typography variant="body1" color="text.light">
                        {project.project_description}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: "1em" }}
                    >
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progressPercentage}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                          }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                        >{`${Math.round(progressPercentage)}%`}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AvatarGroup max={3}>
                        {assignedUsers.map((user) => (
                          <Avatar
                            key={user.user_id}
                            src={user.avatar}
                            alt={user.username}
                          />
                        ))}
                      </AvatarGroup>
                      <Box sx={{ marginRight: "auto" }}></Box>
                      <Typography variant="body1" color="text.light">
                        {numTotalTasks} Total task(s)
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Projects;
