// src/pages/Register.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useRegisterMutation } from "../services/authApi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (formData) => {
    try {
     
      const result = await registerUser(formData).unwrap();

      toast.success(result.message);

     
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      
      toast.error(err.data?.message || "Registration failed");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <User className="w-5 h-5 text-blue-500 mr-2" />
              <input
                type="text"
                placeholder="Enter username"
                {...formRegister("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-blue-500 mr-2" />
              <input
                type="email"
                placeholder="Enter email"
                {...formRegister("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-blue-500 mr-2" />
              <input
                type="password"
                placeholder="Enter password"
                {...formRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*\d).+$/,
                    message: "Password must contain at least one number",
                  },
                })}
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-blue-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
