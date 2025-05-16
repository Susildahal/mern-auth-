import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordForgetOtp = () => {
    const [data, setData] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email1 = location.state?.data || ""; // Prevent errors

    if (!email1) {
        toast.error("Invalid request. Email is missing.");
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setData(value);

        if (!value) {
            setMsg("Enter your OTP");
        } else if (value.length !== 6) {
            setMsg("Your OTP must be 6 digits");
        } else {
            setMsg(""); 
        }
    };

    const handleSubmit = async () => {
        if (!data) {
            toast.error("Please enter the OTP.");
            return;
        }
        console.log(email1)
        try {
            const response = await axios.post("http://localhost:4000/api/user/passwordcheckotp", {
                otp: data,
                email: email1 
               
            });

            if (response.data.success) {
                toast.success(response.data.msg || "Login successful");
                navigate("/Updatepassword",{state:{email1}});
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "An error occurred");
        }
    };

    const resendOtp = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/user/passwordotp", { otp:data,email:email1 });
            toast.success(response.data.msg || "OTP resent successfully");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Failed to resend OTP");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Enter OTP</h2>
                <input
                    type="text"
                    id="otp"
                    value={data}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                {msg && <p className="text-red-500 text-sm mt-2">{msg}</p>}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Verify OTP
                </button>
                <button
                    onClick={resendOtp}
                    className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
                >
                    Didn’t receive OTP? Resend OTP
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default PasswordForgetOtp;
