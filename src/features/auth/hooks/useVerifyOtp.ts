import { useMutation } from "@tanstack/react-query";
import { verifyOtpApi } from "../api/authApi";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { ApiErrorResponse } from "../types/authTypes";
import type { VerifyOtpPayload } from "../types/verifyOtp";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

export const useVerifyOtp = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VerifyOtpPayload) => verifyOtpApi(data),

    onSuccess: () => {
      showSnackbar("OTP verified successfully", "success");
      navigate("/login");
    },

    onError: (err: AxiosError<ApiErrorResponse>) => {
      const details = err.response?.data?.data?.details;

      const message =
        details && details.length > 0
          ? details[0].message
          : err.response?.data?.message || "OTP verification failed";

      showSnackbar(message, "error");
    },
  });
};