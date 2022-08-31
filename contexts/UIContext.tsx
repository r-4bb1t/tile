import { THEME, ThemeList } from "constants/theme";
import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react";

interface UIContextProps {
  uiMode: boolean;
  setUIMode: Dispatch<SetStateAction<boolean>>;
  margin: number;
  setMargin: Dispatch<SetStateAction<number>>;
  theme: string[];
  setTheme: Dispatch<SetStateAction<string[]>>;
  borderRadius: number;
  setBorderRadius: Dispatch<SetStateAction<number>>;
  backdropFilter: string;
  setBackdropFilter: Dispatch<SetStateAction<string>>;
  shadow: string;
  setShadow: Dispatch<SetStateAction<string>>;
}

export const UIContext = createContext<UIContextProps>({
  uiMode: true,
  setUIMode: () => {},
  margin: 0,
  setMargin: () => {},
  theme: THEME.rainbow,
  setTheme: () => {},
  borderRadius: 0,
  setBorderRadius: () => {},
  backdropFilter: "none",
  setBackdropFilter: () => {},
  shadow: "none",
  setShadow: () => {},
});

const UIContextProvider: FC = ({ children }) => {
  const [uiMode, setUIMode] = useState(true);
  const [margin, setMargin] = useState(8);
  const [theme, setTheme] = useState(THEME.monochrome);
  const [borderRadius, setBorderRadius] = useState(5);
  const [backdropFilter, setBackdropFilter] = useState("none");
  const [shadow, setShadow] = useState("none");

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      if (JSON.parse(localStorage.getItem("data")!).backdropFilter) {
        setBackdropFilter(JSON.parse(localStorage.getItem("data")!).backdropFilter);
      }
      if (JSON.parse(localStorage.getItem("data")!).theme) {
        setTheme(JSON.parse(localStorage.getItem("data")!).theme);
      }
      if (JSON.parse(localStorage.getItem("data")!).borderRadius) {
        setBorderRadius(JSON.parse(localStorage.getItem("data")!).borderRadius);
      }
      if (JSON.parse(localStorage.getItem("data")!).shadow) {
        setShadow(JSON.parse(localStorage.getItem("data")!).shadow);
      }
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        uiMode,
        setUIMode,
        margin,
        setMargin,
        theme,
        setTheme,
        borderRadius,
        setBorderRadius,
        backdropFilter,
        setBackdropFilter,
        shadow,
        setShadow,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
