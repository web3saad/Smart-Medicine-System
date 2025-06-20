/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const DefaultLayout: React.FC<any> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (color: string, text: string) => {
    setSelectedColor(color);
    setSelectedItem(text);
  };

  const handleIsSideBarOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="flex h-screen ">
      <div
        className={`${
          isSideBarOpen ? "lg:w-1/6 " : "lg:w-20 "
        } bg-gradient-to-r from-blue-900 to-cyan-400 transition-all duration-400 `}
      >
        <Sidebar
          handleIsSideBarOpen={handleIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
          selectedColor={selectedColor}
          selectedItem={selectedItem}
          handleItemClick={handleItemClick}
        />
      </div>

      {/* Main Content */}
      <div
        className={`${
          isSideBarOpen ? "w-5/6" : "w-dvw"
        } bg-white flex flex-col transition-all duration-400 overflow-y-auto h-full hide-scrollbar`}
      >
        <main className={`ml flex-1 ${selectedColor ? selectedColor : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
