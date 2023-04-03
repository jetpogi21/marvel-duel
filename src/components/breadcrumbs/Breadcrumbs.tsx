import Typography from "@mui/material/Typography";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

interface BreadcrumbsProps {
  links: {
    href: string;
    caption: string;
  }[];
}

const Breadcrumbs = ({ links }: BreadcrumbsProps): JSX.Element => {
  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      sx={{ p: 2, borderBottom: 1, borderColor: "lightgray" }}
    >
      {links.map((item, index) =>
        index === links.length - 1 ? (
          <Typography key={item.href} color="text.primary">
            {item.caption}
          </Typography>
        ) : (
          <Link key={item.href} href={item.href}>
            {item.caption}
          </Link>
        )
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
