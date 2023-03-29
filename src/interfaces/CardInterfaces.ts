import { BasicModel } from "./GeneralInterfaces";

//This is the shape of the object that will come from the API
interface CardKeywordModel extends BasicModel {
  CardCardKeyword: { id: number };
}

interface CardKeywordFromList {
  cardcardkeyword_id?: number;
  card_id?: number;
  cardkeyword_id?: number;
  name?: string;
}

export interface CardModel {
  id: number;
  name: string;
  type: "c" | "w" | "t" | "p";
  cost: number;
  battleStyle: "a" | "g" | "s" | null;
  atk: number | string;
  shield: number | string;
  description: string;
  deckId: number | string;
  BelongsTo: BasicModel;
  CardKeywords: (CardKeywordModel | CardKeywordFromList)[];
  CardUnityCards: string[];
}

export interface CardFormModel {
  id: string;
  name: string;
  type: "c" | "w" | "t" | "p";
  cost: number | string;
  battleStyle: "a" | "g" | "s" | "";
  atk: number | string;
  shield: number | string;
  description: string;
  deckId: number | string;
  CardKeywords: CardKeywordModel[];
  [key: string]: unknown;
}

//This is the shape of the filter parameter from filter form
export interface CardQuery {
  q: string;
  cost: string;
  deckID: BasicModel[];
  keywords: BasicModel[];
  type: string;
  battleStyle: string;
  [key: string]: unknown;
}
