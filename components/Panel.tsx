import { motion } from "framer-motion";
import { useState } from "react";
import cc from "classcat";
import { HomeIcon, ImageIcon } from "./Icons";

enum TAB {
  home,
  image,
  text,
}

export default function Panel() {
  const [tab, setTab] = useState(TAB.home);
  return (
    <div className="w-80 h-full flex-shrink-0">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "2rem" }}
        exit={{ x: "100%", transition: { duration: 0.2 } }}
        className="w-[22rem] h-screen fixed top-0 right-0 bg-slate-400 flex"
      >
        <div className="w-12 h-screen overflow-y-auto bg-slate-100">
          <div className="grid grid-cols-1 w-full">
            <button
              className={cc([
                "w-full aspect-square border-b-[1px] border-b-slate-200 flex items-center justify-center transition-all",
                tab === TAB.home && "bg-white",
              ])}
              onClick={() => {
                setTab(TAB.home);
              }}
            >
              <HomeIcon selected={tab === TAB.home} />
            </button>
            <button
              className={cc([
                "w-full aspect-square border-b-[1px] border-b-slate-200 flex items-center justify-center transition-all",
                tab === TAB.image && "bg-white",
              ])}
              onClick={() => {
                setTab(TAB.image);
              }}
            >
              <ImageIcon selected={tab === TAB.image} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
