import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import cc from "classcat";
import { IconType } from "react-icons";
import { GridIconsType, Icons } from "constants/tile";

enum TAB {
  icons,
  assets,
}

export default function AddGridItem({ close, addItem }: { close: Function; addItem: Function }) {
  const addGridItemRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(TAB.icons);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        addGridItemRef.current &&
        !addGridItemRef.current.contains(e.target as Node) &&
        !addGridItemRef.current.parentElement?.contains(e.target as Node)
      )
        close();
    });
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute bottom-full w-max text-black text-left z-[100] -translate-y-3 origin-bottom bg-white p-4 pt-1 drop-shadow-lg rounded flex flex-col items-center text-sm gap-2"
      ref={addGridItemRef}
    >
      <div className="w-full flex justify-center place-items-center mb-1">
        <button
          onClick={() => setTab(TAB.icons)}
          className={cc([
            "relative flex justify-center p-2 w-full",
            tab === TAB.icons &&
              "font-extrabold text-slate-500 after:absolute after:h-[2px] after:bottom-0 after:inset-x-4 after:bg-slate-400",
          ])}
        >
          Icons
        </button>
        {/*   <button
          onClick={() => setTab(TAB.assets)}
          className={cc([
            "relative flex justify-center p-2",
            tab === TAB.assets &&
              "font-extrabold text-slate-500 after:absolute after:h-[2px] after:bottom-0 after:inset-x-4 after:bg-slate-400",
          ])}
        >
          Assets
        </button> */}
      </div>
      <div className="grid grid-cols-8 gap-1 h-40  overflow-auto">
        {(Object.keys(Icons) as GridIconsType[]).map((icon, i) => (
          <button
            className="w-8 h-8 flex items-center justify-center"
            key={i}
            onClick={() => addItem({ type: "icon", icon: icon, attributes: { classname: "p-2", size: "100%" } })}
          >
            {(Icons[icon] as IconType)({ size: "1.75rem" })}
          </button>
        ))}
      </div>
      <div className="border-x-transparent border-x-8 border-t-8 border-t-white absolute -bottom-1 w-0 h-0" />
    </motion.div>
  );
}
