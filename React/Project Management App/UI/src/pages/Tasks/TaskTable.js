import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const TaskTable = ({
  filterValue,
  checkedFilters,
  tasks,
  fetchTasks,
  users_simplified,
  deleteTask,
  projects,
}) => {
  const [hoveredTask, setHoveredTask] = useState(null);
  const [anchorEls, setAnchorEls] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

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
      setTaskToDelete(null);
      await fetchTasks();
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
  const projectMap = projects.reduce((map, project) => {
    map[project.project_id] = project;
    return map;
  }, {});
  // Function to format the due date based on the user's locale
  const formatDate = (dueDate) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dueDate).toLocaleDateString(navigator.language, options);
  };

  const filteredTasks =
    tasks &&
    tasks
      .filter((task) => {
        if (
          filterValue &&
          !task.title.toLowerCase().includes(filterValue.toLowerCase())
        ) {
          return false;
        }

        const noFiltersChecked =
          !checkedFilters.low &&
          !checkedFilters.medium &&
          !checkedFilters.high &&
          !checkedFilters.inQueue &&
          !checkedFilters.inProgress &&
          !checkedFilters.done;

        if (noFiltersChecked) {
          return true;
        }

        const priorityFilterMatch =
          (checkedFilters.low && task.priority_level === "Low") ||
          (checkedFilters.medium && task.priority_level === "Medium") ||
          (checkedFilters.high && task.priority_level === "High");

        const statusFilterMatch =
          (!checkedFilters.inQueue || task.status === "In Queue") &&
          (!checkedFilters.inProgress || task.status === "In Progress") &&
          (!checkedFilters.done || task.status === "Done");

        if (
          (checkedFilters.done ||
            checkedFilters.inQueue ||
            checkedFilters.inProgress) &&
          !checkedFilters.low &&
          !checkedFilters.medium &&
          !checkedFilters.high
        ) {
          return (
            (checkedFilters.done && task.status === "Done") ||
            (checkedFilters.inQueue && task.status === "In Queue") ||
            (checkedFilters.inProgress && task.status === "In Progress")
          );
        }

        if (
          (checkedFilters.low ||
            checkedFilters.medium ||
            checkedFilters.high) &&
          (checkedFilters.done ||
            checkedFilters.inQueue ||
            checkedFilters.inProgress)
        ) {
          return (
            priorityFilterMatch &&
            ((checkedFilters.done && task.status === "Done") ||
              (checkedFilters.inQueue && task.status === "In Queue") ||
              (checkedFilters.inProgress && task.status === "In Progress"))
          );
        }

        return priorityFilterMatch && statusFilterMatch;
      })
      .sort((a, b) => {
        if (checkedFilters.dueDate) {
          return dayjs(a.due_date).isAfter(dayjs(b.due_date)) ? 1 : -1;
        }
        return 0;
      });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper sx={{ p: 0, display: "flex", flexDirection: "column" }}>
            <Grid container spacing={0} sx={{ mt: 2, mb: 2 }}>
              <Grid item xs>
                <div>User</div>
              </Grid>
              <Grid item xs>
                <div>Task</div>
              </Grid>
              <Grid item xs>
                <div>Project</div>
              </Grid>
              <Grid item xs>
                <div>Status</div>
              </Grid>
              <Grid item xs>
                <div>Priority</div>
              </Grid>
              <Grid item xs={1}>
                <div>Due Date</div>
              </Grid>
              <IconButton
                style={{
                  visibility: "hidden",
                }}
              >
                <MoreVert />
              </IconButton>
            </Grid>
            <Divider />
            {filteredTasks.map((task) => (
              <React.Fragment key={task.task_id}>
                <Grid
                  container
                  spacing={0}
                  sx={{
                    mt: 2,
                    mb: 2,
                    alignItems: "center",
                  }}
                  onMouseEnter={() => handleTaskHover(task.task_id)}
                  onMouseLeave={handleTaskMouseLeave}
                >
                  <Grid item xs key={task.task_id}>
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        alignText: "center",
                      }}
                    >
                      <div>
                        <Avatar
                          sx={{ mr: 3, ml: 3 }}
                          alt={userMap[task.user_id].username}
                          src={userMap[task.user_id].avatar}
                        />
                      </div>
                      <div>{userMap[task.user_id].username}</div>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <div>{task.title}</div>
                  </Grid>
                  <Grid item xs>
                    <div>{projectMap[task.project_id].project_name}</div>
                  </Grid>
                  <Grid item xs>
                    <div>{task.status}</div>
                  </Grid>
                  <Grid item xs>
                    <div
                      style={{
                        backgroundColor: `${getPriorityColor(
                          task.priority_level
                        )}`,
                        color: "white",
                        borderRadius: "100px",
                        padding: "5px",
                        width: "35%",
                        margin: "auto",
                      }}
                    >
                      {task.priority_level}
                    </div>
                  </Grid>

                  <Grid item xs={1}>
                    <div>{formatDate(task.due_date)}</div>
                  </Grid>
                  <IconButton
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
                      onClick={() => handleMenuClose(task.task_id, "delete")}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </Grid>
              </React.Fragment>
            ))}
          </Paper>
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

export default TaskTable;
