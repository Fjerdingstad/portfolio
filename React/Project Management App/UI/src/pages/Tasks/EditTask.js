import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Select,
  TextField,
  MenuItem,
  Box,
  Avatar,
  InputLabel,
  FormControl,
  Backdrop,
  Alert,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const EditTask = ({ projects, fetchTasks }) => {
  const { id } = useParams(); // Get the task ID from URL params
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const history = useNavigate();
  const [open, setOpen] = React.useState(false); // eslint-disable-line no-unused-vars
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_id: "",
    due_date: "",
    user_id: "",
    priority_level: "",
    status: "",
    tag: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch task data from the backend API
    fetchUsersSimplified();
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }
        const taskData = await response.json();
        setTask(taskData);
        // Set initial form data based on the task
        setFormData({
          title: taskData.title,
          description: taskData.description,
          project_id: taskData.project_id,
          due_date: taskData.due_date,
          user_id: taskData.user_id,
          priority_level: taskData.priority_level,
          status: taskData.status,
          tag: taskData.tag,
        });
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [id]);

  const fetchUsersSimplified = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users_simplified"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data); // Store the list of users in state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateFocus = (e) => {
    e.target.type = "date";
  };

  const handleDateBlur = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      setSuccess(true);
      setOpen(true);
      setTimeout(() => {
        history(-1); // Navigate back to the previous page after a short delay
      }, 2000);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) {
    return <p>Loading...</p>;
  }

  const navigateBack = (e) => {
    history(-1);
  };

  const isFormValid = () => {
    return (
      formData.title !== "" &&
      formData.description !== "" &&
      formData.project_id !== "" &&
      formData.due_date !== "" &&
      formData.user_id !== "" &&
      formData.priority_level !== "" &&
      formData.status !== ""
    );
  };

  return (
    <Paper>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", marginRight: "auto" }}>
          <IconButton
            aria-label="delete"
            color="secondary"
            variant="contained"
            onClick={navigateBack}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Editing Task: {task.title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2} sx={{ textAlign: "left" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="title"
                label="Title"
                type="text"
                name="title"
                autoComplete="task_title"
                autoFocus
                value={formData.title}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="description"
                label="Description"
                type="text"
                name="description"
                autoComplete="task_desc"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="user-label">Project *</InputLabel>
                <Select
                  margin="dense"
                  required
                  fullWidth
                  id="project_id"
                  label="project-label"
                  labelId="project-label"
                  name="project_id"
                  value={formData.project_id}
                  onChange={handleFormChange}
                >
                  {projects.map((project) => (
                    <MenuItem
                      key={project.project_id}
                      value={project.project_id}
                    >
                      {project.project_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="user-label">User *</InputLabel>
                <Select
                  margin="dense"
                  required
                  fullWidth
                  id="user_id"
                  label="user-label"
                  labelId="user-label"
                  value={formData.user_id}
                  onChange={handleFormChange}
                  name="user_id"
                >
                  {users.map((user) => (
                    <MenuItem key={user.user_id} value={user.user_id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="due_date"
                label="Due Date"
                type="text"
                name="due_date"
                autoComplete="task_due_date"
                value={formData.due_date}
                onChange={handleFormChange}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="priority-label">Priority Level</InputLabel>
                <Select
                  margin="dense"
                  required
                  fullWidth
                  id="priority_level"
                  label="priority-label"
                  labelId="priority-label"
                  value={formData.priority_level}
                  onChange={handleFormChange}
                  name="priority_level"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  margin="dense"
                  required
                  fullWidth
                  label="Status"
                  labelId="status-label"
                  value={formData.status}
                  onChange={handleFormChange}
                  name="status"
                >
                  <MenuItem value="In Queue">In Queue</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="tag-label">Tag</InputLabel>
                <Select
                  margin="dense"
                  required
                  fullWidth
                  label="Tag"
                  labelId="tag-label"
                  name="tag"
                  value={formData.tag}
                  onChange={handleFormChange}
                >
                  <MenuItem value="Content">Content</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Dev">Dev</MenuItem>
                  <MenuItem value="Planning">Planning</MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid()}
              >
                Update Task
              </Button>
              {!isFormValid() && (
                <Typography color="error" variant="body2" align="center">
                  Some fields are missing information.
                </Typography>
              )}
            </Grid>

            {success && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={success}
              >
                <Alert
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="success"
                >
                  Task successfully updated !
                </Alert>
              </Backdrop>
            )}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditTask;
