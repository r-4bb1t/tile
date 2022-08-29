import { motion } from "framer-motion";
import { useState } from "react";
import cc from "classcat";
import { HomeIcon, ImageIcon, SolvedacIcon } from "../Icons";
import Home from "./home";
import Image from "./Image";
import Solvedac from "./Solvedac";

enum TAB {
  home,
  image,
  solvecac,
}

export default function Panel() {
  const [tab, setTab] = useState(TAB.home);

  const TabItem = {
    [TAB.home]: { icon: HomeIcon, component: <Home key="home" /> },
    [TAB.image]: { icon: ImageIcon, component: <Image key="image" /> },
    [TAB.solvecac]: { icon: SolvedacIcon, component: <Solvedac key="solvedac" /> },
  };

  return (
    <div className="w-80 h-full flex-shrink-0">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "2rem" }}
        exit={{ x: "100%", transition: { duration: 0.2 } }}
        className="w-[22rem] h-screen fixed top-0 right-0 bg-slate-200 flex"
      >
        <div className="w-16 h-screen overflow-y-auto bg-slate-100">
          <div className="grid grid-cols-1 w-full">
            {Object.keys(TabItem).map((tabItem) => (
              <button
                className={cc([
                  "w-full aspect-square border-b-[1px] border-b-slate-200 flex items-center justify-center transition-all",
                  tab === parseInt(tabItem) && "bg-white",
                ])}
                onClick={() => {
                  setTab(parseInt(tabItem));
                }}
                key={tabItem}
              >
                {TabItem[parseInt(tabItem) as TAB].icon({ selected: tab === parseInt(tabItem) })}
              </button>
            ))}
          </div>
        </div>
        <div className="pr-8 w-full">
          <div className="w-full flex flex-col p-4 gap-4">{TabItem[tab].component}</div>
        </div>
      </motion.div>
    </div>
  );
}
