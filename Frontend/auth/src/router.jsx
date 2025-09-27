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

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
    { path: "/verify-otp", element: <VerifyOtp /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/home-page", element: <Front /> },

  { path: "*", element: <NotFound /> },
]);

export default router;
