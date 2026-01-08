import axios from "axios";
import { useEffect, useState } from "react";


import Card from "./Card"; 


export const Movie = () => {


 const[data, setData] = useState([]);





const API = "https://ghibliapi.vercel.app/films"


const getMovieData = async() => {
  try{
       const res = await axios.get(API);
       console.log(res.data); // here we get data now  we have to store them in state variable 
       setData(res.data); // store in data 
  } catch(error)
  {
    console.log(error);
  }

}

useEffect( () => {
     getMovieData();
},[]) // run when we load page first time as [].
   
 return (

   <ul>
    {data.map((curr) => {  //data is a state variable ,It contains an array of movie objects


        return <Card key ={curr.id}  movieData ={curr} /> // movieData is props 
    })}



   </ul>
 )
};


{/* 
async	    Allows function to use await
await	    Waits for Promise to resolve
axios.get	Returns a Promise
try/catch	Handles API errors*/ }