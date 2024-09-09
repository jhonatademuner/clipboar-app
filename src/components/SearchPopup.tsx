"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CardSpotlightEffect } from "./CardSpotlightEffect";
import axios from "@/axiosConfig";
import { LocalStorageUtil } from "@/lib/utils";
import { HttpStatusCode } from "axios";

interface ClipboardSettings {
  networkVisible: boolean;
  networkCode: string;
  expirationTime: number; // Assuming expirationTime is in milliseconds
}

interface ClipboardData {
  id: string;
  content: string;
  settings: ClipboardSettings;
  sharingCode: string;
  createdDate: string; // ISO 8601 format
  lastModifiedDate: string; // ISO 8601 format
  expiresAfter: string; // ISO 8601 format
}

const SearchPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clipboards, setClipboards] = useState<ClipboardData[]>([]);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the share code when the component is mounted
    const fetchNetworkClipboards = async () => {
      try {
        const response = await axios.get("api/clipboard/network");
        setClipboards(response.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Failed to fetch share code:", error);
      }
    };

    fetchNetworkClipboards();
  }, []); // Empty dependency array ensures this runs only once

  function handleSelectClipboard(value: string) {
    LocalStorageUtil.updateClipboardData("clipboardData", {
      content: value,
    });
    onClose();
  }

  function handleSearchClick() {
    if (!searchTerm) return;
    axios.get(`api/clipboard/sharingCode/${searchTerm}`).then((response) => {
      if (response.status == HttpStatusCode.Ok && response.data) {
        LocalStorageUtil.updateClipboardData("clipboardData", {
          content: response.data,
        });
        onClose();
      }
    });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-150 ease-in-out backdrop-blur-md">
      <div
        ref={popupRef}
        className="bg-zinc-900 p-6 rounded-xl w-full max-w-md relative flex flex-col gap-6 opacity-0 scale-95 transition-all duration-300 ease-in-out animate-fade-in"
      >
        <div className="bg-zinc-800 flex w-full h-14 border-zinc-700 border rounded-xl items-center shadow-[inset_0px_0px_0px_2px_#ffffff05]">
          <input
            type="text"
            placeholder="Search by code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 text-lg outline-none placeholder-zinc-600 bg-transparent text-zinc-400"
          />
          <button
            onClick={handleSearchClick}
            className="bg-accent text-white p-2 rounded-xl text-3xl h-full w-16 flex items-center justify-center overflow-hidden active:scale-110"
          >
            
            <IoIosSearch />
          </button>
        </div>
        <div className="flex flex-col items-center relative border border-zinc-800 shadow-[inset_0px_0px_0px_2px_#ffffff05] rounded-xl">
          <h3 className="text-lg flex justify-center text-zinc-400 absolute -top-3 bg-zinc-900 w-fit px-2">
            Clipboards on Network:
          </h3>
          <ul className="flex flex-col gap-2 py-8 px-4 w-full">
            {clipboards.map((clipboard, index) => (
              <CardSpotlightEffect key={index}>
                <li
                  className="flex w-full justify-center items-center p-4 border border-zinc-800 shadow-[inset_0px_0px_0px_2px_#ffffff05] rounded-xl text-lg bg-zinc-800 bg-opacity-50 cursor-pointer"
                  onClick={() => handleSelectClipboard(clipboard.content)}
                >
                  {clipboard.sharingCode}
                </li>
              </CardSpotlightEffect>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="bg-accent text-white p-4 text-lg rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchPopup;
