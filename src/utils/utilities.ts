import { ParsedUrlQuery } from "querystring";
import {
  BasicModel,
  SortOptions,
  SortPair,
} from "../interfaces/GeneralInterfaces";

export const getSortedBy = (
  params: ParsedUrlQuery,
  defaultValue: SortPair
): SortPair => {
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
        } else if (typeof value === "string") {
          newValue[key] = value.split(",").map((item) => {
            return { id: item.trim() };
          });
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

//Produces the object that will be passed to the axios API.
export const getAxiosParams = (
  searchParams: ParsedUrlQuery,
  defaultValue: Record<string, unknown>
) => {
  // This line creates a copy of the defaultValue object using the Object.assign method
  const result: Record<string, unknown> = Object.assign({}, defaultValue);

  for (const [key, value] of Object.entries(searchParams)) {
    // Use a type guard to check if key is one of the properties of result
    if (key in result) {
      if (value) {
        switch (typeof value) {
          case "object":
            // If the value is not null, it means it is an array
            if (value !== null) {
              // This line assigns the result object at the key property a new array that contains either the value itself if it is an array or a single-element array with the value
              result[key] = Array.isArray(value) ? [...value] : [value];
            }
            break;
          // If the value is a boolean, it means it is either true or false
          case "boolean":
            // This line assigns the result object at the key property the value itself
            result[key] = value;
            break;
          // If the value is a string, it means it is anything else
          case "string":
            // This line assigns the result object at the key property the value itself
            result[key] = value;
            break;
        }
      }
    }
  }

  // This line creates a new object from the entries of the result object that pass a filter function using the Object.fromEntries method
  return Object.fromEntries(
    // This line filters out the entries that have falsy or "all" values using the Array.filter method
    Object.entries(result).filter(([key, value]) => value && value !== "all")
  );
};

export const getParamsObject = (
  values: GenericObject,
  defaultValue: GenericObject
) => {
  // Create a new object to store the transformed values
  const result: GenericObject = {};

  // Loop through the entries of the values object
  for (const [key, value] of Object.entries(values)) {
    // Skip the entry if the key is "page" or the value is "all"
    if (key === "page" || value === "all") {
      continue;
    }

    // Check if the default value for the key is an array
    if (Array.isArray(defaultValue[key])) {
      // Check if the value is also an array and not empty
      if (Array.isArray(value) && value.length > 0) {
        // Map the value to an array of ids or items
        result[key] = value
          .map((item) => (item.hasOwnProperty("id") ? item.id : item))
          .join(",");
      }
    } else {
      // Check if the value is a string and not empty
      if (value && typeof value === "string") {
        // Keep the value as a string
        result[key] = value;
      }
    }
  }

  // Return the result object
  return result;
};

//Lookup Ids from object
export function supplyMissingNames(array1: BasicModel[], array2: BasicModel[]) {
  // Create a map from id to name for the first array
  const nameMap = new Map(array1.map((obj) => [obj.id, obj.name]));

  // Loop through the second array and update the name property with the map value if it exists
  if (array2) {
    array2.forEach((obj) => {
      const name =
        typeof obj.id === "string"
          ? nameMap.get(parseInt(obj.id))
          : nameMap.get(obj.id);
      if (name) {
        obj.name = name;
      }
    });
  }
}
