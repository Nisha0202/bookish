import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { to: "/books", label: "All Books" },
  { to: "/create-book", label: "Add Book" },
  { to: "/borrow-summary", label: "Borrow Summary" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="accent-text px-4 py-3 shadow-sm shadow-gray-40 dark:shadow-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold tracking-wide text-xl">
          📚Bookish!
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((ln) => (
            <NavLink
              key={ln.to}
              to={ln.to}
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : ""
              }
            >
              {ln.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 px-4 space-y-2">
          {navLinks.map((ln) => (
            <NavLink
              key={ln.to}
              to={ln.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "block underline font-semibold" : "block"
              }
            >
              {ln.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
