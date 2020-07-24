import React, { useContext, useState, useCallback } from "react";

const Ctx = React.createContext();

export function ThemeProvider({ children, initial }) {
  const [theme, setTheme] = useState(initial);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const { theme, setTheme: setThemeContext } = useContext(Ctx);

  const setTheme = useCallback(
    newTheme => {
      if (typeof newTheme !== "string") {
        return;
      }

      if (newTheme === theme) {
        return;
      }
      setThemeContext(newTheme);
    },
    [theme, setThemeContext]
  );

  return {
    theme,
    setTheme
  };
}
