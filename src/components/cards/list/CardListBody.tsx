import { Box, Paper, Stack } from "@mui/material";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { useCardContext } from "../../../contexts/CardContext";
import useCards from "../../../hooks/useCards";
import Breadcrumbs from "../../breadcrumbs/Breadcrumbs";
import CardFilter from "../filter/CardFilter";
import CardGrid from "./CardGrid";
import { CardListHeader } from "./CardListHeader";

const CardListBody = ({ query }: { query: ParsedUrlQuery }) => {
  const { decks, keywords, battleStyles, types, costs } = useCardContext();
  const {
    defaultValue,
    initialValues,
    breadCrumbLinks,
    limit,
    handleLimitChange,
    sortOptions,
    modifySort,
    cards,
    gridLoading,
    recordCount,
  } = useCards(query);

  return (
    <Box bgcolor="grey.100" minHeight="calc(100vh - 64px)" display={"flex"}>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box sx={{ minWidth: 300, flexShrink: 0 }}>
          {decks && keywords ? (
            <CardFilter
              battleStyles={battleStyles!}
              types={types!}
              costs={costs!}
              decks={decks}
              keywords={keywords}
              defaultValue={defaultValue}
              initialValues={initialValues}
            />
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ p: 2, flexGrow: 1 }}>
          <Paper sx={{ height: "100%" }}>
            <Stack direction="column">
              <Breadcrumbs links={breadCrumbLinks} />
              <Box sx={{ p: 2 }}>
                <Stack direction="row" width={"100%"} alignItems="center">
                  <CardListHeader
                    limit={limit}
                    handleLimitChange={handleLimitChange}
                    sortOptions={sortOptions}
                    modifySort={modifySort}
                  />
                </Stack>
                <Stack
                  direction="row"
                  gap={2}
                  alignItems={"flex-start"}
                  sx={{ my: 2 }}
                >
                  <CardGrid
                    cards={cards}
                    gridLoading={gridLoading}
                    recordCount={recordCount}
                    limit={limit}
                  />
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default CardListBody;
