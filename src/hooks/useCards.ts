import { useState, useEffect } from "react";
import { CardModel, CardQuery } from "../interfaces/CardInterfaces";
import axiosClient from "../utils/api";
import { useRouter } from "next/router";

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
import {
  NameCaption,
  SortOptions,
  SortPair,
} from "../interfaces/GeneralInterfaces";
import { ParsedUrlQuery } from "querystring";

//This will be used for the URL query parameters and the default values of the filter form
const defaultValue: CardQuery = {
  cost: "all",
  deckID: [],
  q: "",
  keywords: [],
  type: "all",
  battleStyle: "all",
  hasCardUnity: false,
};

const useCards = (query: ParsedUrlQuery) => {
  const { decks, keywords, battleStyles, types, costs } = useCardContext();
  const [cards, setCards] = useState<CardModel[]>([]); //the cards fetched using the current URL

  const [gridLoading, setGridLoading] = useState(true); //to control the loading state of the table
  const [recordCount, setRecordCount] = useState(0); //for pagination

  const router = useRouter();
  //Initial values for the filter form

  //Create the initial values of the filter form depending on the URL queries.
  const initialValues: CardQuery = getFilterValueFromURL(query, defaultValue);

  //This will supply the name key for each array of objects
  if (decks) {
    supplyMissingNames(decks, initialValues.deckID);
  }

  if (keywords) {
    supplyMissingNames(keywords, initialValues.keywords);
  }

  //Sort Method starts here
  const sortedBy: SortPair = getSortedBy(query, ["id", "desc"]); //get the sort pair based on the URL and the default if not present
  const sortList: NameCaption[] = [
    { name: "id", caption: "Most Recent" },
    { name: "name", caption: "Name" },
    { name: "cost", caption: "Cost" },
    { name: "atk", caption: "ATK" },
    { name: "shield", caption: "Shield" },
  ];
  const sortOptions: SortOptions = {
    sortedBy,
    list: sortList,
  };

  //handle of click of the sort menu (name would be the name of the field to be submitted to the server)
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
    delete query["page"];
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

      console.log({ cards: data.data });
      setCards(data.data || []);
      setRecordCount(data.totalRecordCount);
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

  //Breadcrumbs
  const breadCrumbLinks = [
    {
      href: "/cards",
      caption: "Card List",
    },
  ];

  return {
    decks,
    keywords,
    cards,
    gridLoading,
    recordCount,
    initialValues,
    defaultValue,
    sortOptions,
    modifySort,
    limit: getFirstItem(query.limit, "20"),
    handleLimitChange,
    battleStyles,
    types,
    costs,
    breadCrumbLinks,
  };
};

export default useCards;
