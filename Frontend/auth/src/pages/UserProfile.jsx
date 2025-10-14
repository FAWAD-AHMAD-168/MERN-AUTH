import React from "react";
import { ShieldCheck } from "lucide-react";
import profile from "../assets/profile.jpg";
import {useUserDataQuery} from "../services/userApi"
import Loader from "../components/Loader";
import { toast } from "react-toastify";


const UserProfile = () => {
  const {data , isLoading , error }= useUserDataQuery();

  if(isLoading){
    return (<Loader/>)
  }

  if(error){
    toast.error(error?.data?.message)
  }
  const userName  = data?.userData?.name;

  return (
    <>
    <main className="flex flex-col justify-center items-center ">
      <header className=" w-3xl flex justify-between mx-auto  mt-7 ">
        <div className="flex gap-2">
          <ShieldCheck className="h-8 w-8 text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-700">MERN AUTH</h1>
        </div>
        <div className="relative h-10 w-10 rounded-full   flex justify-center items-center bg-blue-500 text-white">
          {userName?.charAt(0).toUpperCase()}
        </div>
      </header>

      <div className=" h-2xl w-3xl flex  flex-col justify-center items-center gap-4 mx-auto">
        <div>
          <img src={profile} alt="" className="h-60 w-60 rounded" />
        </div>
        <h1>Welcome,{userName}</h1>
        <p className="max-w-2xl">
          MERN Auth is a simple authentication system built with the MERN stack.
          It handles user signup, login, and logout with secure access token
          management. After login, users can view their basic profile details in
          a clean and minimal interface.
        </p>
      </div>
      </main>
    </>
  );
};

export default UserProfile;
