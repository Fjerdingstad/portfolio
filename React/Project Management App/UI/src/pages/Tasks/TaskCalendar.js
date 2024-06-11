import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Typography } from "@mui/material";

function ServerDay({
  highlightedDays = [],
  day,
  outsideCurrentMonth,
  tasks,
  setSelectedTask,
  setSelectedDate,
  ...other
}) {
  // Check if tasks is an array before filtering
  const filteredTasks = Array.isArray(tasks) ? tasks : [];

  // Filter tasks that have the same due date as the current day and are either "In Queue" or "In Progress"
  const tasksForDay = filteredTasks.filter(
    (task) =>
      dayjs(task.due_date).isSame(day, "day") &&
      (task.status === "In Queue" || task.status === "In Progress")
  );

  // Calculate the number of tasks for the current day
  const numTasksForDay = tasksForDay.length;

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDays.some((date) => date.isSame(day, "day"));

  const handleClick = () => {
    setSelectedTask(tasksForDay); // Set tasks for the selected date
    setSelectedDate(day); // Update the selected date
  };

  // Determine if the current day is in the past
  const isPast = dayjs().isAfter(day, "day");

  return (
    <>
      {isSelected && (
        <Badge
          key={day.toString()}
          overlap="circular"
          badgeContent={numTasksForDay}
          color={isPast ? "error" : "warning"}
        >
          <PickersDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            onClick={handleClick} // Call handleClick when a day with a badge is clicked
          />
        </Badge>
      )}
      {!isSelected && (
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          onClick={handleClick} // Call handleClick when a day without a badge is clicked
        />
      )}
    </>
  );
}

const TaskCalendar = ({ tasks }) => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);

  // Ensure tasks is an array, or default to an empty array
  const filteredTasks = Array.isArray(tasks) ? tasks : [];

  // Extract due dates from tasks
  const dueDates = filteredTasks.map((task) =>
    dayjs(task.due_date).startOf("day")
  );

  const [highlightedDays, setHighlightedDays] = React.useState(dueDates);

  React.useEffect(() => {
    // Ensure tasks is an array, or default to an empty array
    const filteredTasks = Array.isArray(tasks) ? tasks : [];

    // Extract due dates from tasks
    const dueDates = filteredTasks.map((task) =>
      dayjs(task.due_date).startOf("day")
    );

    setHighlightedDays(dueDates);
  }, [tasks]);

  // useEffect to update highlightedDays when tasks change
  React.useEffect(() => {
    const filteredTasks = Array.isArray(tasks) ? tasks : [];
    const dueDates = filteredTasks.map((task) =>
      dayjs(task.due_date).startOf("day")
    );

    setHighlightedDays(dueDates);
  }, [tasks]);

  const handleClickNavigate = (taskId) => {
    navigate(`/tasks/details/${taskId}`);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          slots={{
            day: (props) => (
              <ServerDay
                {...props}
                tasks={filteredTasks}
                setSelectedDate={setSelectedDate}
                setSelectedTask={setSelectedTask}
              />
            ), // Pass filteredTasks instead of tasks
          }}
          slotProps={{
            day: {
              highlightedDays,
              tasks: filteredTasks, // Pass filteredTasks here as well
            },
          }}
        />
      </LocalizationProvider>
      {selectedDate && (
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {selectedDate.format("MMMM D, YYYY")}
        </Typography>
      )}
      {selectedTask && selectedTask.length > 0 ? (
        <Box sx={{ pb: "1em" }}>
          {selectedTask.map((task, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    color: (theme) =>
                      theme.palette.mode === "main" ? "#1da299" : "#1da299",
                  },
                }}
                onClick={() => handleClickNavigate(task.task_id)}
              >
                {task.title}
                <span style={{ color: "grey", marginLeft: "0.25em" }}>
                  ({task.status}){index < selectedTask.length - 1 && ", "}
                </span>
              </Typography>
            </React.Fragment>
          ))}
        </Box>
      ) : (
        selectedDate && (
          <Typography sx={{ pb: "1em" }} variant="body2">
            No tasks due to this day
          </Typography>
        )
      )}
    </>
  );
};

export default TaskCalendar;
