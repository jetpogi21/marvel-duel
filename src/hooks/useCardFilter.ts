import { FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import { CardQuery } from "../interfaces/CardInterfaces";
import { getParamsObject } from "../utils/utilities";
import useCards from "./useCards";

const useCardFilter = () => {
  const { decks, keywords, defaultValue, initialValues } = useCards();

  const router = useRouter();

  const handleFormikSubmit = (
    values: CardQuery,
    formikHelpers: FormikHelpers<CardQuery>
  ) => {
    const params = getParamsObject(values, defaultValue);
    router.push({ pathname: router.pathname, query: params });
  };

  const resetToDefault = (formik: FormikProps<any>) => {
    formik.resetForm({
      values: defaultValue,
    });
    router.push({ pathname: router.pathname });
  };

  return {
    decks,
    keywords,
    initialValues,
    handleFormikSubmit,
    resetToDefault,
  };
};

export default useCardFilter;
