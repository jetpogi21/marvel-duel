import React, {
  useContext,
  useState,
  useEffect,
  ReactNode,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import axiosClient from "../utils/api";
import { BasicModel } from "../interfaces/GeneralInterfaces";
import axios from "axios";

interface CardContextValue {
  decks?: BasicModel[];
  keywords?: BasicModel[];
  battleStyles?: { id: string; name: string }[];
  types?: { id: string; name: string }[];
  costs?: number[];
  handleKeywordAddition?: (item: BasicModel) => void;
}

const CardContext = React.createContext<CardContextValue>({});

// Define an interface for the card state
interface CardState {
  decks: BasicModel[];
  keywords: BasicModel[];
}

// Define an enum for the card actions
enum CardActionType {
  SET_DECKS = "SET_DECKS",
  SET_KEYWORDS = "SET_KEYWORDS",
  ADD_KEYWORD = "ADD_KEYWORD",
}

// Define an interface for the card action
interface CardAction {
  type: CardActionType;
  payload: any;
}

// Define a reducer function for the card state
const cardReducer = (state: CardState, action: CardAction): CardState => {
  switch (action.type) {
    case CardActionType.SET_DECKS:
      return { ...state, decks: action.payload };
    case CardActionType.SET_KEYWORDS:
      return { ...state, keywords: action.payload };
    case CardActionType.ADD_KEYWORD:
      return {
        ...state,
        keywords: [...state.keywords, action.payload].sort((a, b) =>
          a["name"] > b["name"] ? 1 : b["name"] > a["name"] ? -1 : 0
        ),
      };
    default:
      return state;
  }
};

const CardProvider = ({ children }: { children: ReactNode }) => {
  // Use useReducer hook instead of useState hooks to manage the card state
  const [state, dispatch] = useReducer(cardReducer, {
    decks: [],
    keywords: [],
  });

  // Use useMemo hook to memoize the static values
  const battleStyles = useMemo(
    () => [
      { id: "a", name: "Attack" },
      { id: "g", name: "Guardian" },
      { id: "s", name: "Support" },
    ],
    []
  );
  const types = useMemo(
    () => [
      { id: "c", name: "character" },
      { id: "w", name: "Weapon" },
      { id: "p", name: "Power" },
      { id: "t", name: "Tactic" },
    ],
    []
  );
  const costs = useMemo(() => [2, 3, 4, 5, 6], []);

  // Use useCallback hook to memoize the function
  const handleKeywordAddition = useCallback(
    (item: BasicModel) => {
      dispatch({ type: CardActionType.ADD_KEYWORD, payload: item });
    },
    [dispatch]
  );

  const fetchData = async () => {
    const urls = ["/decks", "/keywords"];
    let deckResponse: BasicModel[], keywordResponse: BasicModel[];

    // Use a source object to cancel requests
    const source = axios.CancelToken.source();

    Promise.all(
      urls.map((url) => axiosClient.get(url, { cancelToken: source.token }))
    ).then((response) => {
      deckResponse = response[0].data.data || [];
      keywordResponse = response[1].data.data || [];
      dispatch({ type: CardActionType.SET_DECKS, payload: deckResponse });
      dispatch({ type: CardActionType.SET_KEYWORDS, payload: keywordResponse });
    });

    // Return a cleanup function to cancel requests when component unmounts
    return () => {
      source.cancel();
    };
  };

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(state.decks));
  }, [state.decks]);

  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(state.keywords));
  }, [state.keywords]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CardContext.Provider
      value={{
        decks: state.decks,
        keywords: state.keywords,
        battleStyles,
        types,
        costs,
        handleKeywordAddition,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

const useCardContext = () => {
  return useContext(CardContext);
};

export { CardProvider, useCardContext };
