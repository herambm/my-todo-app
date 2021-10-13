import * as React from "react";
import {
  Box,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const useStyles = makeStyles({
  todoMenuLayout: {
    margin: "unset",
    height: "100%",
  },
  todoMenuHeader: {
    padding: "0.5rem",
    margin: "unset",
  },
  todoMenuItem: {
    height: "3rem",
    padding: "0.5rem",
  },
  todoIcon: {
    marginRight: "1.5rem",
    minWidth: "unset",
  },
});

export interface IMenuProps {
  id: string;
  linkTo: string;
  text: string;
  icon?: React.ReactElement;
  className?: string;
}

export interface ITodoMenuRenderer {
  menuProps: IMenuProps[];
  header: string;
  className?: string;
}

export const TodoMenuRenderer: React.FunctionComponent<ITodoMenuRenderer> = ({
  menuProps,
  header,
  className,
}) => {
  const classes = useStyles();
  const linkStyle = React.useRef({
    style: {
      color: "inherit",
      textDecoration: "inherit",
    },
  });

  return (
    <Box className={classNames(classes.todoMenuLayout, className)}>
      <h1 className={classes.todoMenuHeader}>{header}</h1>
      <MenuList>
        {menuProps.map((item) => (
          <NavLink to={item.linkTo} style={linkStyle.current.style}>
            <MenuItem
              button
              key={item.id}
              className={classNames(classes.todoMenuItem, item.className)}
            >
              {item.icon && (
                <ListItemIcon className={classes.todoIcon}>
                  {item.icon}
                </ListItemIcon>
              )}
              <Box>{item.text}</Box>
            </MenuItem>
          </NavLink>
        ))}
      </MenuList>
    </Box>
  );
};