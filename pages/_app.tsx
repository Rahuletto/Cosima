import "@/styles/globals.css";
import "@/styles/mobile.css";
import type { AppProps } from "next/app";

import { DM_Sans } from "next/font/google";

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  style: ["normal"],
  variable: "--main-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            --main-font: ${dm.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
