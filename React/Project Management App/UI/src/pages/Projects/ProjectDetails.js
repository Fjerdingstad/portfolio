import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ProjectTaskGrid from "./ProjectTaskGrid";
import AddTaskIcon from "@mui/icons-material/AddTask";

const ProjectDetails = ({
  deleteProject,
  users_simplified,
  fetchTasks,
  deleteTask,
  fetchProjects,
}) => {
  const { id } = useParams(); // Get the project ID from URL params
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
    setNewProjectName(project.project_name);
    setNewProjectDesc(project.project_description);
  };

  const handleEditProjectInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: newProjectName,
          project_description: newProjectDesc,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project name");
      }

      // Update the project name in the state
      setProject({
        ...project,
        project_name: newProjectName,
        project_description: newProjectDesc,
      });
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating project name:", error);
    }
  };
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    // Call deleteProject with the project ID obtained from URL params
    await deleteProject(id);
    navigate(-1);
    await fetchProjects();
  };

  useEffect(() => {
    // Fetch project data from the backend API
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/projects/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const projectData = await response.json();
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    // Fetch all tasks and filter by project ID
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasksData = await response.json();
        const filteredTasks = tasksData.filter(
          (task) => task.project_id === parseInt(id)
        );
        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
    fetchProject();
  }, [id]);

  // Get the list of user IDs assigned to tasks in the current project
  const assignedUserIds = new Set(tasks.map((task) => task.user_id));

  // Filter users_simplified based on assignedUserIds
  const assignedUsers = users_simplified.filter((user) =>
    assignedUserIds.has(user.user_id)
  );

  if (!project) {
    return <p>Loading...</p>;
  }

  const numTasks = tasks.length;
  // const numUsers = assignedUsers.length;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ marginRight: "auto" }}>
          <Typography variant="h3">
            {project.project_name}
            <IconButton
              aria-label="edit"
              onClick={handleOpenEditDialog}
              size="small"
              sx={{ ml: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mr: "1em" }}>
          <AvatarGroup max={10}>
            {assignedUsers.map((user) => (
              <Avatar
                key={user.user_id}
                src={user.avatar}
                alt={user.username}
              />
            ))}
          </AvatarGroup>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button onClick={handleOpenDialog} variant="contained" color="error">
            <DeleteIcon sx={{ mr: 1 }} /> Delete Project
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: "1em" }}>
        <Typography variant="h6" color="text.light" sx={{ textAlign: "left" }}>
          {project.project_description}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5">Total Tasks: {numTasks}</Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/tasks/create/${id}`} // Include the project ID in the URL
          sx={{ ml: "1em" }}
        >
          <AddTaskIcon sx={{ mr: 1 }} /> Create Task
        </Button>
      </Box>

      <Box sx={{ mt: "2em" }}>
        <ProjectTaskGrid
          tasks={tasks}
          fetchTasks={fetchTasks}
          users_simplified={users_simplified}
          deleteTask={deleteTask}
        />
      </Box>

      <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Project Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            label="New Project Name"
            type="text"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            label="New Project Description"
            type="text"
            fullWidth
            value={newProjectDesc}
            onChange={(e) => setNewProjectDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditProjectInfo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to delete this project?</DialogTitle>
        <DialogContent>
          {project && (
            <div>
              <Typography variant="h6" color="primary.warning">
                {project.project_name}
              </Typography>
              <Typography variant="h6" color="primary.danger">
                WARNING : This will delete all corresponding tasks !
              </Typography>
              {tasks.length > 0 && (
                <ul>
                  {tasks.map((task) => (
                    <li key={task.task_id}>{task.title}</li>
                  ))}
                </ul>
              )}
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
    </>
  );
};

export default ProjectDetails;
