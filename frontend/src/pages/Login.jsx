import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../features/auth/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, login } = useLogin();

  function handleFunction(e) {
    e.preventDefault();
    login({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className=" bg-gray-50 py-6 px-7 w-[33rem] rounded-xl shadow-2xl">
        <h1 className="text-center text-3xl text-blue-500 font-bold mb-3">
          Welcome Back
        </h1>
        <form onSubmit={handleFunction} className="transition-all">
          <div className="flex flex-col gap-2 mb-[2rem]">
            <label className="text-lg">Email Address</label>
            <input
              type="email"
              placeholder="jobgenius@gmail.com"
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-600 focus:outline-none focus:ring-3 focus:ring-blue-500"
              value={email}
              default={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-[2rem]">
            <label className="text-lg">Password</label>
            <input
              placeholder="Password"
              type="password"
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              default={isPending}
            />
            <Link to="/forgotpassword" className="text-right text-gray-500">
              Forgot Password?
            </Link>
          </div>
          <button className="py-4 px-7 text-[1rem] duration-300 rounded-xl bg-blue-500 w-[100%] mb-[2rem] text-gray-50 font-semibold hover:bg-blue-600 cursor-pointer">
            login
          </button>
          <p className="text-center mb-[1rem]">
            Don't have an account?
            <Link to="/signup" className="font-medium text-gray-500">
              {" "}
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
