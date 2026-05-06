import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/authApi";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/authTypes";
import { useAuthContext } from "../../../app/providers/AuthProvider";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

export const useLogout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: (res) => {
      logout(); // context clear
      localStorage.removeItem("accessToken");

      showSnackbar(res.message || "Logged out successfully", "success");

      navigate("/login", { replace: true });
    },

    onError: (err: AxiosError<ApiErrorResponse>) => {
      const message =
        err.response?.data?.message || "Logout failed";

      showSnackbar(message, "error");
    },
  });
};