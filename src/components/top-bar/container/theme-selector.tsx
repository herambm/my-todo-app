import { makeStyles } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import * as React from "react";
import {
  Theme,
  useThemeSelector,
} from "../../../providers/theme-provider/theme-selector-context";

const useStyles = makeStyles({
  themeSelector: {
    marginRight: "0.3rem",
    marginLeft: "0.3rem",
    marginTop: "0.8rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export const ThemeSelector: React.FunctionComponent = () => {
  const { currentTheme, setTheme } = useThemeSelector();
  const classes = useStyles();

  const toggleTheme = () => {
    setTheme(currentTheme === Theme.Dark ? Theme.Light : Theme.Dark);
  };

  return currentTheme === Theme.Light ? (
    <Brightness4 onClick={toggleTheme} className={classes.themeSelector} />
  ) : (
    <Brightness7 onClick={toggleTheme} className={classes.themeSelector} />
  );
};
