import { THEME, ThemeList } from "constants/theme";
import { createContext, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface AuthContextProps {
  session: Session | null;
  solvedac: string | null;
  setSolvedAC: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({ solvedac: null, session: null, setSolvedAC: () => {} });

const AuthContextProvider: FC = ({ children }) => {
  const [solvedac, setSolvedAC] = useState(null as null | string);
  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      if (JSON.parse(localStorage.getItem("data")!).solvedac)
        setSolvedAC(JSON.parse(localStorage.getItem("data")!).solvedac);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        solvedac,
        session,
        setSolvedAC,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
