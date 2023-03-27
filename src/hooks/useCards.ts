import { useState, useEffect } from "react";
import { CardModel, CardQuery } from "../interfaces/CardInterfaces";
import axiosClient from "../utils/api";
import { useRouter } from "next/router";
import { red, orange, blue } from "@mui/material/colors";
import { ParsedUrlQuery } from "querystring";

import {
  getFilterValueFromURL,
  getFirstItem,
  getSortedBy,
  setQueryStringParam,
  supplyMissingNames,
} from "../utils/utilities";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { useCardContext } from "../contexts/CardContext";

const getAxiosParams = (searchParams: ParsedUrlQuery) => {
  const defaultValue: CardQuery = {
    cost: "all",
    deck: [],
    q: "",
    keyword: [],
    type: "all",
    bs: "all",
  };

  for (const [key, value] of Object.entries(searchParams)) {
    if (Object.keys(defaultValue).includes(key)) {
      if (value) {
        let defaultValueKey: unknown = defaultValue[key];
        if (Array.isArray(defaultValueKey)) {
          //@ts-ignore
          defaultValue[key] = Array.isArray(value) ? [...value] : [value];
        } else if (["true", "false"].includes(value as string)) {
          defaultValue[key] = value === "true";
        } else {
          defaultValue[key] = value;
        }
      }
    }
  }

  Object.entries(defaultValue).forEach(([key, value]) => {
    if (!value || value === "all") {
      delete defaultValue[key];
    }
  });

  return defaultValue;
};

const useCards = () => {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [gridLoading, setGridLoading] = useState(true);
  const [recordCount, setRecordCount] = useState(0);
  const { decks, keywords } = useCardContext()!;
  const router = useRouter();
  const query = router.query;

  //Initial values for the filter form
  const defaultValue: CardQuery = {
    cost: "all",
    deck: [],
    q: "",
    keyword: [],
    type: "all",
    bs: "all",
  };

  const initialValues = getFilterValueFromURL(query, defaultValue) as CardQuery;

  if (decks) {
    supplyMissingNames(decks, initialValues.deck);
  }

  if (keywords) {
    supplyMissingNames(keywords, initialValues.keyword!);
  }

  //Sort methods here
  const sortOptions = {
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
  const modifySort = (name: string) => {
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
          ...getAxiosParams(query),
          page: query.page,
          limit: query.limit,
          sort: query.sort,
        },
      });

      setCards(data.data.rows || []);
      setRecordCount(data.data.count);
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
    decks,
    keywords,
    sortOptions,
    modifySort,
    limit: getFirstItem(query.limit, "20"),
    handleLimitChange,
  };
};

export default useCards;
