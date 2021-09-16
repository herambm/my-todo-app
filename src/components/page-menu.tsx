import * as React from "react";
import { List, ListItem, ListItemIcon, makeStyles } from "@material-ui/core";
import { DoneAll, Flare, LabelImportant } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  pageMenu: {
    padding: "2rem",
  },
});

export const PageMenu = () => {
  const classes = useStyles();

  return (
    <List className={classes.pageMenu}>
      <ListItem button key="page-menu-all">
        <ListItemIcon>
          <DoneAll />
        </ListItemIcon>
        <Link to="/">All</Link>
      </ListItem>
      <ListItem button key="page-menu-my-day">
        <ListItemIcon>
          <Flare />
        </ListItemIcon>
        <Link to="/my-day">My day</Link>
      </ListItem>
      <ListItem button key="page-menu-important">
        <ListItemIcon>
          <LabelImportant />
        </ListItemIcon>
        <Link to="/important">Important</Link>
      </ListItem>
    </List>
  );
};
