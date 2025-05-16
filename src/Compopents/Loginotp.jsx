import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";


const Loginotp = () => {
    const [data, setData] = useState("");
    const [msg, setMsg] = useState("");
 const navigate=useNavigate()
 const location=useLocation()
 const email1 =location.state?.email || "";
console.log(email1)
if(!email1){
     return toast.error("Your email is required")
}

    const handleChange = (e) => {
        const value = e.target.value;
        setData(value);

        // Validation logic
        if (!value) {
            setMsg("Enter your OTP");
        } else if (value.length !== 6) {
            setMsg("Your OTP must be 6 digits");
        } else {
            setMsg(""); // Clear error if OTP is correct
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("OTP entered:", data); // ✅ Log OTP value for debugging
            
            const response = await axios.post(
                "http://localhost:4000/api/user/checkotp",
                { otp: data ,email:email1 },
                { withCredentials: true } // ✅ Ensure credentials (cookies) are sent
            );

            if (response.data.success) {
                toast.success(response.data.msg || "Login successful");
                navigate('/Home')
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Some error happened");
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
              
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Loginotp;
