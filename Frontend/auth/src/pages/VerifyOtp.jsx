import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { Mail, KeyRound } from "lucide-react";
import { toast } from "react-toastify";
import { useVerifyotpMutation, useResendOtpMutation } from "../services/authApi";
import Loader from "../components/Loader";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  

  const [verifyotp, { isLoading }] = useVerifyotpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: email || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await verifyotp(data).unwrap();
      toast.success(result.message);
      reset({ email, otp: "" });
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

  if (isLoading || resendLoading) {
    return <Loader />;
  }

  return (
    <section className="h-screen w-screen flex-grow flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-blue-700 font-medium mb-1">Email</label>
            <div className="flex items-center gap-2 border border-blue-600 rounded-xl px-3 py-2 bg-gray-100">
              <Mail className="w-5 h-5 text-blue-600" />
              <input
                type="email"
                {...register("email", { required: true })}
                readOnly
                className="w-full bg-transparent outline-none text-blue-800 cursor-not-allowed"
              />
            </div>
          </div>

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
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md active:bg-white active:text-blue-700 active:border active:border-blue-600"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-700/80">
            Didn’t receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
