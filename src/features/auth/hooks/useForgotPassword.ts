// features/auth/hooks/useForgotPassword.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { forgotPasswordApi } from "../api/authApi";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ApiSuccessResponse,
} from "../types/authTypes";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

type ApiErrorResponse = {
  success: false;
  message: string;
  data?: {
    details?: { field?: string; message: string }[];
  };
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  return useMutation<
    ForgotPasswordResponse,
    AxiosError<ApiErrorResponse>,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPasswordApi,

    onSuccess: (res) => {
      showSnackbar(res.message || "OTP sent successfully", "success");

      const username = res.data?.username;

      navigate("/verify-forgot-password-otp", {
        state: { username },
      });
    },

    onError: (err) => {
      const message =
        err.response?.data?.data?.details?.[0]?.message ||
        err.response?.data?.message ||
        "Failed to send OTP";

      showSnackbar(message, "error");
    },
  });
};