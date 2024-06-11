import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/users">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton component={Link} to="/projects">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="All Projects" />
    </ListItemButton>
    <ListItemButton component={Link} to="/tasks">
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <ListItemText primary="All Tasks" />
    </ListItemButton>
  </React.Fragment>
);

export const projectsList = ({ projects, fetchProjects }) => {
  const handleAddProject = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: "New Project",
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
    <React.Fragment>
      <ListItemButton onClick={handleAddProject}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add a project" />
      </ListItemButton>
      {projects.map((project) => (
        <ListItemButton
          key={project.project_id}
          component={Link}
          to={`/projects/${project.project_id}`}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={project.project_name} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
