import { motion } from "framer-motion";

export default function Panel() {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "2rem" }}
      exit={{ x: "100%", transition: { duration: 0.2 } }}
      className="w-80 h-screen fixed top-0 right-0 bg-slate-400"
    >
      asdf
    </motion.div>
  );
}
