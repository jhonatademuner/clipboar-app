import { LocalStorageUtil } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { IoIosCopy } from "react-icons/io";
import axios from "@/axiosConfig";

const ShareCodePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [shareCode, setShareCode] = useState<string>("..."); // Placeholder code

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the share code when the component is mounted
    const fetchShareCode = async () => {
      try {
        const clipboard = LocalStorageUtil.getClipboardData('clipboardData');
        const response = await axios.post("api/clipboard", clipboard);
        setShareCode(response.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Failed to fetch share code:", error);
      }
    };

    fetchShareCode();
  }, []); // Empty dependency array ensures this runs only once

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

  const handleCopyClick = () => {
    if (shareCode) {
      navigator.clipboard.writeText(shareCode);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out backdrop-blur-md">
      <div
        ref={popupRef}
        className="bg-zinc-900 p-6 rounded-xl w-full max-w-md relative flex flex-col gap-6 opacity-0 scale-95 transition-all duration-300 ease-in-out animate-fade-in"
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-zinc-400">Share Code</h2>
          <p className="text-zinc-500">Here is your generated share code:</p>
        </div>
        <div className="bg-zinc-800 flex w-full h-14 border-zinc-700 border rounded-xl items-center shadow-[inset_0px_0px_0px_2px_#ffffff05]">
          <p className="w-full p-2 text-lg placeholder-zinc-600 bg-transparent text-zinc-400">{shareCode}</p>
          <button
            onClick={handleCopyClick}
            className="bg-accent text-white p-2 rounded-xl text-3xl h-full w-16 flex items-center justify-center active:scale-110"
          >
            <IoIosCopy />
          </button>
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

export default ShareCodePopup;
