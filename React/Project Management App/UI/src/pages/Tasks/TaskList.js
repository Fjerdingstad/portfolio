import React, { useState } from "react";
import TaskProgress from "./TaskProgress";
import TaskTable from "./TaskTable";
import TaskFilters from "./TaskFilters";

const TaskList = ({
  tasks,
  users,
  deleteTask,
  users_simplified,
  projects,
  fetchTasks,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [checkedFilters, setCheckedFilters] = useState({
    dueDate: false,
    low: false,
    medium: false,
    high: false,
    inQueue: false,
    inProgress: false,
    done: false,
  });

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleCheckedFiltersChange = (newFilters) => {
    setCheckedFilters(newFilters);
  };

  return (
    <>
      <TaskProgress tasks={tasks} />
      <TaskFilters
        onFilterChange={handleFilterChange}
        onCheckedFiltersChange={handleCheckedFiltersChange}
        users={users}
        tasks={tasks}
        users_simplified={users_simplified}
        projects={projects}
      />
      <TaskTable
        filterValue={filterValue}
        checkedFilters={checkedFilters}
        tasks={tasks}
        fetchTasks={fetchTasks}
        users_simplified={users_simplified}
        users={users}
        deleteTask={deleteTask}
        projects={projects}
      />
    </>
  );
};

export default TaskList;
