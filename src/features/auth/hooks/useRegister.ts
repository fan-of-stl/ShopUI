import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/authTypes";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

export const useRegister = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  
  return useMutation({
    mutationFn: registerApi,
    
    onSuccess: (res) => {
      const encryptedUsername = res.data.username;
      
      showSnackbar("Register success", "success");
      navigate("/verify-otp", {
        state: { username: encryptedUsername },
      });
    },

    onError: (err: AxiosError<ApiErrorResponse>) => {
      console.log(err);
      showSnackbar(err?.response?.data?.data?.details?.[0]?.message || err?.response?.data?.message || "An error occurred", "error");
    },
  });
};