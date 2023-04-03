import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CustomBreadcrumbs from "../../breadcrumbs/Breadcrumbs";
import { Field, Formik } from "formik";
import Link from "next/link";
import useCardForm from "../../../hooks/useCardForm";
import CardSchema from "../../../schema/CardSchema";
import {
  MUIText,
  MUISelect,
  MUIRadio,
  MUIAutocomplete,
  MUICheckboxGroup,
} from "../../../utils/formik";
import {
  ConvertBasicModelToControlChoice,
  ConvertNumberArrToControlChoice,
} from "../../../utils/utilities";
import Dialog from "../../dialog/Dialog";
import Snackbar from "../../../snackBar/Snackbar";
import CardUnityList, { CardUnities } from "../../cardUnities/CardUnityList";

const CardForm = ({ id }: { id: string }) => {
  const {
    initialValues,
    links,
    handleSubmit,
    types,
    battleStyles,
    decks,
    keywords,
    costs,
    handleOpen,
    handleClose,
    open,
    handleDelete,
    card,
  } = useCardForm(id)!;

  return (
    <Box
      bgcolor="grey.100"
      minHeight="calc(100vh - 64px)"
      py={2}
      display={"flex"}
    >
      <Container maxWidth="lg">
        <Stack direction="column" spacing={2}>
          <Paper>
            <CustomBreadcrumbs links={links} />
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={CardSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <Stack
                    component="form"
                    noValidate
                    autoComplete="off"
                    direction="column"
                    onSubmit={formik.handleSubmit}
                    spacing={2}
                    p={2}
                    sx={{
                      "& .MuiFormHelperText-root": {
                        fontSize: "0.70rem",
                        ml: 1,
                      },
                      "& .MuiInputLabel-shrink": {
                        fontSize: "1rem",
                        bgcolor: "white",
                        width: "auto",
                        pr: 0.8,
                        transform: "translate(14px, -11px) scale(0.75)",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Stack direction="column" flex={{ xs: 2 }} spacing={2}>
                        {/* Name */}
                        <MUIText autoFocus label="Name" name="name" />
                        {/* Hidden ID field */}
                        <Field name="id" type="hidden" />
                        {types ? (
                          <MUIRadio
                            label="Type"
                            name="type"
                            items={ConvertBasicModelToControlChoice([], types)}
                            row={true}
                          />
                        ) : (
                          ""
                        )}
                        {costs ? (
                          <MUIRadio
                            label="Cost"
                            name="cost"
                            items={ConvertNumberArrToControlChoice([], costs)}
                          />
                        ) : (
                          ""
                        )}
                        {battleStyles ? (
                          <MUIRadio
                            label="Battle Style"
                            name="battleStyle"
                            items={ConvertBasicModelToControlChoice(
                              [{ value: "", label: "None" }],
                              battleStyles
                            )}
                            row={true}
                          />
                        ) : (
                          ""
                        )}
                        <Stack direction={"row"} spacing={2}>
                          <MUIText label="ATK" name="atk" type="number" />
                          <MUIText label="Shield" name="shield" type="number" />
                        </Stack>

                        <MUIText
                          label="Description"
                          name="description"
                          multiline
                          minRows={9}
                        />
                        {keywords ? (
                          <MUIAutocomplete
                            label="Keywords"
                            name="CardCardKeywords"
                            multiple
                            items={keywords}
                            freeSolo={false}
                          />
                        ) : (
                          ""
                        )}
                      </Stack>
                      <Box flex={{ xs: 1 }}>
                        {decks ? (
                          <MUIRadio
                            label="Deck"
                            name="deckId"
                            items={ConvertBasicModelToControlChoice([], decks)}
                            row={false}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Stack>

                    <Stack direction="row" gap={1}>
                      <Button
                        type="submit"
                        size="small"
                        color="primary"
                        variant="contained"
                        sx={{ width: 50 }}
                      >
                        Submit
                      </Button>
                      {id !== "add" && (
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          sx={{ width: 50 }}
                          onClick={handleOpen}
                        >
                          Delete
                        </Button>
                      )}

                      <Button type="submit" size="small" sx={{ width: 50 }}>
                        <Link
                          href="/"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Cancel
                        </Link>
                      </Button>
                    </Stack>
                  </Stack>
                );
              }}
            </Formik>
          </Paper>
          {/* Card Unity Portion */}
          {card?.CardUnityCards && card.CardUnityCards.length > 0 ? (
            <CardUnityList
              cardUnities={card.CardUnityCards as unknown as CardUnities}
            />
          ) : (
            ""
          )}
        </Stack>
      </Container>

      <Dialog
        {...{
          open,
          message: "Are you sure you want to delete this record?",
          handleClose,
          handleFunction: handleDelete,
        }}
      />
    </Box>
  );
};

export default CardForm;
