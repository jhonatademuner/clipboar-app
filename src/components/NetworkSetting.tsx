import React from "react";
import { Label } from "./ui/label";
import NetworkSwitch from "./NetworkSwitch";

const NetworkSetting = () => {
  return (
    <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Label
          htmlFor="privacy"
          className="text-lg text-nowrap w-36 flex flex-shrink-0 text-center"
        >
          Network Visibility
        </Label>
        <p className="text-zinc-600 text-sm text-wrap">
          If the network visibility is set to public, your clipboard will be
          visible to everyone on the network. If it is set as private, only you
          will be able to see the clipboard.
        </p>
      </div>
      <span
        id="privacy"
        className="w-60 flex flex-shrink-0 justify-center sm:justify-end items-center"
      >
        <NetworkSwitch />
      </span>
    </div>
  );
};

export default NetworkSetting;
