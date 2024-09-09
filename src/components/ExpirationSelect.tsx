'use client';

import { LocalStorageUtil } from "@/lib/utils";
import React, { useState } from "react";

const ExpirationSelect = () => {
  const [expirationTime, setExpirationTime] = React.useState(LocalStorageUtil.getClipboardData('clipboardData')?.settings?.expirationTime || 900000);

  const times: { [key: number]: string } = {
    900000: "translate-x-0",
    1800000: "translate-x-[calc(256px/4)]",
    3600000: "translate-x-[calc(256px/2)]",
    7200000: "translate-x-[calc(256px/4*3)]",
  };

  function handleExpirationTime(value: number) {
    setExpirationTime(value);
    console.log("Expiration time:", value);
    LocalStorageUtil.updateClipboardData('clipboardData', {
      settings: {
        expirationTime: value, // Update to true
      }
    });
  }

  return (
    <div className="relative w-64 flex items-center border border-zinc-700 bg-zinc-800 shadow-[inset_0px_0px_0px_2px_#ffffff05] rounded-xl overflow-hidden cursor-pointer">
      <div
        className={`absolute top-0 h-full w-1/4 bg-zinc-700 rounded-xl shadow-[inset_0px_0px_0px_2px_#ffffff05] transition-transform duration-300 ease-in-out ${times[expirationTime]}`}
      ></div>

      <div className="relative w-1/2 text-center px-4 py-2 z-10" onClick={() => handleExpirationTime(900000)}>15m</div>
      <div className="relative w-1/2 text-center px-4 py-2 z-10" onClick={() => handleExpirationTime(1800000)}>30m</div>
      <div className="relative w-1/2 text-center px-4 py-2 z-10" onClick={() => handleExpirationTime(3600000)}>1h</div>
      <div className="relative w-1/2 text-center px-4 py-2 z-10" onClick={() => handleExpirationTime(7200000)}>2h</div>
    </div>
  );
};

export default ExpirationSelect;