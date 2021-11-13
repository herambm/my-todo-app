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
  },
});

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    type: "dark",
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
