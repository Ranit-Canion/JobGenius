import { BugAntIcon } from "@heroicons/react/24/outline";
import ChatBot from "../ui/ChatBot";
import FindJob from "../ui/FindJob";
import Hero from "../ui/Hero";
import HowItWorks from "../ui/HowItWorks";
import LogoSlider from "../ui/LogoSlider";
import RecommendedJobs from "../ui/RecommendedJobs";
import SubCribe from "../ui/SubCribe";
import ReviewSlider from "../ui/Test";
import { useState } from "react";

function Home() {
  // const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen);
  return (
    <>
      <div className="relative transition-all">
        {/* <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="py-[1.5rem] px-[1.5rem] rounded-full bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer right-[2rem] bottom-[3rem] z-[4000] fixed"
        >
          <BugAntIcon className="w-[1.2rem] text-white" />
        </div>
        {isOpen ? (
          <div className="fixed right-[7rem] bottom-[3rem] z-[4000]">
            <ChatBot />
          </div>
        ) : (
          ""
        )} */}
        <Hero />
        <LogoSlider />
        <HowItWorks />
        <RecommendedJobs />
        <FindJob />
        <SubCribe />
        {/* <Companies />
      <Features />
      <RecentPosts /> */}
      </div>
    </>
  );
}

export default Home;
