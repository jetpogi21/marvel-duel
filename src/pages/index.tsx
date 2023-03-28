import Head from "next/head";
//import CardFilter from "../components/cards/filter/CardFilter";
//import CardGrid from "../components/cards/list/CardGrid";
import { CardProvider } from "../contexts/CardContext";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { CardListHeader } from "../components/cards/list/CardListHeader";
import CardFilter from "../components/cards/filter/CardFilter";

export default function CardPage() {
  return (
    <>
      <Head>
        <title>Card List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProvider>
        <Box
          bgcolor="grey.100"
          minHeight="100vh"
          py={2}
          sx={{ "& > .MuiContainer-root": { px: 0 } }}
        >
          <Container maxWidth="lg">
            <Stack direction="row">
              <CardListHeader />
            </Stack>
            <Stack direction="row" gap={2} alignItems={"flex-start"}>
              {/* <CardGrid /> */}
              <CardFilter />
            </Stack>
          </Container>
        </Box>
      </CardProvider>
    </>
  );
}
