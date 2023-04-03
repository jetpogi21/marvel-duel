import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { red, orange, blue } from "@mui/material/colors";
import { CardModel } from "../../../interfaces/CardInterfaces";
import Pagination from "../../pagination/Pagination";
import SingleCard from "./SingleCard";
/* import SingleCard from "./SingleCard"; */
/* import CustomPagination from "../../pagination/CustomPagination"; */

type CardGridProps = {
  cards: CardModel[];
  gridLoading: boolean;
  recordCount: number;
  limit: string;
};

//a helper function that will get the card's backColor
const getBackColor = (
  battleStyle: "Attack" | "Guardian" | "Support" | null
) => {
  if (!battleStyle) {
    return "white";
  }
  const colorObject = {
    Attack: red[200],
    Support: orange[200],
    Guardian: blue[200],
  };
  return colorObject[battleStyle];
};

const CardGrid = ({
  cards,
  gridLoading,
  recordCount,
  limit,
}: CardGridProps) => {
  return (
    <Box py={0} sx={{ flex: "auto" }}>
      {!gridLoading ? (
        <Stack direction="column" gap={2}>
          {cards.length === 0 ? (
            <Typography>There is no data.</Typography>
          ) : (
            <>
              <Grid container columns={12} spacing={2}>
                {cards.map((card) => {
                  return (
                    <Grid
                      key={card.id}
                      item={true}
                      xs={12}
                      sm={6}
                      md={12}
                      lg={6}
                      xl={4}
                      sx={{ fontSize: "0.9rem" }}
                    >
                      <Paper
                        sx={{
                          p: 1,
                          bgcolor: getBackColor(card.battleStyle),
                          height: "100%",
                          borderRadius: 1,
                          border: `1px solid ${getBackColor(card.battleStyle)}`,
                        }}
                        elevation={1}
                      >
                        <SingleCard card={card} />
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
              <Pagination recordCount={recordCount} limit={limit} />
            </>
          )}
        </Stack>
      ) : (
        <Typography fontWeight="bold">Loading...</Typography>
      )}
    </Box>
  );
};

export default CardGrid;
