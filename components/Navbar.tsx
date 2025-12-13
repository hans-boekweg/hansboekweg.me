"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Tech", href: "#tech" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 shadow-lg shadow-black/20">
        <ul className="flex items-center gap-6 sm:gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
