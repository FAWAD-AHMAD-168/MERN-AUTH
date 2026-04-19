import { useNavigate } from "react-router";

import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../services/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data).unwrap();
      toast.success(result.message);
      navigate("/user-profile");
    } catch (error) {
      const errMsg = error?.data?.message || "Login failed";
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-400 ">
      <div className="w-full  max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          MERN Auth
        </h2>
        <p className="text-center text-blue-600/70 mb-6 text-sm">
          Login in to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="text-blue-500 w-5 h-5 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full outline-none text-gray-900 bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="text-blue-500 w-5 h-5 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full outline-none text-gray-900 bg-transparent"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {isLoading ? (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl disabled cursor-not-allowed flex items-center justify-center  "
            >
              <div className="flex gap-2">
                <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
                Logging in...
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              Login
            </button>
          )}
        </form>

        <div className="flex gap-6 items-center justify-center mt-6 text-sm ">
          <Link to="/register" className="text-blue-700  hover:underline ">
            Create Account
          </Link>

          <Link to="/forgot-password" className="text-blue-700 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
