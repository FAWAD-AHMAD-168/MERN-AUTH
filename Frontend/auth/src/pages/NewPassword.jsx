import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../services/authApi";
import Loader from "../components/Loader";

const NewPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const resetEmail = localStorage.getItem("resetEmail");

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(data).unwrap();
      toast.success(response.message);
      reset();
      localStorage.removeItem("resetEmail")
      navigate("/login");
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Failed to reset password");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Reset Your Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm"
      >
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Email Address
          </label>
          <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="text-blue-500 w-5 h-5 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              defaultValue={resetEmail || ""}
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
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            New Password
          </label>
          <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Lock className="text-blue-500 w-5 h-5 mr-2" />
            <input
              type="password"
              placeholder="Enter new password"
              autoComplete="new-password"
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
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
