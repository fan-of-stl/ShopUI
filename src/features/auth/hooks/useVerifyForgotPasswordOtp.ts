// features/auth/hooks/useForgotPassword.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { forgotPasswordApi, verifyOtpforgotPasswordApi } from "../api/authApi";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ApiSuccessResponse,
  VerifyOtpForgotPasswordResponse,
  VerifyOtpForgotPasswordPayload,
} from "../types/authTypes";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

type ApiErrorResponse = {
  success: false;
  message: string;
  data?: {
    details?: { field?: string; message: string }[];
  };
};

export const useVerifyForgotPasswordOtp = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  return useMutation<
    VerifyOtpForgotPasswordResponse,
    AxiosError<ApiErrorResponse>,
    VerifyOtpForgotPasswordPayload
  >({
    mutationFn: verifyOtpforgotPasswordApi,

    onSuccess: (res) => {
      showSnackbar(res.message || "Account verified successfully", "success");

      const username = res.data?.username;

      navigate("/reset-password", {
        state: {
          username,
        },
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