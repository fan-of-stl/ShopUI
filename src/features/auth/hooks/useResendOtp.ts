import { useMutation } from "@tanstack/react-query";
import { resendOtpApi } from "../api/authApi";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpApi,
  });
};