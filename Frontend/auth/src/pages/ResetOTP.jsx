import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Key } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyResetOtpMutation } from "../services/authApi";

const ResetOTP = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [verifyOtp, { isLoading }] = useVerifyResetOtpMutation();

  const onSubmit = async (data) => {
    try {
      const response = await verifyOtp(data).unwrap();
      toast.success(response.message);
      reset();
      navigate("/new-password"); 
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-400">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Verify Password Reset OTP
        </h2>
        <p className="text-center text-blue-600/70 mb-6 text-sm">
          Enter the OTP sent to your registered email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50">
              <Mail className="text-blue-500 w-5 h-5 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full outline-none text-gray-900 bg-transparent "
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              OTP Code
            </label>
            <div className="flex items-center border border-blue-100 rounded-lg px-3 py-2 bg-gray-50">
              <Key className="text-blue-500 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="w-full outline-none text-gray-900 bg-transparent"
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          {isLoading ? (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl disabled cursor-not-allowed flex items-center justify-center backdrop-blur-md "
            >
              <div className="flex gap-2">
                <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
                Verifying...
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
            >
              Verify OTP
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetOTP;
