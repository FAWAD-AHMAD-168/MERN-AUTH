// router.jsx
import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Front from "./pages/Front";
import NotFound from "./pages/Notfound";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";

import NewPassword from "./pages/NewPassword";
import ResetOTP from "./pages/ResetOTP";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
    { path: "/verify-otp", element: <VerifyOtp /> },
     { path: "/change-password", element: <ChangePassword /> },
     { path: "/forgot-password", element: <ForgotPassword /> ,
      children: [
      
      { path: "reset-otp", element: <ResetOTP /> },
      { path: "new-password", element: <NewPassword /> },
    ],
},

      
      { path: "/home-page", element: <Front /> },

  { path: "*", element: <NotFound /> },
]);

export default router;
