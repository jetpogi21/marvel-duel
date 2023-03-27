import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../interfaces/GeneralInterfaces";

export const getSortedBy = (
  params: ParsedUrlQuery,
  defaultValue: [string, string]
): [string, string] => {
  let sort = params.sort;
  if (Array.isArray(sort)) {
    sort = sort[0];
  }
  if (sort) {
    if (sort[0] === "-") {
      return [sort.substring(1), "desc"];
    }
    return [sort, "asc"];
  }
  return defaultValue;
};

export function setQueryStringParam(
  params: ParsedUrlQuery,
  name: string,
  value: string | string[]
): void {
  params[name] = value;
}

export const getFirstItem = (
  value: string | string[] | undefined,
  defaultValue: string
) => {
  if (!value) {
    return defaultValue;
  }
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value.length > 1) {
    return value[0];
  }
  return defaultValue;
};

export const getFiltersFromParams = (params: URLSearchParams) => {
  const filtersToKeep = new Set(["sort", "asc"]);
  const newFilters: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(params)) {
    if (!filtersToKeep.has(key)) {
      newFilters[key] = value;
    }
  }
  return newFilters;
};

export const getSortFromParams = (
  params: URLSearchParams,
  acceptedNames: string[]
) => {
  const acceptedNamesSet = new Set(acceptedNames);
  const sort: { name?: string; asc?: boolean } = {};

  for (let [key, value] of Object.entries(params)) {
    if (key === "sort") {
      if (acceptedNamesSet.has(value)) {
        sort["name"] = value;
      }
    } else if (key === "asc") {
      sort["asc"] = value === "1";
    }
  }

  return sort;
};

export const getFilterValueFromURL = (
  searchParams: ParsedUrlQuery,
  defaultValue: Record<string, unknown>
) => {
  const newValue = JSON.parse(JSON.stringify(defaultValue));
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      if (Array.isArray(defaultValue[key])) {
        //@ts-ignore
        if (Array.isArray(value)) {
          newValue[key] = value.map((item) => ({ id: item }));
        } else {
          newValue[key] = [{ id: value }];
        }
      } else if (typeof defaultValue[key] === "boolean") {
        newValue[key] = value === "true";
      } else {
        newValue[key] = value;
      }
    }
  }
  return newValue;
};

//This will convert the date to current timezone
export const toValidDateTime = (date: Date) => {
  const padZeroes = (str: number) => {
    return ("00" + str).slice(-2);
  };

  const month = padZeroes(date.getMonth() + 1);
  const day = padZeroes(date.getDate());
  const fullYear = date.getFullYear();
  const hours = padZeroes(date.getHours());
  const minutes = padZeroes(date.getMinutes());
  const seconds = padZeroes(date.getSeconds());

  return `${fullYear}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

interface GenericObject {
  [key: string]: unknown;
}

export const getParamsObject = (
  values: GenericObject,
  defaultValue: GenericObject
) => {
  const filteredEntries = Object.entries(values).filter(
    ([key, value]) => key !== "page" && value !== "all"
  );

  return filteredEntries.reduce((acc, [key, value]) => {
    let transformedValue: string | string[] = "";
    if (Array.isArray(defaultValue[key])) {
      if (Array.isArray(value) && value.length > 0) {
        transformedValue = value.map((item) =>
          item.hasOwnProperty("id") ? item.id : item
        );
      }
    } else {
      if (value && typeof value === "string") {
        transformedValue = value;
      }
    }

    return transformedValue
      ? {
          ...acc,
          [key]: transformedValue,
        }
      : acc;
  }, {});
};

//Lookup Ids from object
export function supplyMissingNames(array1: BasicModel[], array2: BasicModel[]) {
  array2.forEach((obj2) => {
    // Find the object in array1 with the same id as obj2
    const obj1 = array1.find((obj) => obj.id == obj2.id);

    // If an object was found, update the name property of obj2
    if (obj1) {
      obj2.name = obj1.name;
    }
  });
}
