import { FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { CardQuery } from "../interfaces/CardInterfaces";
import { getParamsObject } from "../utils/utilities";

const useCardFilter = (defaultValue: CardQuery) => {
  const router = useRouter();

  const handleFormikSubmit = (
    values: CardQuery,
    formikHelpers: FormikHelpers<CardQuery>
  ) => {
    const params = getParamsObject(
      values as Partial<CardQuery>,
      defaultValue
    ) as ParsedUrlQueryInput;
    router.push({ pathname: router.pathname, query: params });
  };

  const resetToDefault = (formik: FormikProps<any>) => {
    formik.resetForm({
      values: defaultValue,
    });
    router.push({ pathname: router.pathname });
  };

  return {
    handleFormikSubmit,
    resetToDefault,
  };
};

export default useCardFilter;
