function HowItWorks() {
  return (
    <div className="mx-auto container py-[9rem] px-[5rem] relative">
      <div className="mb-[6rem]">
        <h1 className="text-center mb-[0.7rem] tracking-[0.4rem] text-2xl font-semibold">
          How it Works?
        </h1>
        <p className="text-center text-gray-500">Job for anyone, anywhere</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] transition-all">
        <div className="flex flex-col gap-[1rem] bg-blue-50 shadow-lg h-fit px-[1rem] py-[3rem] rounded-2xl border-l-4 border-l-blue-500 duration-300 hover:translate-y-[-1rem]">
          <div className="flex gap-[1.8rem] items-center w-full mb-[1rem]">
            <div className="bg-blue-400 py-2 px-2 rounded-full">
              <lord-icon
                src="https://cdn.lordicon.com/tbabdzcy.json"
                trigger="hover"
                stroke="bold"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              ></lord-icon>
            </div>
            <h2 className="text-xl font-medium">Free Resume Assessments</h2>
          </div>
          <p className="text-center text-[1rem]  text-gray-500">
            Employers on average spend 31 seconds scanning resumes to identify
            potential matches.
          </p>
        </div>

        {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="flex flex-col gap-[1rem] bg-blue-50 shadow-lg h-fit px-[1rem] py-[3rem] rounded-2xl border-l-4 border-l-blue-500 duration-300 hover:translate-y-[-1rem]">
          <div className="flex gap-[1.8rem] items-center w-full mb-[1rem]">
            <div className="bg-blue-400 py-2 px-2 rounded-full">
              <lord-icon
                src="https://cdn.lordicon.com/iuvnsegf.json"
                trigger="hover"
                stroke="bold"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              ></lord-icon>
            </div>
            <h2 className="text-xl font-medium">Job Fit Scoring</h2>
          </div>
          <p className="text-center text-[1rem]  text-gray-500">
            Employers on average spend 31 seconds scanning resumes to identify
            potential matches.
          </p>
        </div>
        {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}

        <div className="flex flex-col gap-[1rem] bg-blue-50 shadow-lg h-fit px-[1rem] py-[3rem] rounded-2xl border-l-4 border-l-blue-500 duration-300 hover:translate-y-[-1rem]">
          <div className="flex gap-[1.8rem] items-center w-full mb-[1rem]">
            <div className="bg-blue-400 py-2 px-2 rounded-full">
              <lord-icon
                src="https://cdn.lordicon.com/xvmmqwjv.json"
                trigger="hover"
                stroke="bold"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              ></lord-icon>
            </div>
            <h2 className="text-xl font-medium">Help Every Step of the Way</h2>
          </div>
          <p className="text-center text-[1rem]  text-gray-500">
            Employers on average spend 31 seconds scanning resumes to identify
            potential matches.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
