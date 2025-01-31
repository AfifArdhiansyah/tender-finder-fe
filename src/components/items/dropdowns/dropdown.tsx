'use client'

import { useState } from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

interface DropdownProps {
  label: string; 
  options: string[]; 
  onSelect: (selected: string) => void; 
  className?: string;
  parentClassName?: string
}

export default function Dropdown(props: DropdownProps){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.label);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onSelect(option);
  };

  return (
    <div className= {props.parentClassName+" relative inline-block text-left"}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={"w-full flex justify-between items-center px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none " + props.className}
      >
        {selectedOption}
        {isOpen ? (
          <IoChevronUpOutline size={20} />
        ) : (
          <IoChevronDownOutline size={20} />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 origin-top-right bg-white border rounded-md shadow-lg max-h-[312px] overflow-y-auto">
          <ul className="py-1 text-gray-700">
            {props.options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 md:hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
