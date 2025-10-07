import { useState } from "react";
import useSignUp from "../features/auth/useSignUp";

function SignUp() {
  const [role, setRole] = useState(""); // "job-seeker" or "job-recruiter"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { isPending, signup } = useSignUp();
  function handleSubmit(e) {
    e.preventDefault();
    const userObj = {
      name,
      email,
      password,
      passwordConfirm,
      role,
    };
    console.log(userObj);
    signup(userObj);
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setRole("");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-50 py-6 px-7 w-[33rem] rounded-xl shadow-2xl">
        <h1 className="text-center text-3xl mb-3">Create new Account</h1>

        <form className="flex flex-col gap-[1.6rem]" onSubmit={handleSubmit}>
          <div className="flex gap-[3rem] justify-center items-center mt-3">
            <div
              className={`py-3 px-8 rounded-xl cursor-pointer transition-all duration-300 ${
                role === "job-seeker"
                  ? "bg-green-500 text-white"
                  : "bg-blue-200 text-blue-600 hover:bg-blue-700 hover:text-white"
              }`}
              onClick={() => setRole("job-seeker")}
            >
              <p>Job-Seeker</p>
            </div>
            <div
              className={`py-3 px-8 rounded-xl cursor-pointer transition-all duration-300 ${
                role === "job-recruiter"
                  ? "bg-green-500 text-white"
                  : "bg-blue-200 text-blue-600 hover:bg-blue-700 hover:text-white"
              }`}
              onClick={() => setRole("job-recruiter")}
            >
              <p>Job-Recruiter</p>
            </div>
          </div>

          {/* form fields */}
          <div className="flex flex-col gap-2">
            <label className="text-lg">Username</label>
            <input
              placeholder="Username"
              value={name}
              disabled={isPending}
              onChange={(e) => setName(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Email Address</label>
            <input
              placeholder="Email@Address"
              type="email"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              disabled={isPending}
              onChange={(e) => setPassword(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Confirm Password</label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={passwordConfirm}
              disabled={isPending}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="py-4 px-7 rounded-xl bg-blue-500 w-full mb-[2rem] text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
