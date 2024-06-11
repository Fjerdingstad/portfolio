import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import StatsProjects from "./StatsProjects";
import StatsUsers from "./StatsUsers";
import StatsTasks from "./StatsTasks";

const Statistics = ({ tasks, users_simplified, projects }) => {
  return (
    <>
      <Box sx={{ mb: "0.5em", display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Statistics</Typography>

        <Box sx={{ margin: "auto" }}></Box>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={4}>
          <StatsProjects tasks={tasks} projects={projects} />
        </Grid>
        <Grid item xs={4}>
          <StatsTasks tasks={tasks} />
        </Grid>
        <Grid item xs={4}>
          <StatsUsers users_simplified={users_simplified} />
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
