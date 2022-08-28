import { THEME, ThemeList } from "constants/theme";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface UIContextProps {
  uiMode: boolean;
  setUIMode: Dispatch<SetStateAction<boolean>>;
  margin: number;
  setMargin: Dispatch<SetStateAction<number>>;
  theme: string[];
  setTheme: Dispatch<SetStateAction<string[]>>;
  borderRadius: number;
  setBorderRadius: Dispatch<SetStateAction<number>>;
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
});

const UIContextProvider: FC = ({ children }) => {
  const [uiMode, setUIMode] = useState(true);
  const [margin, setMargin] = useState(8);
  const [theme, setTheme] = useState(THEME.monochrome);
  const [borderRadius, setBorderRadius] = useState(5);

  return (
    <UIContext.Provider
      value={{ uiMode, setUIMode, margin, setMargin, theme, setTheme, borderRadius, setBorderRadius }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
