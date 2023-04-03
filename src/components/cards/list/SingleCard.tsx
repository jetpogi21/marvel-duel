import ShieldIcon from "@mui/icons-material/Shield";
import { Divider, Stack, SvgIcon, Typography } from "@mui/material";
import { RiSwordFill } from "react-icons/ri";
import {
  BsHexagonFill,
  BsFillLightningChargeFill,
  BsArrowClockwise,
} from "react-icons/bs";
import { GiPistolGun, GiCharacter } from "react-icons/gi";
import { CardModel } from "../../../interfaces/CardInterfaces";
import Link from "next/link";
import MUILInk from "@mui/material/Link";
import CardUnityList from "../../cardUnities/CardUnityList";
import { CardUnities } from "../../cardUnities/CardUnityList";

const CardIcon = ({
  icon,
  value,
}: {
  icon: JSX.Element;
  value: string | number | null | undefined;
}) => {
  return value ? (
    <Stack direction="row" alignItems="center">
      {icon}
      <Typography variant="body1" sx={{ flex: "1", textAlign: "center" }}>
        {value}
      </Typography>
    </Stack>
  ) : null;
};

const NameIcon = ({ type }: { type: string }) => {
  const iconObject = {
    Character: <GiCharacter />,
    Weapon: <GiPistolGun />,
    Tactic: <BsArrowClockwise />,
    Power: <BsFillLightningChargeFill />,
  };

  return (
    <SvgIcon sx={{ position: "relative", top: "2px" }}>
      {/* @ts-ignore */}
      {iconObject[type]}
    </SvgIcon>
  );
};

interface SingleCardProps {
  card: CardModel;
}

const SingleCard = ({ card }: SingleCardProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      sx={{ height: "100%" }}
    >
      <Stack direction="row">
        <Stack direction="row" alignItems="center" gap={1}>
          <NameIcon type={card.type} />
          <MUILInk
            variant="body2"
            component={Link}
            href={`/cards/${card.slug}`}
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {card.name}
          </MUILInk>
        </Stack>

        <Stack ml="auto" direction="row" gap={1}>
          <CardIcon
            icon={
              <SvgIcon
                sx={{
                  fontSize: "1.25rem",
                  position: "relative",
                  top: "2px",
                  ml: 2,
                }}
              >
                <BsHexagonFill />
              </SvgIcon>
            }
            value={card.cost}
          />
          <CardIcon
            icon={<ShieldIcon sx={{ fontSize: "1.20rem" }} />}
            value={card.shield}
          />
          <CardIcon
            icon={
              <SvgIcon
                sx={{ fontSize: "1.30rem", position: "relative", top: "1px" }}
              >
                <RiSwordFill />
              </SvgIcon>
            }
            value={card.atk}
          />
        </Stack>
      </Stack>
      <Divider sx={{ pt: 2 }} />
      <Stack
        direction="column"
        //This will remove the default stylong of the CardUnityList component
        sx={{
          my: 1,
          "& .MuiPaper-root": {
            py: 0,
            px: 1,
            borderRadius: 0,
            fontSize: "0.75rem",
            bgcolor: "inherit",
            boxShadow: 0,
          },
          "& .MuiTypography-root": { fontSize: "0.75rem" },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            px: 1,
            mb: "auto",
            whiteSpace: "pre-line",
          }}
        >
          {card.description}
        </Typography>
        {card.CardUnityCards && card.CardUnityCards.length > 0 ? (
          <CardUnityList
            cardUnities={card.CardUnityCards as unknown as CardUnities}
          />
        ) : (
          ""
        )}
      </Stack>
      <Divider sx={{ mb: 2, mt: "auto" }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2">{card.Deck.name}</Typography>
        <Typography variant="subtitle2">
          {card.CardCardKeywords?.map((kw) => kw.CardKeyword.name).join(",")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SingleCard;
