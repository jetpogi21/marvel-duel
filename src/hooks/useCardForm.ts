import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCardContext } from "../contexts/CardContext";
import { useGlobalContext } from "../contexts/Global";
import { CardModel, CardFormModel } from "../interfaces/CardInterfaces";
import { BreadcrumbLink } from "../interfaces/GeneralInterfaces";
import axiosClient from "../utils/api";
import { getFirstItem } from "../utils/utilities";

const useCardForm = (id: string) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  //Fetch the lists..
  const { decks, keywords, battleStyles, types, costs, handleKeywordAddition } =
    useCardContext();

  //Constants related to the model
  const modelURL: string = "cards";
  const modelCaption: string = "Card";

  //Fetch the record depending on the id
  const [card, setCard] = useState<CardModel | null>(null);
  console.log({ card });

  const [fetched, setFetched] = useState(id === "new");

  const fetchData = async () => {
    axiosClient.get(`${modelURL}/${id}`).then(({ data }) => {
      if (data.status === "success") {
        setCard(data.data);
        setFetched(true);
      }
    });
  };

  //Initial values handling..
  let initialValues: CardFormModel = {
    id: "",
    name: "",
    type: "Character",
    cost: 2,
    battleStyle: "",
    atk: "",
    shield: "",
    description: "",
    deckId: decks && decks.length > 0 ? decks[0].id : "",
    CardCardKeywords: [],
  };

  if (card) {
    for (const key in initialValues) {
      if (card.hasOwnProperty(key) && initialValues.hasOwnProperty(key)) {
        //@ts-ignore
        initialValues[key] = card[key] || "";
      }
    }
    //Reshape the CardCardKeywords into
    //@ts-ignore

    initialValues.CardCardKeywords = card.CardCardKeywords?.map((item) => ({
      id: item.cardKeywordId,
      name: item.CardKeyword.name,
    }));
  }

  //Breadcrumb related
  const breadCrumbCaption = card ? card.name : "new";
  const links: BreadcrumbLink[] = [
    { href: "/cards", caption: "Card List" },
    {
      href: `/cards/${id}`,
      caption: getFirstItem(breadCrumbCaption, "caption not found"),
    },
  ];

  const [topLevelError, setTopLevelError] = useState<null | string>(null);

  //CRUD handling of the form
  const handleSubmit = async (values: CardFormModel) => {
    setPageLoading(true);

    //Method,URL and message depending on wether the method is add or edit.
    let url: string, method: string, message: string;

    if (id === "new") {
      url = modelURL === "/" ? "/" : `/${modelURL}/`;
      method = "post";
      message = "added";
    } else {
      url = modelURL === "/" ? `/${id}` : `/${modelURL}/${id}`;
      method = "put";
      message = "updated";
    }

    interface CardFormModelMod extends Omit<CardFormModel, "CardCardKeywords"> {
      CardCardKeywords: number[];
    }

    const newValues = JSON.parse(JSON.stringify(values)) as CardFormModelMod;

    newValues["CardCardKeywords"] = values.CardCardKeywords
      ? values.CardCardKeywords.map((item) => item.id)
      : [];

    //dont forget to add any deleted Ids of the children object.
    axiosClient({
      method,
      url,
      data: newValues,
    })
      .then(({ data }) => {
        //if error then store the top level error
        setTopLevelError(data.status === "error" ? data.error : null);
        if (data.status === "success") {
          openSnackbar(`${modelCaption} ${message} successfully..`);
          //TO DO: go back to the previous page. push the previous page.

          router.back();
        }
      })
      .catch((e) => {
        console.log({ e });
      })
      .finally(() => {
        setPageLoading(false);
      });
  };

  //Dialog related
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDelete = () => {
    axiosClient
      .delete(`/${modelURL}/${id}`)
      .then(({ data }) => {
        setTopLevelError(data.status === "error" ? data.error : null);
        if (data.status === "success") {
          openSnackbar(`${modelCaption} deleted successfully..`);
        }
      })
      .finally(() => {
        setPageLoading(false);
        handleClose();
      });
  };

  const addNewKeyword = async (item: { inputValue: string }) => {
    const inputVal = item.inputValue;
    try {
      const response = await axiosClient({
        method: "post",
        url: "/keywords",
        data: {
          name: inputVal,
        },
      });

      const data = response.data.data;
      if (data && handleKeywordAddition) {
        handleKeywordAddition(data);
      }

      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    if (id !== "new") {
      fetchData();
    }
  }, [id]);

  return {
    links,
    openSnackbar,
    setPageLoading,
    decks,
    keywords,
    battleStyles,
    types,
    card,
    fetched,
    initialValues,
    handleSubmit,
    costs,
    id,
    handleOpen,
    handleClose,
    handleDelete,
    open,
  };
};

export default useCardForm;
