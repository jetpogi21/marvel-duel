import * as React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function Index() {
  return (
    <Stack
      direction="column"
      sx={{ maxWidth: "md", width: "100%", m: "auto", mt: 1 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Hello Heroes!
      </Typography>
    </Stack>
  );
}
