"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border border-border hover:bg-accent transition-colors text-foreground"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme">
      {!mounted ? (
        <div className="w-5 h-5" />
      ) : (
        <>
          <motion.div
            initial={false}
            animate={{
              rotate: theme === "dark" ? 0 : 180,
              scale: theme === "dark" ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center">
            <Moon className="w-5 h-5 text-foreground stroke-current" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{
              rotate: theme === "light" ? 0 : -180,
              scale: theme === "light" ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center">
            <Sun className="w-5 h-5 text-foreground stroke-current" />
          </motion.div>
        </>
      )}
    </motion.button>
  );
}
