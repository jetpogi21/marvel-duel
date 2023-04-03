import { Typography } from "@mui/material";
import React from "react";

type SubheaderProps = {
  children: JSX.Element | string;
};
const Subheader = ({ children }: SubheaderProps) => {
  return (
    <Typography variant="h6" color="gray">
      {children}
    </Typography>
  );
};

export default Subheader;
