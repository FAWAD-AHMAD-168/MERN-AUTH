import React from "react";
import { useForm } from "react-hook-form";
import { Mail, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVerifyResetOtpMutation } from "../services/authApi";
import { toast } from "react-toastify";

const ResetOTP = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [verifyOtp,{isLoading}] = useVerifyResetOtpMutation();
  const resetEmail = localStorage.getItem("resetEmail") ;

  const onSubmit = async (data) => {
try {
    const response = await verifyOtp(data).unwrap();
    toast.success(response.message);
    reset();
    navigate("new-password");

    
} catch (error) {
    const errMsg = error?.data?.message;
    toast.error(errMsg || "Failed to verify OTP");

    
}
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Verify OTP
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-sm">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Email
          </label>
          <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="w-5 h-5 text-blue-500 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
                defaultValue={resetEmail}
              {...register("email", {
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

        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            OTP
          </label>
          <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <KeyRound className="w-5 h-5 text-blue-500 mr-2" />
            <input
              type="text"
              placeholder="Enter OTP sent to email"
              autoComplete="one-time-code"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be at least 4 digits",
                },
              })}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>
          {errors.otp && (
            <p className="text-sm text-red-500 mt-1">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default ResetOTP;
