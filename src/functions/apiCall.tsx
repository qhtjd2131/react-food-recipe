import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID;

export const getRecipe = async (searchText: string) => {
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result =await axios.get(url);
  console.log("url:", url)

  return result.data;
};
