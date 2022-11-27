import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  let navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/auth", data).then((response) => {
      navigate("/login");
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
            <div className="flex  flex-col max-w-sm m-36 bg-white  rounded-lg border w-[400px] h-[300px] border-gray-200 shadow-md hover:bg-gray-100 relative  ">
              <div className="flex items-center rounded-t-lg bg-[#98ba94] p-3 justify-center mb-5 bold">
                Register
              </div>

              <label>Username: </label>

              <Field
                id="input"
                name="username"
                placeholder="Write a username here.."
              />
              <ErrorMessage
                name="username"
                component="span"
                className="text-red-500"
              />

              <label>Password: </label>

              <Field
                id="input"
                name="password"
                type="password"
                placeholder="Write a password here.."
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500"
              />

              <button
                type="submit"
                className="bg-black ml-5 bottom-0 absolute mb-2 hover:bg-green-900 flex justify-center items-center rounded p-2 text-white"
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default Registration;
