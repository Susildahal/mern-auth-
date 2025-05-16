import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
        }),

        
        onSubmit: async (values) => {
            try {
                // Send login request
                const response = await axios.post("http://localhost:4000/api/user/loginUser", values,{withCredentials : true});
                toast.success(response.data.msg);
                if (response.data.success) {
                    navigate("/Loginotp", {state: { email:values.email }});
                } 
            } catch (error) {
                setMessage("Invalid credentials");
                toast.error(error.response?.data?.msg);
            }
        },
    });
 const handlelogout=async() => {
    try {
        const response =await axios.post("http://localhost:4000/api/user/logout",{},{withCredentials:true})
        console.log(response.data.msg)
        toast.success(response.data.msg)
    } catch (error) {
        console.log("some error happen ")
        toast.error(error.response?.data?.msg)
    }
 }
   

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {message && <p className="text-center text-red-600">{message}</p>}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}

                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}

                    <div className="flex flex-col gap-10">
                        <div>
                        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                            Login
                        </button>

                        </div>
                        
                        <div>
                        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                            <Link to="/Register">Create a new account</Link>
                        </button>
                        </div>
                        <div>
                        <button
                            className="w-full bg-red-500 text-white p-2 rounded hover:bg-green-300"
                        >
                            <Link to="/Checkemail"> Forgot a password??</Link>
                           
                        </button>
                        </div>
                        <div>

                        <button
                            className="w-full bg-red-500 text-white p-2 rounded hover:bg-green-300"
                            onClick={handlelogout}
                        >
                        Logout
                           
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            
            <ToastContainer position="top-right" />
        </div>
    );
};

export default Login;
