import * as React from "react";

export enum Theme {
  Light = "Light",
  Dark = "Dark",
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
  const [currentTheme, setCurrentTheme] = React.useState(() => {
    const themeFromLocalStorage = localStorage.getItem("theme");
    if (themeFromLocalStorage) {
      return Theme[themeFromLocalStorage as keyof typeof Theme];
    }
    return Theme.Light;
  });

  const memoizedTheme = React.useMemo(
    () => ({
      currentTheme,
      setTheme: (theme: Theme) => {
        localStorage.setItem("theme", Theme[theme]);
        setCurrentTheme(theme);
      },
    }),
    [currentTheme, setCurrentTheme]
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
