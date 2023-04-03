import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import CardListBody from "../../components/cards/list/CardListBody";
import { CardProvider } from "../../contexts/CardContext";

export default function CardPage({ query }: { query: ParsedUrlQuery }) {
  return (
    <>
      <Head>
        <title>Card List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProvider>
        <CardListBody query={query} />
      </CardProvider>
    </>
  );
}

CardPage.getInitialProps = async ({ query }: { query: ParsedUrlQuery }) => {
  return { query };
};
