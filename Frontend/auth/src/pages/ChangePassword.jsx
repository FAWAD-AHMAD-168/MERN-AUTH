import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";
import { useChangePasswordMutation } from "../services/authApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    try {
      const result = await changePassword(data).unwrap();
      toast.success(result.message);
      navigate("/login");
      reset();
    } catch (error) {
      const errMsg = error?.data?.message || "Password change failed";
      toast.error(errMsg);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Change Password
        </h2>
        <p className="text-center text-blue-600/70 mb-6 text-sm">
          Enter your details to update your password
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

          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Old Password
            </label>
            <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="text-blue-500 w-5 h-5 mr-2" />
              <input
                type="password"
                placeholder="Enter your current password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                className="w-full outline-none text-gray-900 bg-transparent"
              />
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              New Password
            </label>
            <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="text-blue-500 w-5 h-5 mr-2" />
              <input
                type="password"
                placeholder="Enter your new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full outline-none text-gray-900 bg-transparent"
              />
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
          >
            Change Password
          </button>
        </form>

        <div className="flex flex-col items-center mt-6 text-sm space-y-2">
          <a href="/login" className="text-blue-700 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
