import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { Mail, KeyRound } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import {
  useVerifyotpMutation,
  useResendOtpMutation,
} from "../services/authApi";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [verifyotp, { isLoading }] = useVerifyotpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
  const email = localStorage.getItem("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await verifyotp(data).unwrap();
      toast.success(result.message);
      reset({ otp: "" });
      navigate("/login");
    } catch (err) {
      const error = err?.data?.message || "OTP verification failed";
      toast.error(error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const result = await resendOtp({ email }).unwrap();
      toast.success(result.message);
    } catch (err) {
      const error = err?.data?.message || "OTP resend failed";
      toast.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-400 ">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* OTP Input */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">OTP</label>
            <div className="flex items-center gap-2 border border-blue-600 rounded-xl px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-600">
              <KeyRound className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                placeholder="Enter OTP"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be at least 6 digits",
                  },
                })}
                className="w-full bg-transparent outline-none text-blue-800"
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Submit Button */}
          {isLoading ? (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl  cursor-not-allowed flex items-center justify-center  "
            >
              <div className="flex gap-2">
                <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
                Verifying in...
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

        {/* Resend OTP Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-700/80">
            Didn’t receive the OTP?{" "}
            {resendLoading ? (
              <button
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Resending OTP...
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-600 hover:text-blue-800 font-semibold ml-4"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
