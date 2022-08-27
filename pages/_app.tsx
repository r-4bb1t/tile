import "styles/taiwindcss.css";
import "styles/globals.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useEffect } from "react";
import getConfig from "next/config";
import type { AppProps } from "next/app";
import AlertContextProvider from "contexts/AlertContext";
import { resetServerContext } from "react-beautiful-dnd";

function MyApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    console.log(`work on: ${publicRuntimeConfig.VERCEL_ENV}`);
    console.log(`git commit: ${publicRuntimeConfig.COMMIT_SHA}`);
  }, [publicRuntimeConfig.COMMIT_SHA, publicRuntimeConfig.VERCEL_ENV]);
  resetServerContext();

  return (
    <AlertContextProvider>
      <Component {...pageProps} />
    </AlertContextProvider>
  );
}

export default MyApp;
