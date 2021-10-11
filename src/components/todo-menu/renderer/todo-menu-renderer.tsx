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
  todoMenu: {},
  todoMenuItem: {
    minHeight: "3.6rem",
    height: "3.6rem",
  },
  todoMenuLayout: {
    width: "25%",
    padding: "1rem 1rem 1rem 1rem",
  },
  todoMenuHeader: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.5rem",
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
  /** Todo - Fix accessibility */
  return (
    <Box className={classNames(classes.todoMenuLayout, className)}>
      <h1 className={classes.todoMenuHeader}>{header}</h1>
      <MenuList className={classes.todoMenu} disablePadding={true}>
        {menuProps.map((item) => (
          <NavLink to={item.linkTo} style={linkStyle.current.style}>
            <MenuItem
              button
              key={item.id}
              className={classNames(classes.todoMenuItem, item.className)}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <Box>{item.text}</Box>
            </MenuItem>
          </NavLink>
        ))}
      </MenuList>
    </Box>
  );
};
