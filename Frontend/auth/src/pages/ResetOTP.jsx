import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyResetOtpMutation } from "../services/authApi";
import Loader from "../components/Loader";

const ResetOTP = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [verifyOtp, { isLoading }] = useVerifyResetOtpMutation();
  const resetEmail = localStorage.getItem("resetEmail");

  const onSubmit = async (data) => {
    try {
      const response = await verifyOtp(data).unwrap();
      toast.success(response.message);
      reset();
      navigate("/new-password"); // ✅ absolute route
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Invalid OTP");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Verify OTP
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
                defaultValue={resetEmail || ""}
                {...register("email", { required: "Email is required" })}
                readOnly
                className="w-full outline-none text-gray-900 bg-transparent cursor-not-allowed"
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetOTP;
