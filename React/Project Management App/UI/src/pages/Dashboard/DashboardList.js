import { Box, Typography } from "@mui/material";
import Statistics from "../../statistics/Statistics";
import DueTasks from "../Tasks/DueTasks";
import Greetings from "../../components/Greetings";

const DashboardList = ({ tasks, users_simplified, projects }) => {
  return (
    <>
      <Box sx={{ mb: "1em", display: "flex", alignItems: "center" }}>
        <Typography variant="h4">Dashboard</Typography>

        <Box sx={{ margin: "auto" }}></Box>
      </Box>
      <Greetings
        tasks={tasks}
        users_simplified={users_simplified}
        projects={projects}
      />
      <Statistics
        tasks={tasks}
        users_simplified={users_simplified}
        projects={projects}
      />
      <DueTasks
        tasks={tasks}
        users_simplified={users_simplified}
        projects={projects}
      />
    </>
  );
};

export default DashboardList;
