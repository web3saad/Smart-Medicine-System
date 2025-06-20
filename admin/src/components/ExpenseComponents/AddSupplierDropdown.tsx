/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

type IAddSupplierDropdownType = {
  onSelect?: any;
  options?: any;
  onAdd?: any;
};


export const AddSupplierDropdown: React.FC<IAddSupplierDropdownType> = ({
  options,
  onSelect,
  onAdd,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const dropdownRef = useRef<any>(null); 

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    setSearchTerm(option?.name);
    onSelect(option);
    setIsOpen(false);
  };

  const handleAddOption = () => {
    if (searchTerm.trim() !== "") {
      const newOption = { id: options.length + 1, name: searchTerm };
      onAdd(newOption);
      setSelectedOption(newOption);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log("Removing event listener");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col mt-1 relative " ref={dropdownRef}>
      <label htmlFor="billTo" className="font-bold">
        To <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id="billTo"
          className="border-2 border-blue-400 py-2 px-2 rounded-md w-full"
          type="text"
          value={selectedOption ? selectedOption.name : searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedOption && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 text-gray-500 hover:text-gray-700"
            onClick={handleClearSelection}
          >
            <RxCross2 className="hover:text-red-700 hover:scale-150 hover:font-bold hover:text-lg " />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-16 w-full bg-blue-50 rounded shadow-lg z-10">
          <ul className="py-1">
            {options
              .filter((option: { name: string }) =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(
                (option: {
                  id: Key | null | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <li
                    key={option.id}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.name}
                  </li>
                )
              )}
            {searchTerm.trim() !== "" &&
              options.filter((option: { name: string }) =>
                option.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).length < 1 && (
                <li
                  className="px-3 py-4 bg-blue-50 cursor-pointer text-blue-500 hover:bg-gray-200"
                  onClick={handleAddOption}
                >
                  Add New Supplier: {searchTerm}
                </li>
              )}
            <p></p>
          </ul>
        </div>
      )}
    </div>
  );
};
