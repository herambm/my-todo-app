import * as React from "react";

export enum Theme {
  Light,
  Dark,
}

export interface IThemeContext {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeSelectorContext = React.createContext<IThemeContext>(
  undefined as any
);

export const ThemeSelectorProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  // Todo: Fetch from local storage.
  const [theme, setTheme] = React.useState(Theme.Light);
  const memoizedTheme = React.useMemo(
    () => ({
      currentTheme: theme,
      setTheme,
    }),
    [theme, setTheme]
  );

  return (
    <ThemeSelectorContext.Provider value={memoizedTheme}>
      {children}
    </ThemeSelectorContext.Provider>
  );
};

export const ThemeSelectorConsumer = ThemeSelectorContext.Consumer;

export const useThemeSelector = () =>
  React.useContext<IThemeContext>(ThemeSelectorContext);
