import axios from "axios";
import { Hit } from "../components/type2";
const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID;

//100개의 레시피를 받아오기 위함.
// page 당 10개의 레시피를 보여주기 위하여.
export const getRecipe = async (searchText: string) : Promise<Hit[]> => {
  console.log("excute api call 5")
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result =await axios.get(url);
  console.log(result)
  let next_links = result.data._links.next.href;
  const result2 = await axios.get(next_links);
  next_links = result2.data._links.next.href;
  // const result3 = await axios.get(next_links);
  // next_links = result3.data._links.next.href;
  // const result4 = await axios.get(next_links);
  // next_links = result4.data._links.next.href;
  // const result5 = await axios.get(next_links);
 

  return new Promise((resolve, reject)=>{
    // const merged_result = [result.data.hits, result2.data.hits, result3.data.hits, result4.data.hits, result5.data.hits]
    const merged_result = [...result.data.hits, ...result2.data.hits]
    
    console.log(merged_result)
    resolve(merged_result);
    reject("error : code 1")
  })
};

export const getRecipeFromId = async ( id : string) : Promise<Hit>=> {
  const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${API_KEY}`;
  const result = await axios.get(url);

  return new Promise((resolve, reject)=>{ 
    resolve(result.data);
    reject("error : code 2");
  })

}


            