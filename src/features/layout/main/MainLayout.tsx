import {
  Outlet,
} from "react-router-dom";

import Navbar from
"../../../shared/components/navbar/Navbar";

const MainLayout = () => {

  return (
    <>

      <Navbar />

      <Outlet />

    </>
  );
};

export default MainLayout;