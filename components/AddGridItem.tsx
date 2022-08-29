import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AddGridItem({ close }: { close: Function }) {
  const addGridItemRef = useRef<HTMLDivElement>(null);

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
      className="pretendard absolute bottom-full text-black text-left z-[100] -translate-y-3 origin-bottom bg-white p-4 drop-shadow-lg rounded flex justify-center text-sm gap-2"
      ref={addGridItemRef}
    >
      <div className="w-full grid grid-cols-2">
        <div>Icons</div>
        <div>Assets</div>
      </div>
      <div className="border-x-transparent border-x-8 border-t-8 border-t-white absolute -bottom-1 w-0 h-0" />
    </motion.div>
  );
}
