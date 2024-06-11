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
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateTask = ({ users_simplified, projects, fetchTasks }) => {
  const { projectId } = useParams(); // Get the project ID from URL params
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_id: projectId || "",
    due_date: "",
    priority_level: "",
    status: "",
    tag: "",
    user_id: "",
  });

  const history = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setFormData({ ...formData, user_id: userId });
  };

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    setFormData({ ...formData, project_id: projectId });
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
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      setOpen(true);
      setTimeout(() => {
        history(-1); // Navigate back to the previous page after a short delay
      }, 2000);
      await fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

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
      formData.status !== "" &&
      formData.tag !== ""
    );
  };

  return (
    <>
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
            <TaskAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Task
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                    onChange={handleProjectChange}
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
                    onChange={handleUserChange}
                  >
                    {users_simplified.map((user) => (
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
                  onChange={handleChange}
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority_level: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, tag: e.target.value })
                    }
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
                  Add Task
                </Button>
                {!isFormValid() && (
                  <Typography color="error" variant="body2" align="center">
                    Some fields are missing information.
                  </Typography>
                )}
              </Grid>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
              >
                <Alert
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="success"
                >
                  Task successfully created !
                </Alert>
              </Backdrop>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default CreateTask;
