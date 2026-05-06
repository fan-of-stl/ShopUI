import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


import { useSnackbar } from "../../../shared/hooks/useSnackbar";
import { createSocialPasswordApi } from "../api/authApi";

export const useCreateSocialPassword = () => {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: createSocialPasswordApi,

    onSuccess: () => {
      showSnackbar(
        "Password created successfully.",
        "success"
      );

      navigate("/login", {
        replace: true,
      });
    },

    onError: () => {
      showSnackbar(
        "Failed to create password.",
        "error"
      );
    },
  });
};