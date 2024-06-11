import React, { useState, useEffect } from "react";
import "./assets/css/App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  // State variables to store users, tasks, and projects data
  const [users_simplified, setUsers_simplified] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch users, tasks, and projects data when the component mounts
  useEffect(() => {
    fetchUsers_Simplified();
    fetchTasks();
    fetchProjects();
  }, []); // empty dependency array to make it only run once

  // Function to fetch simplified user data from the server
  const fetchUsers_Simplified = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users_simplified"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers_simplified(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Function to delete a user from the server and update the state
  const deleteUser_simplified = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users_simplified/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the state
      setUsers_simplified(
        users_simplified.filter((user) => user.user_id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to fetch tasks data from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to delete a task from the server and update the state
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Remove the deleted task from the state
      setTasks(tasks.filter((task) => task.task_id !== taskId));

      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to fetch projects data from the server
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Function to delete a project from the server and update the state
  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      // Remove the deleted task from the state
      setProjects(
        projects.filter((project) => project.project_id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Render the Dashboard component with data and functions as props
  return (
    <div className="App">
      <Dashboard
        tasks={tasks}
        fetchTasks={fetchTasks}
        deleteTask={deleteTask}
        users_simplified={users_simplified}
        fetchUsers_Simplified={fetchUsers_Simplified}
        deleteUser_simplified={deleteUser_simplified}
        projects={projects}
        fetchProjects={fetchProjects}
        deleteProject={deleteProject}
      />
    </div>
  );
}

export default App;
