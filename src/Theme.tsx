import React, { useContext, useState } from "react";

const Ctx = React.createContext<
  | { theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> }
  | undefined
>(undefined);

export function ThemeProvider({
  children,
  initial
}: {
  children: React.ReactElement;
  initial: string;
}) {
  const [theme, setTheme] = useState(initial);
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  const { theme, setTheme } = useContext(Ctx);
  return { theme, setTheme };
}
