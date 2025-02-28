import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } p-4`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo and Links */}
        <div className="flex items-center">
          <p className="text-xl font-bold mr-4">OnlyData</p>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className={`hover:${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors`}
            >
              Home
            </Link>
            <Link
              to="add_data"
              className={`hover:${isDarkMode ? "text-gray-300" : "text-gray-600"} transition-colors`}
            >
              Add Data
            </Link>
          </div>
        </div>

        {/* Right Section: Search, Sign-in, Theme Toggle, and Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className={`p-2 rounded-md placeholder-gray-500 bg-$
                {isDarkMode ? "gray-700 text-white" : "gray-200 text-gray-900"}
              `}
            />
            <button
              className={`px-4 py-2 rounded-md transition ml-2 bg-$
                {isDarkMode ? "blue-500 hover:bg-blue-600 text-white" : "blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              Search
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
  onClick={toggleTheme}
  className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition"
  aria-label="Toggle Theme"
>
  {isDarkMode ? (
    <Sun className="h-6 w-6 text-gray-800" />
  ) : (
    <Moon className="h-6 w-6 text-white" />
  )}
</button>

          {/* Authentication Buttons */}
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden flex flex-col space-y-2 mt-2 p-4 rounded-lg bg-$
            {isDarkMode ? "gray-700 text-white" : "gray-200 text-gray-900"}
          `}
        >
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="add_data"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Data
          </Link>
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              placeholder="Search..."
              className={`p-2 rounded-md flex-grow placeholder-gray-500 bg-$
                {isDarkMode ? "gray-700 text-white" : "gray-200 text-gray-900"}
              `}
            />
            <button
              className={`px-4 py-2 rounded-md transition bg-$
                {isDarkMode ? "blue-500 hover:bg-blue-600 text-white" : "blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
