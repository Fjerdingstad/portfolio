import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { grey } from "@mui/material/colors";
import AppBarComponent from "../../components/AppBarComponent";
import DrawerComponent from "../../components/DrawerComponent";
import DashboardList from "./DashboardList";
import Tasks from "../Tasks/Tasks";
import CreateTask from "../Tasks/CreateTask";
import EditTask from "../Tasks/EditTask";
import TaskDetails from "../Tasks/TaskDetails";
import Users from "../Users/Users";
import CreateUser from "../Users/CreateUser";
import UserEdit from "../Users/UserEdit";
import UserDetails from "../Users/UserDetails";
import Projects from "../Projects/Projects";
import ProjectDetails from "../Projects/ProjectDetails";
import { Toolbar } from "@mui/material";

// Context for managing color mode
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function Dashboard({
  tasks,
  fetchTasks,
  deleteTask,
  users_simplified,
  fetchUsers_Simplified,
  deleteUser_simplified,
  projects,
  fetchProjects,
  deleteProject,
}) {
  // State to manage drawer open/close
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // State to manage color mode
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Theme setup based on color mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  light: "#5dba8f",
                  main: "#1da299",
                  dark: "#097a73",
                  contrastText: "#fff",
                  warning: "#ff9900",
                  white: "#fff",
                  danger: "red",
                },
                secondary: {
                  light: "#ff7961",
                  main: "#dc4e56",
                  dark: "#ba000d",
                  contrastText: "#000",
                },
                white: {
                  main: "#fff",
                  contrastText: "#000",
                },
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                  light: grey[600],
                },
              }
            : {
                primary: {
                  light: "#5dba8f",
                  main: "#1da299",
                  dark: "#097a73",
                  contrastText: "#fff",
                  white: "#1d2930",
                  warning: "#ff9900",
                  danger: "red",
                },
                background: {
                  default: "#fff",
                  paper: "#1d2930",
                },
                secondary: {
                  light: "#ff7961",
                  main: "#dc4e56",
                  dark: "#ba000d",
                  contrastText: "#000",
                },
                white: {
                  main: "#1d2930",
                  contrastText: "#000",
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                  light: grey[400],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarComponent
              open={open}
              toggleDrawer={toggleDrawer}
              toggleColorMode={colorMode.toggleColorMode}
              mode={mode}
            />
            <DrawerComponent
              open={open}
              toggleDrawer={toggleDrawer}
              projects={projects}
              fetchProjects={fetchProjects}
            />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Routing for different components */}
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <DashboardList
                        tasks={tasks}
                        users_simplified={users_simplified}
                        projects={projects}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/tasks/create"
                    element={
                      <CreateTask
                        tasks={tasks}
                        fetchTasks={fetchTasks}
                        users_simplified={users_simplified}
                        projects={projects}
                      />
                    }
                  />
                  <Route
                    path="tasks/create/:projectId"
                    element={
                      <CreateTask
                        projects={projects}
                        users_simplified={users_simplified}
                        tasks={tasks}
                        fetchTasks={fetchTasks}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/tasks/*"
                    element={
                      <Tasks
                        tasks={tasks}
                        fetchTasks={fetchTasks}
                        deleteTask={deleteTask}
                        users_simplified={users_simplified}
                        projects={projects}
                      />
                    }
                  />
                  <Route
                    path="/tasks/edit/:id"
                    element={
                      <EditTask projects={projects} fetchTasks={fetchTasks} />
                    }
                  />
                  <Route
                    path="/tasks/details/:id"
                    element={
                      <TaskDetails
                        fetchTasks={fetchTasks}
                        projects={projects}
                        users_simplified={users_simplified}
                        deleteTask={deleteTask}
                      />
                    }
                  />
                  <Route
                    path="/users/*"
                    element={
                      <Users
                        users_simplified={users_simplified}
                        fetchUsers_Simplified={fetchUsers_Simplified}
                        deleteUser_simplified={deleteUser_simplified}
                      />
                    }
                  />
                  <Route
                    path="/users/create"
                    element={
                      <CreateUser
                        fetchUsers_Simplified={fetchUsers_Simplified}
                      />
                    }
                  />
                  <Route
                    path="/users/edit/:id"
                    element={
                      <UserEdit fetchUsers_Simplified={fetchUsers_Simplified} />
                    }
                  />
                  <Route path="/users/details/:id" element={<UserDetails />} />
                  <Route
                    path="/projects"
                    element={
                      <Projects
                        projects={projects}
                        fetchProjects={fetchProjects}
                        deleteProject={deleteProject}
                        users_simplified={users_simplified}
                        tasks={tasks}
                        fetchTasks={fetchTasks}
                      />
                    }
                  />
                  <Route
                    path="/projects/:id"
                    element={
                      <ProjectDetails
                        projects={projects}
                        fetchProjects={fetchProjects}
                        fetchTasks={fetchTasks}
                        deleteProject={deleteProject}
                        tasks={tasks}
                        users_simplified={users_simplified}
                        deleteTask={deleteTask}
                      />
                    }
                  />
                </Routes>
              </Container>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
