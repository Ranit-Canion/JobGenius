import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function DashBoardLayout() {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      {/* Header spans both columns */}
      <div className="col-span-2 row-start-1">
        <Header />
      </div>

      {/* Sidebar on the left */}
      <div className="row-start-2 col-start-1">
        <SideBar />
      </div>

      {/* Main content area */}
      <main className="bg-gray-100 p-16 row-start-2 col-start-2 overflow-auto">
        <Outlet />
        <p className="text-center">
          ©2025 JobGenius by{" "}
          <span className="font-semibold text-blue-500">Ranit Biswas</span>
        </p>
      </main>
    </div>
  );
}

export default DashBoardLayout;
