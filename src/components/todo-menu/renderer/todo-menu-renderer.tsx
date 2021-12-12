import * as React from "react";
import {
  Box,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import {
  LinkProps,
  NavLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import classNames from "classnames";

const useStyles = makeStyles({
  todoMenuLayout: {
    margin: "unset",
    height: "100%",
  },
  todoMenuItem: {
    padding: "unset",
  },
  todoIcon: {
    marginRight: "0.7rem",
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
  className?: string;
}

export const TodoMenuRenderer: React.FunctionComponent<ITodoMenuRenderer> = ({
  menuProps,
  className,
}) => {
  const classes = useStyles();
  const linkStyle = React.useRef({
    style: {
      color: "inherit",
      textDecoration: "inherit",
      display: "flex",
      padding: "0.6rem 1rem",
    },
  });

  return (
    <Box className={classNames(classes.todoMenuLayout, className)}>
      <MenuList>
        {menuProps.map((item) => (
          <MenuItem
            button
            key={item.id}
            className={classNames(classes.todoMenuItem, item.className)}
          >
            <CustomLink
              to={item.linkTo}
              style={linkStyle.current.style}
              key={item.id}
            >
              {item.icon && (
                <ListItemIcon className={classes.todoIcon}>
                  {item.icon}
                </ListItemIcon>
              )}
              <Box>{item.text}</Box>
            </CustomLink>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      {...props}
      style={{ ...props.style, ...(match && { fontWeight: "bold" }) }}
    >
      {children}
    </NavLink>
  );
}
