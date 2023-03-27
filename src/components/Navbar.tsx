import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Link as MUILink,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

function isLinkActive(componentHref: string, routerHref: string) {
  return routerHref === componentHref;
}

const NavbarLink = ({
  href,
  routerHref,
  caption,
}: {
  href: string;
  routerHref: string;
  caption: string;
}) => {
  return isLinkActive(href, routerHref) ? (
    <Typography
      color={"white"}
      component={"span"}
      sx={{ textDecoration: "none", p: 1 }}
    >
      {caption}
    </Typography>
  ) : (
    <Typography
      color={"white"}
      component={Link}
      href={href}
      sx={{
        p: 1,
        textDecoration: "none",
        "&:hover": { color: "text.hover", bgcolor: "grey" },
      }}
    >
      {caption}
    </Typography>
  );
};

const Navbar = () => {
  const router = useRouter();
  const routerHref = router.pathname;

  return (
    <AppBar position="static">
      <Stack
        direction="row"
        maxWidth={"md"}
        sx={{ width: "100%", "& .MuiToolbar-root": { px: 0 } }}
        mx="auto"
      >
        <Toolbar sx={{ width: "100%" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Marvel Duel
          </Typography>
          <Stack direction="row" spacing={2}>
            <NavbarLink href="/" routerHref={routerHref} caption="Cards" />
            <NavbarLink
              href="/heroes"
              routerHref={routerHref}
              caption="Heroes"
            />
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default Navbar;
