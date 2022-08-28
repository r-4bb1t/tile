import { motion } from "framer-motion";

interface MessageProps {
  close(): void;
  onClose?: Function;
  children: React.ReactNode;
  buttonText: string[];
}

export function Message({ close, buttonText, children, onClose }: MessageProps) {
  const handleClick = () => {
    onClose && onClose();
    close();
  };
  const handleCancle = () => close();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.7 }}
      className="bg-white p-8 rounded-md"
    >
      {children}
      <div className="flex justify-between mt-4 gap-8">
        {buttonText.length === 2 && (
          <button onClick={handleCancle} className="bg-slate-200 text-white font-bold w-full rounded p-2">
            {buttonText[1]}
          </button>
        )}
        <button onClick={handleClick} className="bg-slate-400 text-white font-bold w-full rounded p-2">
          {buttonText[0]}
        </button>
      </div>
    </motion.div>
  );
}
