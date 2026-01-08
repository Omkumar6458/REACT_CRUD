

import { useEffect, useState } from "react";
import { postData } from "./PostApi";

export function Form({ setData ,data, updateData, SetUpdateData }) {

  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });

  // WHY?
  // To capture user input (controlled components)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



 // we get data of edit , now we have to call useEffect when click to edit and at post form it show that onr

/*
 useEffect ( () => {

    updateData && setData( // initially : form is blank , now when user get click to that-> title me oo value show kr rha hai jo 
                          // post me hai . uss data ko form me send kr rha hai , if not click it get empty as usuall 
        {
            title:updateData.title || "",
            body: updateData.body || "",
         
        }
    )

 },[updateData])
*/



useEffect(() => {
  if (updateData && updateData.id) {
    setFormData({
      title: updateData.title || "",
      body: updateData.body || "",
    });
  }
}, [updateData]);



useEffect(() => {
  if (updateData?.id) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [updateData]);











/*

  // MAIN LOGIC: CREATE POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postData(formData);

    // WHY THIS?
    // Backend sends new post
    // UI must update instantly
    setData(prev => [...prev, res.data]);

    setFormData({ title: "", body: "" });
  };
*/


const handleSubmit = async (e) => {
  e.preventDefault();

  // EDIT MODE
  if (updateData && updateData.id) {

    setData(prev =>
      prev.map(post =>
        post.id === updateData.id
          ? { ...post, ...formData }
          : post
      )
    );

    SetUpdateData({}); // exit edit mode
  }
  // ➕ CREATE MODE
  else {
    const res = await postData(formData);

    const newPost = {
      ...res.data,
      id: Date.now() // avoid duplicate ids
    };

    setData(prev => [...prev, newPost]);
  }

  setFormData({ title: "", body: "" });
};






  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} />
      <textarea name="body" value={formData.body} onChange={handleChange} />
       <button type="submit">
  {updateData?.id ? "EDIT POST" : "ADD POST"}
</button>

    </form>
  );
}
