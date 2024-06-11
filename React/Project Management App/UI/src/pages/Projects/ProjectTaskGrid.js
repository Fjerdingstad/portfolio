import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";

const ProjectTaskGrid = ({
  tasks,
  fetchTasks,
  users_simplified,
  deleteTask,
}) => {
  const inQueueTasks = tasks.filter((task) => task.status === "In Queue");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");
  const numInQueueTasks = inQueueTasks.length;
  const numInProgressTasks = inProgressTasks.length;
  const numDoneTasks = doneTasks.length;

  const navigate = useNavigate();
  const [hoveredTask, setHoveredTask] = useState(null);
  const [anchorEls, setAnchorEls] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const handleTaskHover = (taskId) => {
    setHoveredTask(taskId);
  };
  const handleTaskMouseLeave = () => {
    setHoveredTask(null);
  };
  const handleMenuOpen = (event, taskId) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[taskId] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };
  const handleMenuClose = (taskId, action) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[taskId] = null;
    setAnchorEls(newAnchorEls);

    if (action === "delete") {
      const taskToDelete = tasks.find((task) => task.task_id === taskId);
      setTaskToDelete(taskToDelete);
      setDialogOpen(true);
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    if (taskToDelete) {
      await deleteTask(taskToDelete.task_id);
      await fetchTasks();
      setTaskToDelete(null);
    }
  };

  const handleEditClick = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  const handleDetailsClick = (taskId) => {
    navigate(`/tasks/details/${taskId}`);
  };

  const userMap = users_simplified.reduce((map, user) => {
    map[user.user_id] = user;
    return map;
  }, {});

  // Function to format the due date based on the user's locale
  const formatDate = (dueDate) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dueDate).toLocaleDateString(navigator.language, options);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            In Queue
            <Badge
              badgeContent={numInQueueTasks}
              color="info"
              sx={{ right: -10, ml: "0.25em" }}
            ></Badge>
          </Typography>
          <Divider color="#2979ff" sx={{ height: 3, mb: 2 }} />
          {inQueueTasks.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No tasks in queue
            </Typography>
          ) : (
            inQueueTasks.map((task) => (
              <Paper
                elevation={5}
                key={task.task_id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderBottom: "2px solid ",
                  borderBottomColor: "#2979ff",
                }}
                onMouseEnter={() => handleTaskHover(task.task_id)}
                onMouseLeave={handleTaskMouseLeave}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <div
                      style={{
                        backgroundColor: `${getTagColor(task.tag)}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "25%",
                        marginBottom: "1em",
                      }}
                    >
                      <Typography variant="body2">{task.tag}</Typography>
                    </div>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        sx={{ p: 0 }}
                        onClick={(event) => handleMenuOpen(event, task.task_id)}
                        style={{
                          visibility:
                            hoveredTask === task.task_id ? "visible" : "hidden",
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEls[task.task_id]}
                        open={Boolean(anchorEls[task.task_id])}
                        onClose={() => handleMenuClose(task.task_id)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem
                          onClick={() =>
                            handleDetailsClick(task.task_id, "details")
                          }
                        >
                          Details
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEditClick(task.task_id, "edit")}
                        >
                          Edit
                        </MenuItem>

                        <MenuItem
                          onClick={() =>
                            handleMenuClose(task.task_id, "delete")
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginBottom: "1em",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">{task.title}</Typography>

                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {task.description}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ mr: 1, ml: 1 }}
                      alt={userMap[task.user_id].username}
                      src={userMap[task.user_id].avatar}
                    />
                    <div
                      style={{
                        backgroundColor: `${getPriorityColor(
                          task.priority_level
                        )}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "20%",
                        fontSize: "0.75em",
                      }}
                    >
                      {task.priority_level}
                    </div>
                    <Box sx={{ margin: "auto", display: "flex" }}>
                      <AccessTimeIcon
                        sx={{ marginRight: "0.25em", color: "gray" }}
                      />
                      {formatDate(task.due_date)}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            In Progress
            <Badge
              badgeContent={numInProgressTasks}
              color="warning"
              sx={{ right: -10, ml: "0.25em" }}
            ></Badge>
          </Typography>
          <Divider color="orange" sx={{ height: 3, mb: 2 }} />
          {inProgressTasks.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No tasks in progress
            </Typography>
          ) : (
            inProgressTasks.map((task) => (
              <Paper
                key={task.task_id}
                elevation={5}
                sx={{
                  p: 2,
                  mb: 2,
                  borderBottom: "2px solid ",
                  borderBottomColor: "primary.warning",
                }}
                onMouseEnter={() => handleTaskHover(task.task_id)}
                onMouseLeave={handleTaskMouseLeave}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <div
                      style={{
                        backgroundColor: `${getTagColor(task.tag)}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "25%",
                        marginBottom: "1em",
                      }}
                    >
                      <Typography variant="body2">{task.tag}</Typography>
                    </div>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        sx={{ p: 0 }}
                        onClick={(event) => handleMenuOpen(event, task.task_id)}
                        style={{
                          visibility:
                            hoveredTask === task.task_id ? "visible" : "hidden",
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEls[task.task_id]}
                        open={Boolean(anchorEls[task.task_id])}
                        onClose={() => handleMenuClose(task.task_id)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem
                          onClick={() =>
                            handleDetailsClick(task.task_id, "details")
                          }
                        >
                          Details
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEditClick(task.task_id, "edit")}
                        >
                          Edit
                        </MenuItem>

                        <MenuItem
                          onClick={() =>
                            handleMenuClose(task.task_id, "delete")
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginBottom: "1em",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">{task.title}</Typography>

                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {task.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ mr: 1, ml: 1 }}
                      alt={userMap[task.user_id].username}
                      src={userMap[task.user_id].avatar}
                    />
                    <div
                      style={{
                        backgroundColor: `${getPriorityColor(
                          task.priority_level
                        )}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "20%",
                        fontSize: "0.75em",
                      }}
                    >
                      {task.priority_level}
                    </div>
                    <Box sx={{ margin: "auto", display: "flex" }}>
                      <AccessTimeIcon
                        sx={{ marginRight: "0.25em", color: "gray" }}
                      />
                      {formatDate(task.due_date)}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Done
            <Badge
              badgeContent={numDoneTasks}
              color="success"
              sx={{ right: -10, ml: "0.25em" }}
            ></Badge>
          </Typography>

          <Divider color="success" sx={{ height: 3, mb: 2 }} />
          {doneTasks.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No tasks done
            </Typography>
          ) : (
            doneTasks.map((task) => (
              <Paper
                key={task.task_id}
                elevation={5}
                sx={{
                  p: 2,
                  mb: 2,
                  borderBottom: "2px solid ",
                  borderBottomColor: "#00CE00",
                }}
                onMouseEnter={() => handleTaskHover(task.task_id)}
                onMouseLeave={handleTaskMouseLeave}
              >
                <Box>
                  <Box sx={{ display: "flex" }}>
                    <div
                      style={{
                        backgroundColor: `${getTagColor(task.tag)}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "25%",
                        marginBottom: "1em",
                      }}
                    >
                      <Typography variant="body2">{task.tag}</Typography>
                    </div>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        sx={{ p: 0 }}
                        onClick={(event) => handleMenuOpen(event, task.task_id)}
                        style={{
                          visibility:
                            hoveredTask === task.task_id ? "visible" : "hidden",
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEls[task.task_id]}
                        open={Boolean(anchorEls[task.task_id])}
                        onClose={() => handleMenuClose(task.task_id)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem
                          onClick={() =>
                            handleDetailsClick(task.task_id, "details")
                          }
                        >
                          Details
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleEditClick(task.task_id, "edit")}
                        >
                          Edit
                        </MenuItem>

                        <MenuItem
                          onClick={() =>
                            handleMenuClose(task.task_id, "delete")
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginBottom: "1em",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body1">{task.title}</Typography>

                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {task.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ mr: 1, ml: 1 }}
                      alt={userMap[task.user_id].username}
                      src={userMap[task.user_id].avatar}
                    />
                    <div
                      style={{
                        backgroundColor: `${getPriorityColor(
                          task.priority_level
                        )}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "20%",
                        fontSize: "0.75em",
                      }}
                    >
                      {task.priority_level}
                    </div>
                    <Box sx={{ margin: "auto", display: "flex" }}>
                      <AccessTimeIcon
                        sx={{ marginRight: "0.25em", color: "gray" }}
                      />
                      {formatDate(task.due_date)}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        <DialogContent>
          {taskToDelete && (
            <div>
              <Typography variant="h6" color="primary.light">
                {taskToDelete.title}
              </Typography>

              <Typography variant="subtitle1" color="primary.light">
                {taskToDelete.description}
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
    </>
  );
};

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

export default ProjectTaskGrid;
