import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [message, setMessage] = useState("");
 const Navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:4000/api/user/register", values);
                setMessage(response.data.msg);
                if(response.data.success==true){
                    Navigate("/")
                }else{
                    Navigate("/Register")
                }
             console.log(response.data.msg)
            toast.success(response.data.msg)
            } catch (error) {
                toast.error(error.response?.data?.msg)

            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {message && <p className="text-center text-green-600">{message}</p>}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="text"
                        name="username"
                        placeholder="Username"
                        {...formik.getFieldProps("username")}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="text-red-500 text-sm">{formik.errors.username}</p>
                    )}

                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}

                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Register
                    </button>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                       <Link to={'/'} >Go to home</Link> 
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoclose={3000} />
        </div>
    );
};

export default Register;
