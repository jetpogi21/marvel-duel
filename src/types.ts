import { DocumentInitialProps } from "next/document";
import { AppInitialProps, AppProps } from "next/app";
import { EmotionCache } from "@emotion/cache";
import { ReactElement } from "react";

export interface MyDocumentInitialProps extends DocumentInitialProps {
  emotionStyleTags: ReactElement[];
}

export interface MyAppInitialProps extends AppProps {
  emotionCache: EmotionCache;
}
