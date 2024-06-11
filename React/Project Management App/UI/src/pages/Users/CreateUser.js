import {
  Alert,
  Autocomplete,
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

import CheckIcon from "@mui/icons-material/Check";

const CreateUser = ({ fetchUsers_Simplified }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: undefined,
    role: [],
  });

  const isFormValid = () => {
    return formData.username !== "" && formData.role.length > 0;
  };

  const history = useNavigate();

  const navigateBack = (e) => {
    history(-1);
  };

  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event, newValue) => {
    setFormData({ ...formData, role: newValue }); // Set the role state with the selected values
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Serialize roles array into a single string separated by commas
    const rolesString = formData.role.join(",");

    const userData = {
      username: formData.username,
      email: formData.email,
      avatar: formData.avatar,
      role: rolesString,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users_simplified",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      setOpen(true);
      setTimeout(() => {
        history(-1);
      }, 2000);

      await fetchUsers_Simplified();
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
                <Avatar
                  src={formData.avatar}
                  sx={{ width: 100, height: 100 }}
                />
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
                  fullWidth
                  id="avatar"
                  label="Avatar Url"
                  name="avatar"
                  autoComplete="avatar"
                  value={formData.avatar || ""}
                  onChange={handleChange}
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
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  fullWidth
                  id="email"
                  label="Email"
                  type="text"
                  name="email"
                  autoComplete="user_email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  required
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
                  Add User
                </Button>
                {!isFormValid() && (
                  <Typography color="error" variant="body2">
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
                  User successfully created !
                </Alert>
              </Backdrop>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </>
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

export default CreateUser;
