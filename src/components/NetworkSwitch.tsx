"use client";

import { LocalStorageUtil } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const NetworkSwitch = () => {
  const [network, setNetwork] = useState(
    LocalStorageUtil.getClipboardData('clipboardData')?.settings?.networkVisible || false
  );

  useEffect(() => {
    // Initialize clipboard data in local storage if it's not present
    LocalStorageUtil.initializeClipboardData('clipboardData');
  }, []);

  function handleNetworkSwitch() {
    setNetwork((prevNetwork) => {
      const newNetwork = !prevNetwork;

      // Update local storage with the new value after the state changes
      LocalStorageUtil.updateClipboardData('clipboardData', {
        settings: {
          networkVisible: newNetwork, // Use the new toggled value
        },
      });

      return newNetwork;
    });
  }

  return (
    <div
      className="relative flex items-center w-[150px] border border-zinc-700 bg-zinc-800 shadow-[inset_0px_0px_0px_2px_#ffffff05] rounded-xl overflow-hidden cursor-pointer"
      onClick={handleNetworkSwitch}
    >
      <div
        className={`absolute top-0 h-full w-1/2 bg-zinc-700 rounded-xl shadow-[inset_0px_0px_0px_2px_#ffffff05] transition-transform duration-300 ease-in-out ${
          network ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>

      <div className="relative w-1/2 text-center px-4 py-2 z-10">Private</div>
      <div className="relative w-1/2 text-center px-4 py-2 z-10">Public</div>
    </div>
  );
};

export default NetworkSwitch;
