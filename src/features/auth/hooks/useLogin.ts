import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/authTypes";
import type { LoginPayload, LoginResponse } from "../types/authTypes";
import { loginApi } from "../api/authApi";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

export const useLogin = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  return useMutation<LoginResponse, AxiosError<ApiErrorResponse>, LoginPayload>({
    mutationFn: loginApi,

    onSuccess: (res) => {
      const { accessToken } = res.data;

      // 🔐 store access token
      localStorage.setItem("accessToken", accessToken);

      // showSnackbar("Login successful", "success");

      navigate("/");
    },

    onError: (err) => {
      const message =
        err.response?.data?.data?.details?.[0]?.message ||
        err.response?.data?.message ||
        "Login failed";

      showSnackbar(message, "error");
    },
  });
};