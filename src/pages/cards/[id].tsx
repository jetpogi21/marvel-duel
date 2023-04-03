import React from "react";
import Head from "next/head";
import { CardProvider } from "../../contexts/CardContext";
import CardForm from "../../components/cards/form/CardForm";
import Snackbar from "../../snackBar/Snackbar";

const CardFormPage = ({ id }: { id: string }) => {
  return (
    <>
      <Head>
        <title>Card Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CardProvider>
        <CardForm id={id} />
      </CardProvider>
      <Snackbar />
    </>
  );
};

CardFormPage.getInitialProps = async ({ query }: { query: { id: string } }) => {
  return { id: query.id };
};

export default CardFormPage;
