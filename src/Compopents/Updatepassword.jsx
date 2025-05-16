import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updatepassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email2 = location.state?.email1;
  console.log(email2);

  if(!email2){
    return toast.error("email is required")
  }

  const initialValues = {
    password: "",
  };


  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "The password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/user/passwordUpdate",
        { email: email2, password: values.password },
        {withCredentials:true}
      );

      toast.success(response.data.msg || "Password updated successfully!");

      if(response.data.success){
        navigate("/")
      }

    } catch (error) {
      toast.error(response.error?.data?.msg || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full gap-5 flex-col justify-center items-center">
      <div className="text-3xl text-slate-800 text-center">
        Enter your new password
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex lg:w-[20vw] w-[90vw] h-[300px] shadow-2xl bg-gray-200 rounded-3xl gap-5 justify-center items-center flex-col">
            <Field
              type="password"
              name="password"
              placeholder="Enter a new password"
              className="h-12 lg:h-16 border-[2px] border-black rounded-2xl w-[90%] px-2 text-2xl"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[90%] p-5 bg-green-600 text-2xl rounded-2xl hover:bg-green-300 cursor-pointer"
            >
              {isSubmitting ? "Updating..." : "Submit your new password"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer autoClose={3000} position="top-right"/>
    </div>
  );
};

export default Updatepassword;
