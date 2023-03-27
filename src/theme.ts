import { createTheme } from "@mui/material/styles";

// Declare a custom type for your theme
declare module "@mui/material/styles" {
  interface TypeText {
    hover: React.CSSProperties["color"];
  }
}

const theme = createTheme({
  palette: {
    text: {
      hover: "#ffffff",
    },
  },
});

export default theme;
