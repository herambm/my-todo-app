import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import * as React from "react";
import {
  Theme,
  ThemeSelectorConsumer,
  ThemeSelectorProvider,
} from "./theme-selector-context";

const commonTheme = createTheme({
  typography: {
    fontFamily: [
      "Segoe UI",
      "Segoe",
      "Arial",
      "Roboto",
      "Helvetica Neue",
      "sans-serif",
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    type: "light",
    divider: "#E0E0E0",
    primary: {
      main: "#5048E5",
    },
    secondary: {
      main: "#10B981",
    },
    success: {
      main: "#14B8A6",
    },
    info: {
      main: "#2196F3",
    },
    warning: {
      main: "#FFB020",
    },
    error: {
      main: "#D14343",
    },
  },
});

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#fafafa",
    },
    secondary: {
      main: "#26a27b",
    },
  },
});

export const UiThemeProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  return (
    <ThemeSelectorProvider>
      <ThemeSelectorConsumer>
        {(themeContext) => (
          <ThemeProvider
            theme={{
              ...(themeContext.currentTheme === Theme.Light
                ? lightTheme
                : darkTheme),
            }}
          >
            <CssBaseline />
            {children}
          </ThemeProvider>
        )}
      </ThemeSelectorConsumer>
    </ThemeSelectorProvider>
  );
};
