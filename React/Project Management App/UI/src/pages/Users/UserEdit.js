import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Avatar,
  Backdrop,
  Alert,
  IconButton,
  Autocomplete,
  Chip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserEdit = ({ fetchUsers_Simplified }) => {
  const { id } = useParams(); // Get the user ID from URL params
  const [user, setUser] = useState(null);
  const history = useNavigate();
  const [open, setOpen] = React.useState(false); // eslint-disable-line no-unused-vars
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
    role: [],
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users_simplified/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData);
        const roles = JSON.parse(userData.role);

        // Set initial form data based on the user
        setFormData({
          username: userData.username,
          email: userData.email,
          avatar: userData.avatar,
          role: roles,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/users_simplified/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      setSuccess(true);
      setOpen(true);
      setTimeout(() => {
        history(-1); // Navigate back to the previous page after a short delay
      }, 2000);
      await fetchUsers_Simplified();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  const navigateBack = (e) => {
    history(-1);
  };

  const isFormValid = () => {
    return formData.username !== "" && formData.role.length > 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (event, newValue) => {
    console.log("New Value:", newValue);
    console.log("Type of New Value:", typeof newValue);
    // Ensure that newValue is always an array
    const newRoles = Array.isArray(newValue) ? newValue : [newValue];
    console.log("New Roles:", newRoles);
    setFormData({ ...formData, role: newRoles });
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
          Editing User: {user.username}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar src={formData.avatar} sx={{ width: 100, height: 100 }} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                margin="dense"
                required
                fullWidth
                id="avatar"
                label="Avatar"
                type="text"
                name="avatar"
                autoComplete="user_avatar"
                autoFocus
                value={formData.avatar}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="username"
                label="Username"
                type="text"
                name="username"
                autoComplete="user_username"
                value={formData.username}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email"
                type="text"
                name="email"
                autoComplete="user_email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-filled"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                options={role.map((option) => option.name)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      sx={{
                        backgroundColor: role.find(
                          (role) => role.name === option
                        ).color,
                        color: "#fff",
                      }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Role(s)"
                    placeholder="Designer..."
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid()}
              >
                Update User
              </Button>
              {!isFormValid() && (
                <Typography color="error" variant="body2" align="center">
                  Some fields are missing information.
                </Typography>
              )}{" "}
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
                  User successfully updated !
                </Alert>
              </Backdrop>
            )}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

const role = [
  {
    name: "Designer",
    color: "#7057ff",
  },
  {
    name: "Developer",
    color: "#008672",
  },

  {
    name: "Illustrator",
    color: "#fd9154",
  },
  {
    name: "Manager",
    color: "#388d1f",
  },
];

export default UserEdit;
