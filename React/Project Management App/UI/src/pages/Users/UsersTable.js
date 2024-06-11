import {
  Avatar,
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

const UsersTable = ({ users_simplified, deleteUser_simplified }) => {
  const [hoveredUser, setHoveredUser] = useState(null);
  const navigate = useNavigate();
  const [anchorEls, setAnchorEls] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleUserHover = (userId) => {
    setHoveredUser(userId);
  };

  const handleUserMouseLeave = () => {
    setHoveredUser(null);
  };

  const handleEditClick = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDetailsClick = (userId) => {
    navigate(`/users/details/${userId}`);
  };

  const handleMenuOpen = (event, userId) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[userId] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuClose = (userId, action) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[userId] = null;
    setAnchorEls(newAnchorEls);

    if (action === "delete") {
      const userToDelete = users_simplified.find(
        (user) => user.user_id === userId
      );
      setUserToDelete(userToDelete);
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    if (userToDelete) {
      await deleteUser_simplified(userToDelete.user_id);
      setUserToDelete(null);
    }
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
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper sx={{ p: 0, display: "flex", flexDirection: "column" }}>
              <Grid container spacing={0} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs>
                  <div>User</div>
                </Grid>
                <Grid item xs>
                  <div>Role</div>
                </Grid>
                <Grid item xs>
                  <div>Email</div>
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
              {users_simplified.map((user) => (
                <React.Fragment key={user.user_id}>
                  <Grid
                    container
                    spacing={0}
                    sx={{
                      mt: 2,
                      mb: 2,
                      alignItems: "center",
                    }}
                    onMouseEnter={() => handleUserHover(user.user_id)}
                    onMouseLeave={handleUserMouseLeave}
                  >
                    <Grid item xs key={user.user_id}>
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
                            alt={user.avatar}
                            src={user.avatar}
                          />
                        </div>
                        <div>{user.username}</div>
                      </Grid>
                    </Grid>
                    <Grid item xs sx={{ display: "flex" }}>
                      {JSON.parse(user.role).map((role, index) => (
                        <div key={index} className={getRoleClassName(role)}>
                          {role}
                        </div>
                      ))}
                    </Grid>
                    <Grid item xs>
                      <div>{user.email}</div>
                    </Grid>
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, user.user_id)}
                      style={{
                        visibility:
                          hoveredUser === user.user_id ? "visible" : "hidden",
                      }}
                    >
                      <MoreVert />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEls[user.user_id]}
                      open={Boolean(anchorEls[user.user_id])}
                      onClose={() => handleMenuClose(user.user_id)}
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
                          handleDetailsClick(user.user_id, "details")
                        }
                      >
                        Details
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleEditClick(user.user_id, "edit")}
                      >
                        Edit
                      </MenuItem>

                      <MenuItem
                        onClick={() => handleMenuClose(user.user_id, "delete")}
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
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
          <DialogContent>
            {userToDelete && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: "75px", height: "75px" }}
                    alt={userToDelete.avatar}
                    src={userToDelete.avatar}
                  />

                  <Typography variant="subtitle1" color="primary.light">
                    {userToDelete.username}
                  </Typography>
                </Box>
              </>
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
      </Box>
    </>
  );
};

export default UsersTable;
