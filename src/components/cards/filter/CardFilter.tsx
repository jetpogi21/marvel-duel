import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useCardContext } from "../../../contexts/CardContext";
import useCardFilter from "../../../hooks/useCardFilter";
import { CardQuery } from "../../../interfaces/CardInterfaces";
import { BasicModel } from "../../../interfaces/GeneralInterfaces";
import { MUIAutocomplete, MUIRadio, MUIText } from "../../../utils/formik";

type CardFilterProps = {
  decks: BasicModel[];
  keywords: BasicModel[];
  defaultValue: CardQuery;
  initialValues: CardQuery;
};

const CardFilter = (props: CardFilterProps) => {
  const { defaultValue, initialValues, decks, keywords } = props;

  const { handleFormikSubmit, resetToDefault } = useCardFilter(defaultValue);

  return (
    <Box
      sx={{
        boxShadow: 1,
        width: "33.33%",
        flex: "0 0 auto",
        minWidth: "300px",
        height: "auto",
      }}
      py={4}
      px={2}
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
                items={[
                  { value: "all", label: "all" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                ]}
                radioProps={{ size: "small" }}
              />

              <MUIRadio
                label="Type"
                name="type"
                items={[
                  { value: "all", label: "all" },
                  { value: "c", label: "character" },
                  { value: "w", label: "Weapon" },
                  { value: "p", label: "Power" },
                  { value: "t", label: "Tactic" },
                ]}
                row={false}
                numColumns={2}
                radioProps={{ size: "small" }}
              />
              <MUIRadio
                label="Battle style"
                name="battleStyle"
                items={[
                  { value: "all", label: "all" },
                  { value: "a", label: "attack" },
                  { value: "g", label: "guardian" },
                  { value: "s", label: "support" },
                ]}
                row={false}
                radioProps={{ size: "small" }}
              />
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
