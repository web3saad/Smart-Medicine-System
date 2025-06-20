/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CustomDropdown = ({ isDrawerOpen, handleDrawerToggle, handleLogOut }) => {
  const email = localStorage.getItem("email");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group">
      {/* Dropdown Trigger */}
      <label
        tabIndex={0}
        className="btn btn-ghost lg:hidden cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 group-hover:text-gray-300 transition duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>

      <ul
        className={`absolute right-2 top-10 mt-2  p-2 flex flex-col  justify-start text-left shadow bg-gray-800 rounded-box w-52 ${
          dropdownOpen ? "block " : "hidden"
        }`}
      >
        <li>
          <Link to="/dashboard" className="text-white font-semibold">
            My Order
          </Link>
        </li>

        <li>
          <Link
            to="/product-request"
            className="btn mb-2 btn-sm mt-1 capitalize btn-accent rounded-lg"
          >
            Product Request
          </Link>
        </li>

        <div className="drawer flex justify-start navbar-end drawer-end mr-5 ">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={handleDrawerToggle}
          />

          {email ? (
            <div className=" ">
              <Link to="/login">
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm capitalize btn-primary   rounded-lg"
                >
                  Log Out
                </button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-sm capitalize btn-primary">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default CustomDropdown;
