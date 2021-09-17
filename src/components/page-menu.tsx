import * as React from "react";
import {
  Box,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { DoneAll, Flare, LabelImportant } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  pageMenu: {
    width: "25%",
  },
  pageMenuItem: {
    minHeight: "3.6rem",
    height: "3.6rem",
  },
});

export const PageMenu = () => {
  const classes = useStyles();
  const linkStyle = React.useRef({
    style: {
      color: "inherit",
      textDecoration: "inherit",
    },
  });
  // TODO: Fix accessibility
  return (
    <MenuList className={classes.pageMenu} disablePadding={true}>
      <NavLink to="/" style={linkStyle.current.style}>
        <MenuItem button key="page-menu-all" className={classes.pageMenuItem}>
          <ListItemIcon>
            <DoneAll />
          </ListItemIcon>
          <Box>All</Box>
        </MenuItem>
      </NavLink>
      <NavLink to="/my-day" style={linkStyle.current.style}>
        <MenuItem
          button
          key="page-menu-my-day"
          className={classes.pageMenuItem}
        >
          <ListItemIcon>
            <Flare />
          </ListItemIcon>
          <Box>My day</Box>
        </MenuItem>
      </NavLink>
      <NavLink to="/important" style={linkStyle.current.style}>
        <MenuItem
          button
          key="page-menu-important"
          className={classes.pageMenuItem}
        >
          <ListItemIcon>
            <LabelImportant />
          </ListItemIcon>
          <Box>Important</Box>
        </MenuItem>
      </NavLink>
    </MenuList>
  );
};
