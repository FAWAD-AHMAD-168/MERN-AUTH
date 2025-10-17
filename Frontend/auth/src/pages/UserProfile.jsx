import { useNavigate } from 'react-router-dom';
import React from "react";
import { ShieldCheck, LogOut } from "lucide-react";
import profile from "../assets/profile.jpg";
import { useUserDataQuery } from "../services/userApi";
import {useLogoutMutation} from "../services/authApi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { data, isLoading:isUserLoading, error } = useUserDataQuery();
  const [logout , {isLoading:isLogoutLoading }] = useLogoutMutation();  
  const navigate = useNavigate();

  if (isLogoutLoading && isUserLoading) return <Loader />;
  if (error) toast.error(error?.data?.message);

  const userName = data?.userData?.name;

  const handleLogout = async ()=>{
    try {
      const response = await logout().unwrap();
      toast.success(response?.message);
      navigate("/login");

    } catch (error) {
      const errMesssage = error?.data?.message || "Logout failed !";
      toast.error(errMesssage);
      
    }

  }


  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <header className="w-full flex justify-around items-center px-8 py-5  ">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-blue-500 tracking-tight">
            MERN AUTH
          </h1>
        </div>

        <div className="relative group">
          <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex justify-center items-center text-lg font-semibold cursor-pointer transition-transform duration-200 group-hover:scale-105">
            {userName?.charAt(0).toUpperCase()}
          </div>
          <div className="absolute right-0 top-10 hidden group-hover:flex flex-col items-center bg-white shadow-md rounded-lg py-2 w-28 transition-all duration-300 z-10">
            <button className="flex items-center gap-1 text-blue-500 hover:bg-blue-50 w-full justify-center py-2 rounded transition-all duration-200"
            onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center flex-1 px-6 mt-2 text-center">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-4 border-blue-500 mb-6">
          <img src={profile} alt="Profile" className="h-full w-full object-cover" />
        </div>

        <h1 className="text-4xl  font-semibold text-blue-500">
          Welcome,{" "}
          <span className=" text-3xl bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm">
            {userName}
          
          </span>
        </h1>

        <p className="max-w-xl mt-5 text-gray-600 leading-relaxed">
          MERN Auth is a simple authentication system built with the MERN stack. It handles user signup, login, and logout with secure token management. After login, users can view their profile details in a clean and minimal interface.
        </p>
      </section>
    </main>
  );
};

export default UserProfile;
