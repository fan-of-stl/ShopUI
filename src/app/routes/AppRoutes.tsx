import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./PrivateRoute";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import HomePage from "../../features/pages/Home";
import AboutPage from "../../features/pages/AboutPage";
import ShopPage from "../../features/pages/ShopPage";
import VerifyRegisterOtpPage from "../../features/auth/pages/VerifyRegisterOtpPage";
import VerifyForgotPasswordOtpPage from "../../features/auth/pages/VerifyForgotPasswordOtpPage";
import ResetPasswordPage from "../../features/auth/pages/ResetPasswordPage";
import SocialCreatePassword from "../../features/auth/pages/SocialCreatePassword";
import ProfilePage from "../../features/profile/pages/ProfilePage";


const AppRoutes = () => {
  return (
    <Routes>
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

      {/* Semi-public */}
      <Route path="/verify-otp" element={<VerifyRegisterOtpPage />} />
      <Route path="/verify-forgot-password-otp" element={<VerifyForgotPasswordOtpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/social-create-password" element={<SocialCreatePassword />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutPage/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <ShopPage/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;