import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreatePost() {
  let navigate=useNavigate()

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    
    
    
    
    axios.post("http://localhost:5000/posts", data).then((response) => {
     
      navigate("/");
    });
  };

  return (
    <>
    
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
              <div className="flex justify-center items-center">
            <Form>
        <div className=" flex-col items-between justify-between max-w-sm mt-28 bg-white cursor-pointer rounded-lg border w-[400px] h-[300px] border-gray-200 shadow-md hover:bg-gray-100 relative flex ">

              <label>Title: </label>
              
              <Field 
                id="input"
                name="title"
                placeholder="Write a title here.."
                
              />
              <ErrorMessage name="title" component="span" />

              <label>Post: </label>
              
              <Field
                id="input"
                name="postText"
                placeholder="Write a post here.."
              />
              <ErrorMessage name="postText" component="span" />

              <label>Username: </label>
              
              <Field
                id="input"
                name="username"
                placeholder="Write a username here.."
              />
              <ErrorMessage name="username" component="span" />

              <button
                type="submit"
                className="bg-black ml-5 bottom-0 absolute mb-2 hover:bg-green-900 flex justify-center items-center rounded p-2 text-white"
               
              >
                Create Post
              </button>
              </div>
            </Form>
            </div>
          </Formik>
       
    </>
  );
}

export default CreatePost;
