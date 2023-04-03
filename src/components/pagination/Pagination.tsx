import { useRouter } from "next/router";
import { Pagination as MUIPagination, PaginationItem } from "@mui/material";

interface CustomPaginationProps {
  recordCount: number;
  limit: string;
}

const Pagination = ({ recordCount, limit }: CustomPaginationProps) => {
  const router = useRouter();
  const query = router.query;
  const numLimit = parseInt(limit);
  const pages = Math.ceil(recordCount / numLimit);
  const currentPage = router.query.page
    ? parseInt(router.query.page as string)
    : 1;

  return (
    <MUIPagination
      count={pages}
      page={currentPage}
      showFirstButton={true}
      showLastButton={true}
      renderItem={(item) => {
        const paramsArrExceptPage = [];
        for (const [key, value] of Object.entries(query)) {
          //If the parameter is not named "page" then add it back to the link
          key !== "page" && paramsArrExceptPage.push([key, value]);
        }

        //Set the url page parameter (only if the page is not equal to 1)
        item.page !== 1 && paramsArrExceptPage.push(["page", item.page]);

        //if param[1] is an array add twice into the query with each item
        const toString = paramsArrExceptPage
          .map((param) =>
            Array.isArray(param[1])
              ? param[1].map((item) => `${param[0]}=${item}`)
              : `${param[0]}=${param[1]}`
          )
          .flat()
          .join("&");

        const href = toString
          ? `${router.pathname}?${toString}`
          : `${router.pathname}`;

        const disabled = query.page === "0" || query.page === router.asPath;

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          router.push(href);
        };

        return (
          <PaginationItem
            component="a"
            href={href}
            {...item}
            onClick={handleClick}
          />
        );
      }}
    />
  );
};

export default Pagination;
