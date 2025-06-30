import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            {/* <Sidebar /> */}
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
