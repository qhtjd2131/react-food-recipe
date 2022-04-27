import axios from "axios";
import { Hit } from "../components/type2";
const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID;
export interface recipeInterface {
  data: Hit[];
  count: number;
  nextLink: string;
}
export const getRecipe = async (
  searchText: string
): Promise<recipeInterface> => {
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result = await axios
    .get(url)
    .then((res) => res)
    .catch((error) => {
      // function 내부에서 에러처리 불가능(state 변경 불가능), 따라서 다시 error를 던져서 컴포넌트에서 처리하게 함.
      throw new Error(error.message);
    });

  const next_links = result.data._links.next?.href;
  if (next_links === undefined) {
    return new Promise((resolve, reject) => {
      const merged_result = [...result.data.hits];
      const count = result.data.count;
      const nextLink = result.data._links.next?.href
        ? result.data._links.next.href
        : "";
      resolve({ data: merged_result, count: count, nextLink: nextLink });
      reject({ code: "ERROR : CODE_1" });
    });
  }

  const result2 = await axios
    .get(next_links)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.message);
    });

  return new Promise((resolve, reject) => {
    const merged_result = [...result.data.hits, ...result2.data.hits];
    const count = result.data.count;
    const nextLink = result2.data._links.next?.href
      ? result2.data._links.next.href
      : "";

    resolve({ data: merged_result, count: count, nextLink: nextLink });
    reject({ code: "ERROR : CODE_2" });
  });
};

export const getRecipeFromId = async (id: string): Promise<Hit> => {
  const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result = await axios
    .get(url)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.message);
    });

  return new Promise((resolve, reject) => {
    resolve(result.data);
    reject({ code: "ERROR : CODE_3" });
  });
};

export const getRecipeFromNextLink = async (
  nextLink: string
): Promise<{ data: Hit[]; count: number; nextLink: string }> => {
  const url = nextLink;
  const result = await axios
    .get(url)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.message);
    });
  const nextLinkTemp = result.data._links.next?.href;

  if (nextLinkTemp === undefined) {
    return new Promise((resolve, reject) => {
      const merged_result = [...result.data.hits];
      const count = result.data.count;
      const nextLink = result.data._links.next?.href
        ? result.data._links.next.href
        : "";
      resolve({ data: merged_result, count: count, nextLink: nextLink });
      reject({ code: "ERROR : CODE_4" });
    });
  }
  const result2 = await axios
    .get(nextLinkTemp)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.message);
    });

  return new Promise((resolve, reject) => {
    const merged_result = [...result.data.hits, ...result2.data.hits];
    const count = result.data.count;
    const nextLink = result2.data._links.next?.href
      ? result2.data._links.next.href
      : "";

    resolve({ data: merged_result, count: count, nextLink: nextLink });
    reject({ code: "ERROR : CODE_5" });
  });
};
