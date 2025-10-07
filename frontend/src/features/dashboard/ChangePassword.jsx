import { useState } from "react";
import useUpdateUserPassword from "../auth/useUpdateUserPassword";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { isPending, updateUserPassword } = useUpdateUserPassword();
  function handleSubmit(e) {
    e.preventDefault();
    const passwordObj = {
      currentPassword,
      passwordConfirm,
      password: newPassword,
    };
    updateUserPassword(passwordObj);
    setCurrentPassword("");
    setNewPassword("");
    setPasswordConfirm("");
  }
  return (
    <>
      <h1 className="text-3xl mb-[3rem]">Update Password !</h1>
      <div className="bg-gray-50 h-[55%] rounded-xl py-7 transition-all">
        <form
          className="flex flex-col gap-[1rem] w-[60%] ml-[2rem]"
          onSubmit={handleSubmit}
        >
          {/* <h1 className=" text-2xl mb-2.5">Update Password</h1> */}

          <div className="flex flex-col gap-2 ">
            <label className="text-xl">Current Password</label>
            <input
              placeholder="Current Password"
              disabled={isPending}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-lg">New Password</label>
            <input
              placeholder="New Password"
              disabled={isPending}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 "
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-lg">Confirm Password</label>
            <input
              placeholder="Confirm Password"
              disabled={isPending}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500 "
            />
          </div>
          <button className=" w-[25%] rounded-xl text-gray-50 py-3 px-4 bg-blue-500 cursor-pointer duration-300 font-medium hover:bg-blue-600">
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
