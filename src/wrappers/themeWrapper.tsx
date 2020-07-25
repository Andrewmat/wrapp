import React from "react";
import { ThemeProvider } from "../Theme";
import { WrapperCreator } from "../wrapp/interfaces";

const createThemeWrapper: WrapperCreator<
  { initialTheme?: string },
  unknown
> = ({ initialTheme = "lilac" }) => {
  return function ThemeWrapper({ children }: { children: React.ReactElement }) {
    return <ThemeProvider initial={initialTheme}>{children}</ThemeProvider>;
  };
};

export default createThemeWrapper;
