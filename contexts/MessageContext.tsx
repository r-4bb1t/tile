import { createContext, FC, ReactNode, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Message } from "components/Message";

interface MessageProps {
  content: React.ReactNode;
  buttonText: string[];
  onClose: Function;
}

interface MessagesProps extends MessageProps {
  id: number;
}

interface MessageContextProps {
  message(alert: MessageProps): void;
  close(id: number): void;
  closeAll: () => void;
}

const doNothing = () => null;

export const MessageContext = createContext<MessageContextProps>({
  message: doNothing,
  close: doNothing,
  closeAll: doNothing,
});

const MessageContextProvider = ({ children }: { children: ReactNode }) => {
  const [contents, setContents] = useState<MessagesProps[]>([]);

  const push = (alert: MessageProps) => setContents((prev) => [...prev, { id: +new Date(), ...alert }]);
  const close = (id: number) => setContents((prev) => prev.filter((a) => a.id !== id));
  const closeAll = () => setContents([]);

  return (
    <MessageContext.Provider
      value={{
        message: push,
        close,
        closeAll,
      }}
    >
      <aside>
        <AnimatePresence>
          {contents.map(({ id, content, buttonText, onClose }) => (
            <div
              key={id}
              className="w-screen h-screen fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20"
            >
              <Message buttonText={buttonText} close={() => close(id)} onClose={onClose}>
                {content}
              </Message>
            </div>
          ))}
        </AnimatePresence>
      </aside>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
