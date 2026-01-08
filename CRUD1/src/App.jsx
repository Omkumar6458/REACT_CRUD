import { useEffect } from "react";
import { getPost } from "./API/PostApi"

import './App.css'


import Posts from "./API/Posts";
function App() 
{

  //console.log(getPost());



  return (
     <div className="section-form">
     <Posts /> 

     </div>
  


  )
}

export default App
