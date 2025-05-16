import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");
const navigate=useNavigate()


  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async () => {
    if (!data.trim()) {
      setMsg("Email is required ❌");
      return;
    }
  
    const validation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!validation.test(data)) {
      setMsg("Invalid email format ❌");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/api/user/passwordotp", { email: data },{withCredentials:true});
  
      console.log(response.data.msg);
  
      if (response.data.success) {
        navigate("/PasswordForgetOtp", {state:{ data } });
      } else {
        setMsg(response.data.msg || "Something went wrong ");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMsg("Failed to send email. Please try again ");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Email Validator
        </h2>
        
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={data}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {msg && (
          <p
            className={`mt-2 text-sm ${
              msg.includes("valid") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-300"
        >
          Submit Your Email
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
