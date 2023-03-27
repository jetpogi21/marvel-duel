import * as React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { MUIText } from "../utils/formik";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import Head from "next/head";

// Formik wrapper
const FormikWrapper = () => {
  // Define your initial values
  const initialValues = {
    name: "",
    email: "",
    // ... other fields
  };

  // Define your validation schema
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    // ... other validations
  });

  // Define your submit handler
  const onSubmit = (values: any) => {
    console.log(values);
    // ... do something with the values
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {/* Use your component as a Field */}
        <Field name="name" label="Name" component={MUIText} />
        <Field name="email" label="Email" component={MUIText} />
        {/* ... other fields */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default function Index() {
  return (
    <>
      <Head>
        <title>Card List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Stack
        direction="column"
        sx={{ maxWidth: "md", width: "100%", m: "auto", mt: 1 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Cards
        </Typography>
        <Typography>Filter</Typography>
        <FormikWrapper />
      </Stack>
    </>
  );
}
