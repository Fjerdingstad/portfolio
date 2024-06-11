import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskDetails = ({
  projects,
  users_simplified,
  deleteTask,
  fetchTasks,
}) => {
  const { id } = useParams(); // Get the task ID from URL params
  const [task, setTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    // Fetch task data from the backend API
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }
        const taskData = await response.json();
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <p>Loading...</p>;
  }

  const navigateBack = (e) => {
    history(-1);
  };

  const userMap = users_simplified.reduce((map, user) => {
    map[user.user_id] = user;
    return map;
  }, {});
  const projectMap = projects.reduce((map, project) => {
    map[project.project_id] = project;
    return map;
  }, {});

  const userDetails = userMap[task.user_id]; // Get user details
  const username = userDetails ? userDetails.username : "Unknown User"; // Get username or default to "Unknown User"
  const avatarSrc = userDetails ? userDetails.avatar : "";

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    // Call deleteProject with the project ID obtained from URL params
    await deleteTask(id);
    history(-1);
    await fetchTasks();
  };

  // Function to format the due date based on the user's locale
  const formatDate = (dueDate) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dueDate).toLocaleDateString(navigator.language, options);
  };

  return (
    <Paper>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{}}>
            <IconButton
              aria-label="delete"
              color="secondary"
              variant="contained"
              onClick={navigateBack}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box sx={{ margin: "auto" }}></Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              component={Link}
              to={`/tasks/edit/${id}`}
            >
              <EditIcon sx={{ mr: 1 }} /> Edit Task
            </Button>
            <Button
              onClick={handleOpenDialog}
              variant="contained"
              color="error"
              sx={{ marginLeft: "0.5em" }}
            >
              <DeleteIcon sx={{ mr: 1 }} /> Delete Task
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <InfoIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: "1em" }}>
            Task Details
          </Typography>
        </Box>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={8}>
            <Box>
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: "0.25em" }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: `${getTagColor(task.tag)}`,
                      color: "white",
                      borderRadius: "100px",
                      padding: "5px",
                      width: "5em",
                      marginRight: "10px",
                    }}
                  >
                    <Typography variant="body2">{task.tag}</Typography>
                  </div>
                  <Box sx={{ display: "flex" }}>
                    <div
                      style={{
                        backgroundColor: `${getPriorityColor(
                          task.priority_level
                        )}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "5em",
                        fontSize: "0.75em",
                        textAlign: "center",
                        marginRight: "10px",
                      }}
                    >
                      {task.priority_level}
                    </div>
                    <Typography sx={getStatusStyle(task.status)}>
                      {task.status}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Box sx={{ textAlign: "left", marginRight: "auto" }}>
                    <Typography variant="h6" sx={{ fontSize: "1.5em" }}>
                      {task.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {task.description}
                    </Typography>

                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 1,
                          mr: "0.25em",
                          color: "text.light",
                          textTransform: "uppercase",
                        }}
                      >
                        Project:
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {projectMap[task.project_id].project_name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 1,
                          mr: "0.25em",
                          color: "text.light",
                          textTransform: "uppercase",
                        }}
                      >
                        Due Date:
                      </Typography>
                      <Typography>{formatDate(task.due_date)}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Assigned User(s)
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <Avatar
                          sx={{ mr: 3, ml: 3, width: 75, height: 75 }}
                          alt={username}
                          src={avatarSrc}
                        />
                      </Box>
                      <Typography variant="body1">{username}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogContent>
            {task && (
              <div>
                <Typography variant="h6" color="primary.light">
                  {task.title}
                </Typography>

                <Typography variant="subtitle1" color="primary.light">
                  {task.description}
                </Typography>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Nevermind
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              I'm sure
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};

function getStatusStyle(status) {
  switch (status) {
    case "In Queue":
      return {
        backgroundColor: "#29b5f6",
        padding: "5px 10px 5px 10px",
        fontSize: "0.75em",
        borderRadius: "100px",
        color: "#fff",
      };
    case "In Progress":
      return {
        backgroundColor: "#ffa826",
        padding: "5px 10px 5px 10px",
        fontSize: "0.75em",
        borderRadius: "100px",
        color: "#fff",
      };
    case "Done":
      return {
        backgroundColor: "#66bb66",
        padding: "5px 10px 5px 10px",
        fontSize: "0.75em",
        borderRadius: "100px",
        color: "#fff",
      };
    default:
      return {
        backgroundColor: "black",
        padding: "5px 10px 5px 10px",
        fontSize: "0.75em",
        borderRadius: "100px",
        color: "#fff",
      };
  }
}

function getPriorityColor(priority) {
  switch (priority) {
    case "Low":
      return "#3dcf3d";
    case "Medium":
      return "#ff9900";
    case "High":
      return "#ff4d4d";
    default:
      return "black";
  }
}

function getTagColor(tag) {
  switch (tag) {
    case "Content":
      return "#af52bf";
    case "Design":
      return "#33c9dc";
    case "Dev":
      return "#33ab9f";
    case "Planning":
      return "#4dabf5";
    case "Research":
      return "#651fff";
    default:
      return "black";
  }
}

export default TaskDetails;
