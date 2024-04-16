import React, { useState } from "react";
import {  Button } from "flowbite-react";

import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreateFeedback() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        author: currentUser.username,
      };

      const res = await fetch("/api/feedback/create-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        navigate(`/view-feedback`);
      }
    } catch (err) {
      toast.error("Oops! The feedback is not uploaded");
    }
  };

  return (
    <div className="">
      <Toaster />
      <h1 className="text-center font-bold text-3xl mb-3 mt-3">
        Give Your Feedback
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[350px] gap-2  mx-auto"
      >
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="rounded sm "
          name="title"
          id="title"
          placeholder="Title"
        />
        <textarea
          type="text"
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          name="desc"
          id="desc"
          className="rounded sm "
          placeholder="Your Feedback"
          
        />
         <select
                    className='w-[400px]'
                    id='rate'
                    name='rate'
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                >  <option value=''>Rate US</option>
                    <option value='⭐'>⭐</option>
                    <option value='⭐⭐'>⭐⭐</option>
                    <option value='⭐⭐⭐'>⭐⭐⭐</option>
                    <option value='⭐⭐⭐⭐'>⭐⭐⭐⭐</option>
                    <option value='⭐⭐⭐⭐⭐'>⭐⭐⭐⭐⭐</option>
                  

                    

                     
                    
                
                </select>
        
    
        
        <button
          className=" mb-3 bg-purple-700 text-white rounded-md h-[50px]"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
