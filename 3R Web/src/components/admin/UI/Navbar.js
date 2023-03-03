import React, { useState, useContext } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-green-500 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 object-contain"
                  src={logo}
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    className="hover:bg-white hover:text-green-500 text-white px-3 py-2 rounded-md text-sm font-medium nav"
                    to="/admin"
                    end
                  >
                    3R Actions
                  </NavLink>

                  <NavLink
                    className="hover:bg-white hover:text-green-500 text-white px-3 py-2 rounded-md text-sm font-medium nav"
                    to="/admin/dictionary"
                    end
                  >
                    Dictionary
                  </NavLink>

                  <button
                    className="text-white hover:bg-white hover:text-green-500
                    px-3 py-2 rounded-md text-sm font-medium right-1 absolute"
                    onClick={() => handleLogout()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-green-500 hover:text-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`md:hidden top-0 right-0 w-10/12 bg-green-500 p-5 text-white fixed h-full z-40  ease-in-out duration-300 ${
          isOpen ? "translate-x-0 " : "translate-x-full"
        }`}
        id="mobile-menu"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="text-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
        <div className="px-2 pt-2 flex flex-col sm:px-3">
          <NavLink
            className="hover:bg-white hover:text-green-500 text-white px-3 py-2 rounded-md text-sm font-medium nav"
            to="/admin"
            end
          >
            3R Actions
          </NavLink>
          <NavLink
            className="hover:bg-white hover:text-green-500 text-white px-3 py-2 rounded-md text-sm font-medium nav"
            to="/admin/dictionary"
            end
          >
            Dictionary
          </NavLink>

          <button
            className="text-white hover:bg-red-500
                  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={() => handleLogout()}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
