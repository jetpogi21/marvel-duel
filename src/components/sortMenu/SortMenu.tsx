import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { SortOptions } from "../../interfaces/GeneralInterfaces";

interface SortMenuProps {
  sortOptions: SortOptions;
  modifySort: (name: string, sortOptions: SortOptions) => void;
}

const SortIcon = (sortDirection: any) => {
  return (
    <ListItemIcon sx={{ color: "white" }}>
      {sortDirection === "desc" ? (
        <ArrowDownwardIcon sx={{ ml: "auto" }} fontSize="small" />
      ) : (
        <ArrowUpwardIcon sx={{ ml: "auto" }} fontSize="small" />
      )}
    </ListItemIcon>
  );
};

const SortMenu = ({ sortOptions, modifySort }: SortMenuProps) => {
  //console.log({ sortOptions });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const maxLength = Math.max(
    ...sortOptions.list.map((item) => item.caption.length)
  );

  //Get the current sort caption..
  const sortOptionName = sortOptions.sortedBy[0];
  const sortList = sortOptions.list;
  const sortDirection = sortOptions.sortedBy[1];
  const currentCaption = sortList.find(
    (item) => item.name === sortOptionName
  )?.caption;

  return (
    <Box>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {currentCaption}
        {SortIcon(sortDirection)}
        {/* <SortIcon sortDirection={sortDirection} /> */}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {sortOptions.list.map((item) => (
          <MenuItem
            onClick={() => {
              modifySort(item.name, sortOptions);
              setAnchorEl(null);
            }}
            key={item.name}
          >
            <ListItemText sx={{ width: `${maxLength}ch` }}>
              {item.caption}
            </ListItemText>
            {sortOptions.sortedBy[0] === item.name && (
              <ListItemIcon>
                {sortOptions.sortedBy[1] === "desc" ? (
                  <ArrowDownwardIcon sx={{ ml: "auto" }} fontSize="small" />
                ) : (
                  <ArrowUpwardIcon sx={{ ml: "auto" }} fontSize="small" />
                )}
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SortMenu;
