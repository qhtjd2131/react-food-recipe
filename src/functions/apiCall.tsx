import axios from "axios";
import { Hit } from "../components/type2";
const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID;


export const getRecipe = async (searchText: string): Promise<{data : Hit[], count : number}> => {
  console.log("excute api call");
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result = await axios.get(url);
  
  console.log(result);
  let next_links = result.data._links.next?.href;
  if(next_links === undefined){
    return new Promise((resolve, reject) => {
      const merged_result = [...result.data.hits];
      const count = result.data.count;
      resolve({data : merged_result, count : count});
      reject("error : code 1");
    });
  }
  const result2 = await axios.get(next_links);

  return new Promise((resolve, reject) => {
    const merged_result = [...result.data.hits, ...result2.data.hits];
    const count = result.data.count;

    resolve({data : merged_result, count : count});
    reject("error : code 1");
  });
};

export const getRecipeFromId = async (id: string): Promise<Hit> => {
  console.log("excute getRecipeFromId function");
  const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result = await axios.get(url);

  return new Promise((resolve, reject) => {
    resolve(result.data);
    reject("error : code 2");
  });
};
