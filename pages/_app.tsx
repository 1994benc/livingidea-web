import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initBackend } from "../lib/firebase";
import { Toaster } from "react-hot-toast";

initBackend();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
