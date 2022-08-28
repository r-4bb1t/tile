import { UIContext } from "contexts/UIContext";
import { useContext } from "react";

export const useUI = () => useContext(UIContext);
