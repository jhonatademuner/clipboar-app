"use client";

import { LocalStorageUtil } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Editor = () => {
  const [content, setContent] = useState(LocalStorageUtil.getClipboardData('clipboardData')?.content || "");

  // Function to handle content change in the textarea
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setContent(value);
    LocalStorageUtil.updateClipboardData('clipboardData', { content: value });

    // Dispatch custom event to notify localStorage change
    window.dispatchEvent(new Event('localStorageUpdated'));
  }

  useEffect(() => {
    // Listener to update the component state when localStorage changes
    const handleStorageChange = () => {
      const newClipboardData = LocalStorageUtil.getClipboardData('clipboardData')?.content || "";
      setContent(newClipboardData);
    };

    // Add event listener for both storage event and custom event
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleStorageChange);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleStorageChange);
    };
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  return (
    <div className="shadow-[0px_8px_8px_8px_#00000030]">
      <textarea
        className="w-full lg:h-[50vh] h-[70vh] resize-none rounded-xl text-lg text-zinc-400 bg-zinc-900 border border-zinc-800 p-4 shadow-[inset_0px_0px_0px_2px_#ffffff05] focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-transparent"
        placeholder="Type your content here..."
        value={content}
        onChange={handleContentChange} // Use onChange to handle user input
      />
    </div>
  );
};

export default Editor;
