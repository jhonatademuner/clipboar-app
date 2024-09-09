"use client";

import React, { useState } from "react";
import { CgPassword } from "react-icons/cg";
import ShareCodePopup from "./ShareCodePopup";

const ShareCodeBtn = () => {
  const [isShareCodePopupOpen, setIsShareCodePopupOpen] = useState(false);

  const handleShareCodePopupClose = () => {
    setIsShareCodePopupOpen(false);
  };

  function handleButtonClick() {
    setIsShareCodePopupOpen(true);
  }

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 rounded-xl bg-accent border border-primary px-4 py-2 shadow-[inset_0px_0px_0px_2px_#ffffff05]"
      >
        <CgPassword />
        Generate Share Code
      </button>
      {isShareCodePopupOpen && (
        <ShareCodePopup onClose={handleShareCodePopupClose} />
      )}
    </>
  );
};

export default ShareCodeBtn;
