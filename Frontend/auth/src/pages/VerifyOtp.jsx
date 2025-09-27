import { useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const location = useLocation();
  const { email } = location.state || {}; // safe destructuring

  // now you have the email to resend OTP or display it
  return <div>We sent an OTP to {email}</div>;
};
export default VerifyOtp;