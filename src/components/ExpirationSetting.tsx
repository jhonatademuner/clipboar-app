import React from "react";
import { Label } from "./ui/label";
import ExpirationSelect from "./ExpirationSelect";

const ExpirationSetting = () => {
  return (
    <div className="flex items-center justify-between gap-4  flex-col sm:flex-row">
      <div className="flex items-center gap-4  flex-col md:flex-row">
        <Label
          htmlFor="expiration"
          className="text-lg text-nowrap w-36 flex flex-shrink-0 text-center"
        >
          Expiration
        </Label>
        <p className="text-zinc-600 text-sm text-wrap">
          Set the expiration time for your clipboard. After the expiration time,
          your clipboard will be deleted.
        </p>
      </div>
      <span
        id="expiration"
        className=" w-60 flex flex-shrink-0 justify-end items-center"
      >
        <ExpirationSelect />
      </span>
    </div>
  );
};

export default ExpirationSetting;
