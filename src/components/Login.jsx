import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {


    const handleClick = async() =>{

         try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/google-url`);
            const data = await res.json();

            window.location.href = data.url; //redirecting to login

         }catch(error){
            console.log("Google Login error",error);
         }
    }

  return (
    <div className="min-h-screen w-full flex justify-center items-center font-poppins relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>

      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-black/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

     {/* login  */}
      <div className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-10 w-[350px] text-center">

        <h1 className="text-4xl font-pacifico text-white mb-2">
          Snapify
        </h1>

        <p className="text-white/80 mb-6">
          Capture. Save. Share.
        </p>

        <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition">
          <FcGoogle size={22} />
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default Login;
