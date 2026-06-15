import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};