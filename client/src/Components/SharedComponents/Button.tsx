import React, { useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
    const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    if (onClick) onClick();
    setTimeout(() => {
      setIsClicked(false);
    }, 150); 
  };
  return (
 <button
      onClick={handleClick}
      className={`px-3 py-2 bg-blue-800 text-white font-medium capitalize rounded-md focus:outline-none relative ${
        isClicked ? "scale-y-90" : ""
      } ${className}`}
    >
      {children}
      {isClicked && (
        <span className=" px-3 py-1 absolute inset-0 bg-blue-700 opacity-40 rounded-md"></span>
      )}
    </button>
  );
};


