function ForgotPassword() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-50 py-6 px-7 w-[33rem] rounded-xl shadow-2xl">
        <h1 className="text-center text-3xl mb-3">Forgot Password</h1>
        <form className="flex flex-col gap-[3rem]">
          <div className="flex flex-col gap-2 mt-[2rem]">
            <label className="text-lg">Email Address</label>
            <input
              placeholder="Email Address"
              className="px-6 py-4 bg-gray-100 rounded-lg text-gray-700 focus:outline-none focus:ring-3 focus:ring-blue-500"
            />
          </div>
          <button className="py-4 px-7 rounded-xl bg-blue-500 w-[100%] mb-[2rem] text-gray-50">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
