import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import DashBoardHome from "./pages/DashBoardHome";
import DashBoardLayout from "./ui/DashBoardLayout";
import Profile from "./features/dashboard/Profile";
import ShortlistedJobs from "./features/dashboard/ShortlistedJobs";
import AppliedJobs from "./features/dashboard/jobs/AppliedJobs";
import ChangePassword from "./features/dashboard/ChangePassword";
import JobDetail from "./features/jobs/JobDetail";
import MessageBox from "./features/dashboard/message-feature/MessageBox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostJob from "./features/dashboard/jobs/PostJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationModal from "./features/jobs/ApplicationModal";
import BookMarks from "./pages/BookMarks";
import ManageJobs from "./features/dashboard/jobs/ManageJobs";
import AllApplicants from "./features/dashboard/applications/AllApplicants";
import CompanyDetails from "./pages/CompanyDetails";
import ApplicantDetail from "./pages/ApplicantDetail";
import ChatBot from "./ui/ChatBot";
import { useState } from "react";
import { BugAntIcon } from "@heroicons/react/24/outline";
import useGetUser from "./features/auth/getCurrentUser";
import JobAlertJobs from "./features/dashboard/jobs/JobAlertJobs";
import { Bot } from "lucide-react";

import ErrorPage from "./pages/ErrorPage";
import EditJob from "./features/dashboard/jobs/EditJob";
import useListenMessages from "./features/dashboard/message-feature/message/useListeningMessages";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGetUser();
  useListenMessages();
  return (
    <>
      {user ? (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="py-[1.2rem] px-[1.2rem] rounded-full bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer right-[2rem] bottom-[3rem] z-[4000] fixed"
        >
          <Bot className="w-10 h-10 text-white" />
        </button>
      ) : (
        ""
      )}

      {isOpen ? (
        <div className="fixed right-[7rem] bottom-[3rem] z-[4000]">
          <ChatBot />
        </div>
      ) : (
        ""
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/companydetails" element={<CompanyDetails />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobPostId" element={<JobDetail />} />
          <Route path="/bookmarks" element={<BookMarks />} />
          <Route
            path="/allapplicants/:applicantId"
            element={<ApplicantDetail />}
          />
        </Route>
        <Route element={<DashBoardLayout />}>
          <Route path="/dashboard" element={<DashBoardHome />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/allapplicants" element={<AllApplicants />} />
          <Route path="/dashboard/appliedjobs" element={<AppliedJobs />} />
          <Route path="/dashboard/managejobs" element={<ManageJobs />} />
          <Route path="/dashboard/jobalerts" element={<JobAlertJobs />} />
          <Route path="/dashboard/message" element={<MessageBox />} />
          <Route path="/dashboard/postjob" element={<PostJob />} />
          <Route path="/dashboard/editjob/:jobPostId" element={<EditJob />} />
          <Route
            path="/dashboard/changepassword"
            element={<ChangePassword />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
