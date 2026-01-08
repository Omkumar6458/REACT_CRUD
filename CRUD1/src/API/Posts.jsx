
import { useEffect } from "react";
import { getPost } from "./PostApi";
import { useState } from "react";

import { deletePost } from "./PostApi";
import { Form } from "./Form";


function Posts()
{

    const[data, setData] = useState([]); 
    const[updateData, SetUpdateData] = useState({}) // pass obj initially title and body 


const getPostData =async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data); // data is get SET. now i have to use map to render this data. 
};


  useEffect( () => {
    getPostData();
  },[])



  //delete function : delete api data 
/*
  const handleDeletePost = async(id) => {
     const res =    await  deletePost(id);
     console.log(res);
     
  }
*/


const handleDeletePost = (id) => {
  deletePost(id)
    .then(() => {
      //  THIS LINE REMOVES CARD FROM UI
      setData(prev =>
        prev.filter(post => post.id !== id)


      );
      console.log(id);

    })
    .catch(err => console.error(err));
};


                                                                                                                                                                                     
 const handleUpdatePost = (curr) =>  SetUpdateData(curr); // when ever click btn , then it get store in setupdates. that data 


 







  return (
    <>
    <section className="section-form">
      <Form  
      data ={data} 
      setData = {setData}
      updateData={updateData}
      SetUpdateData ={SetUpdateData}

      /> {/* i have to updated this with data and setdata */}
    </section>



      <section className ="section-post">
     <ol>

       {data.map((curr) => {
        const {id,body, title} = curr;

        return <li key ={id}> 
           <p> Title : {title}</p>
           <p> Body  : {body}</p>
          <button className="btn-edit" 
          onClick={ () => handleUpdatePost(curr)}>EDIT</button>




          <button className="btn-delete" 
             onClick ={ () => handleDeletePost(id)} //here send to f(x) to delete post 
             >DELETE</button>

        </li>




       })}




     </ol>

      </section>
    </>
  )
}

export default Posts;