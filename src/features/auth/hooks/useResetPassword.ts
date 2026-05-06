import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


import { updatePasswordApi } from "../api/authApi";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

export const useResetPassword = () => {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: updatePasswordApi,

    onSuccess: () => {
      showSnackbar(
        "Password updated successfully.",
        "success"
      );

      navigate("/login", {
        replace: true,
      });
    },

    onError: () => {
      showSnackbar(
        "Failed to update password.",
        "error"
      );
    },
  });
};