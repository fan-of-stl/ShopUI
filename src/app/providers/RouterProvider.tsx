import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import Navbar from "../../shared/components/navbar/Navbar";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
};