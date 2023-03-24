import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme"
import { MyAppInitialProps } from "../types";

import '@/styles/globals.css'
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps, emotionCache }: MyAppInitialProps) {
  return (
    <ThemeProvider theme={theme}>
      
      <CssBaseline />
      {/* @ts-ignore */}
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
      
    </ThemeProvider>
  )
}
