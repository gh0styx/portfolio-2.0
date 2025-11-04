"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  // Всегда используем "light" как начальное состояние для SSR/клиента
  // Это гарантирует одинаковое начальное состояние
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border border-border hover:bg-accent transition-colors text-foreground"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      suppressHydrationWarning>
      <motion.div
        key="moon"
        initial={{
          rotate: 180,
          scale: 0,
          opacity: 0,
        }}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center">
        <Moon className="w-5 h-5 text-foreground stroke-current" />
      </motion.div>
      <motion.div
        key="sun"
        initial={{
          rotate: -180,
          scale: 0,
          opacity: 0,
        }}
        animate={{
          rotate: isDark ? -180 : 0,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center">
        <Sun className="w-5 h-5 text-foreground stroke-current" />
      </motion.div>
    </motion.button>
  );
}
