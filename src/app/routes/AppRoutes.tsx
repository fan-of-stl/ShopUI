import {
  Routes,
  Route,
} from "react-router-dom";

import PublicRoute from
"./PublicRoute";

import ProtectedRoute from
"./PrivateRoute";

import LoginPage from
"../../features/auth/pages/LoginPage";

import RegisterPage from
"../../features/auth/pages/RegisterPage";

import ForgotPasswordPage from
"../../features/auth/pages/ForgotPasswordPage";

import HomePage from
"../../features/pages/Home";

import AboutPage from
"../../features/pages/AboutPage";

import ShopPage from
"../../features/pages/ShopPage";

import VerifyRegisterOtpPage from
"../../features/auth/pages/VerifyRegisterOtpPage";

import VerifyForgotPasswordOtpPage from
"../../features/auth/pages/VerifyForgotPasswordOtpPage";

import ResetPasswordPage from
"../../features/auth/pages/ResetPasswordPage";

import SocialCreatePassword from
"../../features/auth/pages/SocialCreatePassword";

import ProfilePage from
"../../features/profile/pages/ProfilePage";
import MainLayout from "../../features/layout/main/MainLayout";
import AdminLayout from "../../features/layout/admin/AdminLayout";
import AdminDashBoardPage from "../../features/pages/AdminDashBoardPage";


// =========================
// LAYOUTS
// =========================



// =========================
// ADMIN PAGES
// =========================




const AppRoutes = () => {

  return (

    <Routes>


      {/* ================================= */}
      {/* PUBLIC ROUTES */}
      {/* ================================= */}

      <Route
        path="/login"
        element={

          <PublicRoute>

            <LoginPage />

          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={

          <PublicRoute>

            <RegisterPage />

          </PublicRoute>
        }
      />


      {/* ================================= */}
      {/* SEMI PUBLIC */}
      {/* ================================= */}

      <Route
        path="/verify-otp"
        element={
          <VerifyRegisterOtpPage />
        }
      />

      <Route
        path="/verify-forgot-password-otp"
        element={
          <VerifyForgotPasswordOtpPage />
        }
      />

      <Route
        path="/forgot-password"
        element={
          <ForgotPasswordPage />
        }
      />

      <Route
        path="/reset-password"
        element={
          <ResetPasswordPage />
        }
      />

      <Route
        path="/social-create-password"
        element={
          <SocialCreatePassword />
        }
      />


      {/* ================================= */}
      {/* CUSTOMER ROUTES */}
      {/* ================================= */}

      <Route
        element={

          <ProtectedRoute requiredRole="customer">

            <MainLayout />

          </ProtectedRoute>
        }
      >

        <Route
          index
          element={
            <HomePage />
          }
        />

        <Route
          path="about"
          element={
            <AboutPage />
          }
        />

        <Route
          path="shop"
          element={
            <ShopPage />
          }
        />

        <Route
          path="profile"
          element={
            <ProfilePage />
          }
        />

      </Route>


      {/* ================================= */}
      {/* ADMIN ROUTES */}
      {/* ================================= */}

      <Route
        path="/admin"
        element={

          <ProtectedRoute requiredRole="admin">

            <AdminLayout />

          </ProtectedRoute>
        }
      >

        <Route
          index
          element={
            <AdminDashBoardPage />
          }
        />

         <Route
          path="profile"
          element={
            <ProfilePage />
          }
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;