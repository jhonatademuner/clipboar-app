"use client";

import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchPopup from "./SearchPopup";

const SearchBtn = () => {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  const handleSearchPopupClose = () => {
    setIsSearchPopupOpen(false);
  };

  function handleButtonClick() {
    setIsSearchPopupOpen(true);
  }

  return (
    <>
      <button
        onClick={() => setIsSearchPopupOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-accent border border-primary px-4 py-2 shadow-[inset_0px_0px_0px_2px_#ffffff05]"
      >
        <IoIosSearch />
        Search Clipboards
      </button>
      {isSearchPopupOpen && <SearchPopup onClose={handleSearchPopupClose} />}
    </>
  );
};

export default SearchBtn;
