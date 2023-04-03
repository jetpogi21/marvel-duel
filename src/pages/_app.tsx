import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { MyAppInitialProps } from "../types";

import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { AppProvider } from "../contexts/Global";

export default function App({
  Component,
  pageProps,
  emotionCache,
}: MyAppInitialProps) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppProvider>
  );
}
