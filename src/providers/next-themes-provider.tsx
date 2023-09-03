"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FC, ReactNode } from "react";

interface NextThemePoviderProps {
  children: ReactNode;
}

export const NextThemePovider: FC<NextThemePoviderProps> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="discord-clone-theme"
    >
      {children}
    </NextThemesProvider>
  );
};
