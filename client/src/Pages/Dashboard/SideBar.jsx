/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ activeMenu, onMenuClick }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemClick = (menu) => {
    onMenuClick(menu);
    setDrawerOpen(false);
  };

  const menuItemClasses = (menu) =>
    `block py-2 px-4 rounded hover:bg-cyan-500 hover:text-white ${
      activeMenu === menu ? "bg-cyan-700 text-white" : ""
    }`;

  const role = localStorage.getItem("role");

  return (
    <div className="w-full">
      <label
        htmlFor="drawer-toggle"
        className="block lg:hidden bg-blue-800 text-white px-4 py-2 cursor-pointer"
      >
        Open Dashboard
      </label>

      <input
        type="checkbox"
        id="drawer-toggle"
        className="hidden"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div
        className={`${
          isDrawerOpen ? "block" : "hidden"
        } bg-gray-700 font-bold text-cyan-500 min-h-screen w-full lg:w-auto lg:block lg:relative flex lg:flex-col`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {role !== "admin" && (
              <>
                <li>
                  <Link
                    className={menuItemClasses("myOrder")}
                    onClick={() => handleMenuItemClick("myOrder")}
                  >
                    <small className="">My Order</small>
                  </Link>
                </li>
                <li>
                  <Link
                    className={menuItemClasses("myAddress")}
                    onClick={() => handleMenuItemClick("myAddress")}
                  >
                    <small className="">My Address</small>
                  </Link>
                </li>
                <li>
                  <Link
                    className={menuItemClasses("productRequest")}
                    onClick={() => handleMenuItemClick("productRequest")}
                  >
                    <small className="">Product Request</small>
                  </Link>
                </li>
                <li>
                  <Link
                    className={menuItemClasses("requestedProduct")}
                    onClick={() => handleMenuItemClick("requestedProduct")}
                  >
                    <small className="">Requested Product</small>
                  </Link>
                </li>

                <li>
                  <Link
                    className={menuItemClasses("myProfile")}
                    onClick={() => handleMenuItemClick("myProfile")}
                  >
                    <small className="">My Profile</small>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/category"
                    className="block py-2 px-4 rounded hover:bg-cyan-500 hover:text-white"
                  >
                    <small className="">Back to Shopping</small>
                  </Link>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link
                    className={menuItemClasses("addProduct")}
                    onClick={() => handleMenuItemClick("addProduct")}
                  >
                    <small className="">Add Products</small>
                  </Link>
                </li>
                <li>
                  <Link
                    className={menuItemClasses("manageOrder")}
                    onClick={() => handleMenuItemClick("manageOrder")}
                  >
                    <small className="">Manage Order</small>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
