import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { IoIosArrowDown } from "react-icons/io";
import { LocalStorageUtil } from "@/lib/utils";
import { CardSpotlightEffect } from "@/components/CardSpotlightEffect";
import Editor from "@/components/Editor";
import ShareCodeBtn from "@/components/ShareCodeBtn";
import SearchBtn from "@/components/SearchBtn";
import NetworkSetting from "@/components/NetworkSetting";
import ExpirationSetting from "@/components/ExpirationSetting";

export default function Page() {
  LocalStorageUtil.initializeClipboardData("clipboardData");

  return (
    <div className="flex flex-col items-center h-screen">
      <main className="flex-1 flex flex-col items-center gap-4 p-2 sm:px-4 sm:py-8 lg:w-[64rem] md:w-[48rem] sm:w-[40rem] w-full">
        <span className="shadow-[0px_4px_4px_4px_#00000030] relative cursor-pointer">
          <SearchBtn />
          <div className="absolute h-full w-full bg-accent rounded-[50%] blur-[30px] opacity-40 top-0 -z-10"></div>
        </span>
        <div className="w-full max-w-5xl bg-background rounded-xl flex flex-col gap-4">
          <span className="relative z-10">
            <div className="absolute h-full w-full bg-primary rounded-[40%] blur-[200px] opacity-20 "></div>
            <CardSpotlightEffect>
              <Editor />
            </CardSpotlightEffect>
          </span>
          <span className="z-10">
            <CardSpotlightEffect>
              <Collapsible className="bg-zinc-900 rounded-xl text-white transition-all duration-300 overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="shadow-[0px_8px_8px_8px_#00000030] cursor-pointer">
                    <div className="px-6 py-4 flex items-center justify-between shadow-[inset_0px_0px_0px_2px_#ffffff05]">
                      <h4 className="text-lg font-medium">Settings</h4>
                      <span className="text-2xl flex items-center justify-center">
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-6 space-y-4 transition-all duration-300">
                  <NetworkSetting />
                  <div className="bg-zinc-800 w-full h-0.5"></div>
                  <ExpirationSetting />
                </CollapsibleContent>
              </Collapsible>
            </CardSpotlightEffect>
          </span>
          <div className="flex justify-center gap-4 text-white text-lg w-full py-2 flex-wrap">
            <span className="shadow-[0px_4px_4px_4px_#00000030] relative cursor-pointer">
              <ShareCodeBtn />
              <div className="absolute h-full w-full bg-accent rounded-[50%] blur-[30px] opacity-40 top-0 -z-10"></div>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
