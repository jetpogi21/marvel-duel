import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useCardContext } from "../../../contexts/CardContext";
import useCardFilter from "../../../hooks/useCardFilter";
import { MUIAutocomplete, MUIRadio, MUIText } from "../../../utils/formik";

const CardFilter = () => {
  const { initialValues, handleFormikSubmit, resetToDefault } = useCardFilter();
  const { decks, keywords } = useCardContext()!;

  return (
    <Box
      sx={{
        my: 3,
        boxShadow: 1,
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
                    name: "deck",
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
                    name: "keyword",
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
                radioProps={{ size: "small" }}
              />
              <MUIRadio
                label="Battle style"
                name="bs"
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
