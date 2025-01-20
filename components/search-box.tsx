"use client";

import { useState } from "react";
import { SearchBox } from "@/stories/searchbox/search";

export const SearchBoxArea = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = () => {
    console.log("hi");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(e.target.value.length > 0);
  };
  return (
    <div>
      {/**Searchbox header */}
      <div className="flex md:flex-row flex-col justify-between  gap-6 md:gap-0 relative">
        <div className="md:w-[30vw]">
          <SearchBox
            bgColor="#EFF0F1"
            placeholder="Search house number or name"
            name="SearchResidents"
            color="#b4b4b4"
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          />
        </div>
        {isOpen && (
          <div className="h-[30vh] w-[50vw] absolute top-12 z-40 bg-white drop-shadow-[0px_8px_20px_rgba(0,0,0,.1)] rounded-xl">
            Hello north
          </div>
        )}
      </div>
    </div>
  );
};
