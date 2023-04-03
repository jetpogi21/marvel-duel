import { Paper, Stack, Box, Typography } from "@mui/material";
import React from "react";
import Subheader from "../MUI/Subheader";

export type CardUnities = {
  cardId: number;
  cardUnityId: number;
  description: string;
  id: number;
  CardUnity: {
    id: number;
    cardCompositions: string;
  };
}[];

type CardUnityListProp = {
  cardUnities: CardUnities;
};

const CardUnityList = (prop: CardUnityListProp) => {
  const { cardUnities } = prop;
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction={"column"} spacing={2}>
        <Box width={"100%"}>
          <Subheader>Card Unities</Subheader>
          {cardUnities.map((cardUnity) => {
            return (
              <Box key={cardUnity.id}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {cardUnity.CardUnity.cardCompositions}
                </Typography>
                <Typography>{cardUnity.description}</Typography>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Paper>
  );
};

export default CardUnityList;
