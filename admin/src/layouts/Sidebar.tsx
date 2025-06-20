import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import MenuItems from "./MenuItem";

interface SidebarProps {
  handleIsSideBarOpen?: () => void;
  setIsSideBarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBarOpen?: boolean;
  selectedColor?: string | null;
  selectedItem?: string | null;
  handleItemClick: (color: string, text: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleIsSideBarOpen,
  isSideBarOpen,
  handleItemClick,
  selectedColor,
  selectedItem,
}) => {
  return (
    <div className="overflow-y-auto h-full hide-scrollbar  ">
      <div className="text-white   ">
        <div className="flex justify-between  ">
          <Link
            to="/"
            className={`${
              isSideBarOpen ? "block" : "hidden"
            } mt-2 px-4 text-xl text-white font-bold`}
          >
            <img className="w-32" src={logo} alt="E-Care" />
          </Link>

          {isSideBarOpen ? (
            <FaArrowAltCircleLeft
              onClick={handleIsSideBarOpen}
              className="text-3xl mt-2 mr-4 cursor-pointer"
            />
          ) : (
            <FaArrowAltCircleRight
              onClick={handleIsSideBarOpen}
              className="lg:text-3xl text-2xl ml-2 mt-2 cursor-pointer scale-110"
            />
          )}
        </div>

        {isSideBarOpen ? (
          <ul className="mt-2  ">
            {MenuItems.map((item) => (
              <li key={item.id} className="py-1 ">
                <Link
                  to={item.link}
                  onClick={() => handleItemClick("bg-white", item.text)}
                  className={`rounded md:text-sm px-2 p-2 flex items-center hover:font-extrabold  hover:text-yellow-400  ${
                    selectedItem === item.text
                      ? `${selectedColor} text-black  font-bold rounded-none`
                      : ""
                  }`}
                >
                  <div className="relative lg:w-72  md:w-72 xl:w-[20rem] flex items-center">
                    <item.icon className="mr-2 text-2xl" />
                    {item.text}
                    {selectedItem === item.text && (
                      <div className="curve-top"></div>
                    )}
                    {selectedItem === item.text && (
                      <div className="curve-bottom"></div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-2 relative lg:w-40  md:w-40 xl:w-[5rem]">
            {MenuItems.map((item) => (
              <li key={item.id} className="py-[0.5rem]">
                <Link
                  to={item.link}
                  onClick={() => handleItemClick("bg-white", item.text)}
                  className={`px-2 p-1 flex items-center ${
                    selectedItem === item.text
                      ? `${selectedColor} text-black  rounded-l-2xl  py-2 ml-2`
                      : ""
                  }`}
                >
                  <div className="relative">
                    <item.icon className="mr-2 lg:text-3xl text-2xl hover:text-cyan-400 hover-spin" />
                    {/* Add the curved shape here only if the item is selected */}
                    {selectedItem === item.text && (
                      <div className="navigation-top"></div>
                    )}
                    {selectedItem === item.text && (
                      <div className="navigation"></div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
