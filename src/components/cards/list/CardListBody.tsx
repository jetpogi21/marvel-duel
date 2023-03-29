import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { useCardContext } from "../../../contexts/CardContext";
import useCards from "../../../hooks/useCards";
import CardFilter from "../filter/CardFilter";
import { CardListHeader } from "./CardListHeader";

const CardListBody = () => {
  const {
    limit,
    handleLimitChange,
    sortOptions,
    modifySort,
    defaultValue,
    initialValues,
  } = useCards();

  const { decks, keywords } = useCardContext();

  return (
    <Box
      bgcolor="grey.100"
      minHeight="100vh"
      py={2}
      sx={{ "& > .MuiContainer-root": { px: { xs: 2, lg: 0 } } }}
    >
      <Container maxWidth="lg">
        <Stack direction="row">
          <CardListHeader
            limit={limit}
            handleLimitChange={handleLimitChange}
            sortOptions={sortOptions}
            modifySort={modifySort}
          />
        </Stack>
        <Stack direction="row" gap={2} alignItems={"flex-start"}>
          {/* <CardGrid /> */}
          {decks && keywords ? (
            <CardFilter
              decks={decks}
              keywords={keywords}
              defaultValue={defaultValue}
              initialValues={initialValues}
            />
          ) : (
            ""
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default CardListBody;
