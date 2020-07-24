import React from "react";
import { ThemeProvider } from "../Theme";

export default function createThemeWrapper({ initialTheme = "lilac" } = {}) {
  return function ThemeWrapper({ children }) {
    return <ThemeProvider initial={initialTheme}>{children}</ThemeProvider>;
  };
}
