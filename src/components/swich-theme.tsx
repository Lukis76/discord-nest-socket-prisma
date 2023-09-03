"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle Dark Mode"
          type="button"
          variant="outline"
      className="w-10 h-10 p-0 border-2 bg-transparent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className="h-6 w-6 text-orange-300" />
      ) : (
        <MoonStarIcon className="h-6 w-6 text-indigo-800/80 " />
      )}
    </Button>
  );
};
