import React from "react";
import { useTheme } from "./Theme";
import { useState } from "react";

export default function ThemeComponent() {
  const { theme, setTheme } = useTheme();
  const [stateTheme, setStateTheme] = useState(theme);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        value={stateTheme}
        onChange={e => setStateTheme(e.target.value)}
        data-testid="input-theme"
        style={{ backgroundColor: theme }}
      />
      <button
        type="submit"
        onClick={() => setTheme(stateTheme)}
        data-testid="submit-theme"
        style={{ backgroundColor: theme }}
      >
        Change theme
      </button>
    </form>
  );
}
