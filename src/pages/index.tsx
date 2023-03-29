import Head from "next/head";
import { CardProvider } from "../contexts/CardContext";
import CardListBody from "../components/cards/list/CardListBody";

export default function CardPage() {
  return (
    <>
      <Head>
        <title>Card List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProvider>
        <CardListBody />
      </CardProvider>
    </>
  );
}
