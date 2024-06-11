import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

const StatsUsers = ({ users_simplified }) => {
  const numUsers = users_simplified.length;
  return (
    <Box>
      <Paper
        className="task-paper"
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "165px",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {numUsers}
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
              }}
            >
              <IconButton
                sx={{
                  backgroundColor: "rgb(41, 121, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgb(41, 121, 255, 0.2)",
                    cursor: "default",
                  },
                }}
              >
                <GroupIcon sx={{ color: "#2979FF" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left", mb: "1em" }}>
          <Typography sx={{ color: "text.light" }}>Total Users</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarGroup max={5}>
              {users_simplified.map((user) => (
                <Avatar
                  key={user.user_id}
                  src={user.avatar}
                  alt={user.username}
                />
              ))}
            </AvatarGroup>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatsUsers;
