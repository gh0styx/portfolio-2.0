"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { NAVIGATION_ITEMS, NAVIGATION_CONFIG } from "@/lib/constants";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > NAVIGATION_CONFIG.scrollThreshold);
  });

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Логотип */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-xl font-bold text-foreground p-3 -m-3 hover:bg-accent rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            gh0sty.dev
          </motion.a>

          {/* Центрированная навигация только для больших экранов */}
          <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
            {NAVIGATION_ITEMS.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}>
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Правая часть - тема и бургер (только на маленьких экранах) */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Бургер меню с иконками Lucide */}
            <motion.button
              className="relative p-3 max-lg:block lg:hidden group text-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-current" />
              ) : (
                <Menu className="w-6 h-6 stroke-current" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          scaleY: isMobileMenuOpen ? 1 : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        style={{ originY: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`max-lg:block lg:hidden overflow-hidden bg-background backdrop-blur-xl shadow-xl absolute top-full left-0 right-0 z-60 will-change-transform ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}>
        <div className="container mx-auto px-4 py-6">
          {/* Навигационные ссылки */}
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{
                  duration: 0.3,
                  delay: isMobileMenuOpen ? index * 0.1 : 0,
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}>
                <span className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {item.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
