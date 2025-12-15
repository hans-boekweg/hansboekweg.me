"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

function Navbar() {
  const renderedItems = useMemo(
    () =>
      navItems.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 whitespace-nowrap"
          >
            {item.label}
          </a>
        </li>
      )),
    []
  );

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      data-animate
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 sm:px-6 py-3 shadow-lg shadow-black/20">
        <ul className="flex items-center gap-3 sm:gap-6">{renderedItems}</ul>
      </div>
    </motion.nav>
  );
}

export default memo(Navbar);
