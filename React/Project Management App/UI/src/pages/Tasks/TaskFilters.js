import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";

const TaskFilters = ({ onFilterChange, onCheckedFiltersChange }) => {
  const [filterValue, setFilterValue] = useState("");
  const [checkedFilters, setCheckedFilters] = useState({
    dueDate: false,
    low: false,
    medium: false,
    high: false,
    inQueue: false,
    inProgress: false,
    done: false,
    selectedUserId: null,
  });

  const [sortByMenuAnchorEl, setSortByMenuAnchorEl] = useState(null);
  // const [userFilterMenuAnchorEl, setUserFilterMenuAnchorEl] = useState(null);

  const openSortByMenu = Boolean(sortByMenuAnchorEl);
  // const openUserFilterMenu = Boolean(userFilterMenuAnchorEl);

  const handleSortByMenuClick = (event) => {
    setSortByMenuAnchorEl(event.currentTarget);
  };

  // const handleUserFilterMenuClick = (event) => {
  //   setUserFilterMenuAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setSortByMenuAnchorEl(null);
    // setUserFilterMenuAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name.startsWith("user-")) {
      const userId = name.split("-")[1];
      setCheckedFilters((prevFilters) => ({
        ...prevFilters,
        selectedUserId: checked ? userId : null,
      }));
    } else {
      setCheckedFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
      }));
      onCheckedFiltersChange((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
      }));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          margin: "auto",
          justifyContent: "end",
        }}
      >
        <TextField
          variant="outlined"
          id="filter"
          label="Task Search"
          name="filter"
          autoComplete="filter"
          value={filterValue}
          onChange={handleFilterChange}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.white,
          }}
        />

        <div>
          <Button
            color="white"
            id="sort-by-button"
            aria-controls={openSortByMenu ? "sort-by-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openSortByMenu ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleSortByMenuClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ height: 1 }}
          >
            <Typography variant="body2" color="text.primary">
              Sort By
            </Typography>
          </Button>
          <Menu
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            id="sort-by-menu"
            anchorEl={sortByMenuAnchorEl}
            open={openSortByMenu}
            onClose={handleMenuClose}
          >
            <MenuItem disableRipple>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Due Dates"
                  name="dueDate"
                  checked={checkedFilters.dueDate}
                  onChange={handleCheckboxChange}
                />
              </FormGroup>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem disableRipple>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  label="Low"
                  name="low"
                  checked={checkedFilters.low}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="warning" />}
                  label="Medium"
                  name="medium"
                  checked={checkedFilters.medium}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="error" />}
                  label="High"
                  name="high"
                  checked={checkedFilters.high}
                  onChange={handleCheckboxChange}
                />
              </FormGroup>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem disableRipple>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="In Queue"
                  name="inQueue"
                  checked={checkedFilters.inQueue}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="secondary" />}
                  label="In Progress"
                  name="inProgress"
                  checked={checkedFilters.inProgress}
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox color="info" />}
                  label="Done"
                  name="done"
                  checked={checkedFilters.done}
                  onChange={handleCheckboxChange}
                />
              </FormGroup>
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default TaskFilters;
