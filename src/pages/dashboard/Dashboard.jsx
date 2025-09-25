import { Outlet } from "react-router";
import SideBar from "../../component/dashboard/publiccomponent/SideBar";
import TopBar from "../../component/dashboard/publiccomponent/TopBar";


function Dashboard() {
  return (
    <div>
        <div className="fixed top-0 ">
      <TopBar />
      </div>
      
      <div className="flex justify-center items-center">
      <div className="flex">
        <SideBar />
         <div className=" flex-1 p-4 overflow-auto ">
          <Outlet />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;