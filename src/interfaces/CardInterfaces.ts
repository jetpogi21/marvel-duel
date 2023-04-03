import { BasicModel, ListQuery } from "./GeneralInterfaces";

//This is the shape of the object that will come from the API
export interface CardModel {
  id: string | number;
  name: string;
  type: string;
  cost: string | number;
  battleStyle: "Attack" | "Guardian" | "Support" | null;
  atk?: string | number | null;
  shield?: string | number | null;
  description: string;
  deckId: string | number;
  Deck: BasicModel;
  slug: string;
  CardCardKeywords?: CardCardKeywordsEntity[] | null;
  CardUnityCards?: CardUnityCardsEntity[] | null;
}

export interface CardCardKeywordsEntity {
  id: number;
  cardId: number;
  cardKeywordId: number;
  CardKeyword: BasicModel;
}

export interface CardUnityCardsEntity {
  id: number;
  description: string;
  CardUnityId: number;
  CardId: number;
  CardUnity: CardUnity;
}

export interface CardUnity {
  id: number;
  cardCompositions: string;
}

export interface CardFormModel
  extends Omit<CardModel, "Deck" | "CardUnityCards" | "battleStyle" | "slug"> {
  battleStyle: "Attack" | "Guardian" | "Support" | "";
}

//This is the shape of the filter parameter from filter form
export interface CardQuery {
  battleStyle: string;
  cost: string;
  deckID: BasicModel[];
  q: string;
  type: string;
  keywords: BasicModel[];
  hasCardUnity: boolean;
  [key: string]: unknown;
}
