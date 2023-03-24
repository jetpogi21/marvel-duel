import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Stack direction="row" maxWidth={"md"} sx={{ width: "100%" }} mx="auto">
        <Toolbar sx={{ width: "100%" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Typography variant="body1" component="div" sx={{ margin: 1 }}>
            Home
          </Typography>
          <Typography variant="body1" component="div" sx={{ margin: 1 }}>
            About
          </Typography>
          <Typography variant="body1" component="div" sx={{ margin: 1 }}>
            Contact
          </Typography>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default Navbar;
