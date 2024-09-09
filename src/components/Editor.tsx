"use client";

import { LocalStorageUtil } from "@/lib/utils";
import React, { use, useEffect, useState } from "react";

const Editor = () => {
  const [content, setContent] = useState(LocalStorageUtil.getClipboardData('clipboardData')?.content || "");

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setContent(value);
    LocalStorageUtil.updateClipboardData('clipboardData', {
      content: value,
    });
  }

  useEffect(() => {
    setContent(LocalStorageUtil.getClipboardData('clipboardData')?.content || "");
  }, [LocalStorageUtil.getClipboardData('clipboardData')]);

  return (
    <div className="shadow-[0px_8px_8px_8px_#00000030]">
      <textarea
        className="w-full  lg:h-[50vh] h-[70vh] resize-none rounded-xl text-lg text-zinc-400 bg-zinc-900 border border-zinc-800 p-4 shadow-[inset_0px_0px_0px_2px_#ffffff05] focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-transparent"
        placeholder="Type your content here..."
        value={content}
        onChange={handleContentChange} // Use onChange to handle user input
      />
    </div>
  );
};

export default Editor;
