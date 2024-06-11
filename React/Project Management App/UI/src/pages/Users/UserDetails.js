import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams(); // Get the user ID from URL params
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users_simplified/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch task data");
        }
        const taskData = await response.json();
        setUser(taskData);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }
  const navigateBack = (e) => {
    history(-1);
  };

  const getRoleClassName = (role) => {
    switch (role) {
      case "Designer":
        return "role-designer";
      case "Developer":
        return "role-developer";
      case "Illustrator":
        return "role-illustrator";
      case "Manager":
        return "role-manager";
      default:
        return ""; // default color or class if role is not specified
    }
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
          <InfoIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          User Details
        </Typography>
        <Avatar
          sx={{ mr: 3, ml: 3, width: 100, height: 100 }}
          alt={user.avatar}
          src={user.avatar}
        />
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {user.username}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {user.email}
        </Typography>
        <Grid container sx={{ width: "50%" }}>
          {JSON.parse(user.role).map((role, index) => (
            <div key={index} className={getRoleClassName(role)}>
              {role}
            </div>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default UserDetails;
