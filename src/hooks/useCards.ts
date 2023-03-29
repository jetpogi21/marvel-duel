import { useState, useEffect } from "react";
import { CardModel, CardQuery } from "../interfaces/CardInterfaces";
import axiosClient from "../utils/api";
import { useRouter } from "next/router";
import { red, orange, blue } from "@mui/material/colors";

import {
  getAxiosParams,
  getFilterValueFromURL,
  getFirstItem,
  getSortedBy,
  setQueryStringParam,
  supplyMissingNames,
} from "../utils/utilities";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { useCardContext } from "../contexts/CardContext";
import { SortOptions } from "../interfaces/GeneralInterfaces";

const useCards = () => {
  const { decks, keywords } = useCardContext();
  const [cards, setCards] = useState<CardModel[]>([]);

  console.log({ cards });
  const [gridLoading, setGridLoading] = useState(true);
  const [recordCount, setRecordCount] = useState(0);

  const router = useRouter();
  const query = router.query;

  //Initial values for the filter form
  const defaultValue: CardQuery = {
    cost: "all",
    deckID: [],
    q: "",
    keywords: [],
    type: "all",
    battleStyle: "all",
  };

  //Re-assign the defaultValues depending on the query of the URL
  const initialValues: CardQuery = getFilterValueFromURL(query, defaultValue);

  if (decks) {
    supplyMissingNames(decks, initialValues.deckID);
  }

  if (keywords) {
    supplyMissingNames(keywords, initialValues.keywords);
  }

  //Sort Method starts here
  const sortOptions: SortOptions = {
    sortedBy: getSortedBy(query, ["id", "desc"]),
    list: [
      { name: "id", caption: "Most Recent" },
      { name: "name", caption: "Name" },
      { name: "cost", caption: "Cost" },
      { name: "atk", caption: "ATK" },
      { name: "shield", caption: "Shield" },
    ],
  };

  //handle of click of the sort menu
  const modifySort = (name: string, sortOptions: SortOptions) => {
    if (name === sortOptions.sortedBy[0]) {
      const value = sortOptions.sortedBy[1] === "desc" ? name : `-${name}`;
      setQueryStringParam(query, "sort", value);
    } else {
      setQueryStringParam(query, "sort", name);
    }
    // You can use the updated params object to update the URL or perform other actions
    router.push({ pathname: router.pathname, query });
  };

  //limit related
  const handleLimitChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value;
    setQueryStringParam(query, "limit", value);
    router.push({ pathname: router.pathname, query });
  };

  const fetchCards = async () => {
    setGridLoading(true);

    try {
      const { data } = await axiosClient.get("/cards/", {
        params: {
          ...getAxiosParams(query, defaultValue),
          page: query.page,
          limit: query.limit,
          sort: query.sort,
        },
      });

      setCards(data.data || []);
      setRecordCount(data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setGridLoading(false);
    }
  };

  //on change of the limit select box
  useEffect(() => {
    fetchCards();
  }, [query]);

  //a helper function that will get the card's backColor
  const getBackColor = (battleStyle: "a" | "g" | "s" | null) => {
    if (!battleStyle) {
      return "white";
    }
    const colorObject = { a: red[500], s: orange[500], g: blue[500] };
    return colorObject[battleStyle];
  };

  return {
    cards,
    gridLoading,
    recordCount,
    getBackColor,
    initialValues,
    defaultValue,
    sortOptions,
    modifySort,
    limit: getFirstItem(query.limit, "20"),
    handleLimitChange,
  };
};

export default useCards;
