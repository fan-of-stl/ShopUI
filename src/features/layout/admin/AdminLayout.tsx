import { Outlet } from "react-router-dom";

import SideBar from "../../../shared/components/sidebar/SideBar";

const AdminLayout =
  () => {

    return (
        <>
            <SideBar />
            <Outlet />
        </>
    );
};

export default
AdminLayout;