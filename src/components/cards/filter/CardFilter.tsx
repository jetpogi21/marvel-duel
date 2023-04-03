import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import useCardFilter from "../../../hooks/useCardFilter";
import { CardQuery } from "../../../interfaces/CardInterfaces";
import { BasicModel } from "../../../interfaces/GeneralInterfaces";
import {
  MUIAutocomplete,
  MUIRadio,
  MUISwitch,
  MUIText,
} from "../../../utils/formik";
import {
  ConvertBasicModelToControlChoice,
  ConvertNumberArrToControlChoice,
} from "../../../utils/utilities";

type CardFilterProps = {
  decks: BasicModel[];
  keywords: BasicModel[];
  defaultValue: CardQuery;
  initialValues: CardQuery;
  battleStyles: BasicModel[];
  types: BasicModel[];
  costs: number[];
};

const CardFilter = (props: CardFilterProps) => {
  const {
    defaultValue,
    initialValues,
    decks,
    keywords,
    battleStyles,
    types,
    costs,
  } = props;
  const { handleFormikSubmit, resetToDefault } = useCardFilter(defaultValue);

  return (
    <Box
      sx={{
        boxShadow: 1,
        height: "100%",
      }}
      p={2}
      bgcolor="white"
      zIndex="1"
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleFormikSubmit}
      >
        {(formik) => {
          return (
            <Stack
              component="form"
              noValidate
              autoComplete="off"
              direction="column"
              onSubmit={formik.handleSubmit}
              gap={2}
            >
              <Typography fontWeight={"500"}>Filter Cards</Typography>
              <MUIText
                label="Search"
                name="q"
                id="q"
                sx={{ bgcolor: "white" }}
                size="small"
              />
              {decks ? (
                <MUIAutocomplete
                  {...{
                    label: "Decks",
                    items: decks,
                    name: "deckID",
                    multiple: true,
                    freeSolo: false,
                  }}
                />
              ) : (
                ""
              )}
              {keywords ? (
                <MUIAutocomplete
                  {...{
                    label: "Keywords",
                    items: keywords,
                    name: "keywords",
                    multiple: true,
                    freeSolo: false,
                  }}
                />
              ) : (
                ""
              )}
              <MUIRadio
                label="Cost"
                name="cost"
                items={ConvertNumberArrToControlChoice(
                  [{ value: "all", label: "all" }],
                  costs
                )}
                radioProps={{ size: "small" }}
              />

              <MUIRadio
                label="Type"
                name="type"
                items={ConvertBasicModelToControlChoice(
                  [{ value: "all", label: "all" }],
                  types
                )}
                row={true}
                numColumns={2}
                radioProps={{ size: "small" }}
              />
              <MUIRadio
                label="Battle style"
                name="battleStyle"
                items={ConvertBasicModelToControlChoice(
                  [{ value: "all", label: "all" }],
                  battleStyles
                )}
                numColumns={2}
                row={true}
                radioProps={{ size: "small" }}
              />
              <MUISwitch label="Has Card Unity?" name="hasCardUnity" />
              <Stack direction="row" sx={{ gap: 1, "& button": { flex: 1 } }}>
                <Button type="submit" variant="contained">
                  Filter
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => resetToDefault(formik)}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CardFilter;
