import { useContext } from "react";
import { MessageContext } from "contexts/MessageContext";

export const useMessage = () => useContext(MessageContext);
