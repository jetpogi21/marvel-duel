import * as Yup from "yup";

const CardSchema = Yup.object().shape({
  name: Yup.string().required("This is a required field."),
  type: Yup.string().required("This is a required field."),
  cost: Yup.number().required("This is a required field."),
  battleStyle: Yup.string(),
  atk: Yup.number(),
  shield: Yup.number(),
  deckId: Yup.number(),
  CardKeywords: Yup.array(),
});

export default CardSchema;
