import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import "styles/taiwindcss.css";
import "styles/globals.css";

import { useEffect } from "react";
import getConfig from "next/config";
import type { AppProps } from "next/app";
import AlertContextProvider from "contexts/AlertContext";
import { resetServerContext } from "react-beautiful-dnd";
import TileContextProvider from "contexts/TileContext";
import UIContextProvider from "contexts/UIContext";
import MessageContextProvider from "contexts/MessageContext";
import AuthContextProvider from "contexts/AuthContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    console.log(`work on: ${publicRuntimeConfig.VERCEL_ENV}`);
    console.log(`git commit: ${publicRuntimeConfig.COMMIT_SHA}`);
  }, [publicRuntimeConfig.COMMIT_SHA, publicRuntimeConfig.VERCEL_ENV]);
  resetServerContext();

  return (
    <SessionProvider session={session}>
      <AuthContextProvider>
        <UIContextProvider>
          <AlertContextProvider>
            <TileContextProvider>
              <MessageContextProvider>
                <Component {...pageProps} />
              </MessageContextProvider>
            </TileContextProvider>
          </AlertContextProvider>
        </UIContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
