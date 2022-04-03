import React, { useEffect } from "react";
import styled from "styled-components";
import { getRecipe } from "../functions/apiCall";
import { data } from "./data";
import FoodItem from "./FoodItem";
import { FoodInfos } from "./type2";

const FoodListBox = styled.div`
    width : 1200px;
    height : 100%;
    border : 1px solid black;
`;

interface IFoodListProps {
    searchText : string;
}


const FoodList = ({searchText} :IFoodListProps) => {

    const data2 = data;
    console.log(data2)

    useEffect(()=>{
        if(searchText.length > 0){
            // const data= getRecipe("chicken").then((res)=>{
            //     console.log(res)
            // });
        }
    },[searchText])

    return <FoodListBox>
        {data2.hits.map((info, idx)=>(
            <FoodItem foodinfo={info} key={idx}/>
        ))}
        </FoodListBox>
}

export default FoodList;