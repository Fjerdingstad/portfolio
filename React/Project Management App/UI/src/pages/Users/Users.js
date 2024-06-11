import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UsersList from "./UsersList";
import CreateUser from "./CreateUser";

const Users = ({ users_simplified, deleteUser_simplified }) => {
  const numUsers = users_simplified.length;
  return (
    <>
      <Box sx={{ mb: "1em", display: "flex", alignItems: "center" }}>
        <Typography variant="h4">User List</Typography>
        <Typography sx={{ ml: "1em" }} variant="body1" color="text.light">
          {numUsers} Users
        </Typography>
        <Box sx={{ margin: "auto" }}></Box>
        <Button variant="contained" component={Link} to="/users/create">
          <PersonAddIcon sx={{ mr: 1 }} /> Create User
        </Button>
      </Box>

      <Routes>
        <Route
          path="/"
          element={
            <UsersList
              users_simplified={users_simplified}
              deleteUser_simplified={deleteUser_simplified}
            />
          }
        />
        <Route path="create" element={<CreateUser />} />
      </Routes>
    </>
  );
};

export default Users;
