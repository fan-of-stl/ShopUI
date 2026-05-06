import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";


import { useAuthContext } from "../../../app/providers/AuthProvider";

import { socialRegisterApi } from "../api/authApi";
import { useSnackbar } from "../../../shared/hooks/useSnackbar";

export const useSocialRegister = () => {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const { login } = useAuthContext();

  return useMutation({
    mutationFn: socialRegisterApi,

    onSuccess: (res) => {
      const data = res.data;

      // 🔥 EXISTING USER
      if (data.accessToken) {

        login(data.accessToken);

        showSnackbar(
          "Login successful.",
          "success"
        );

        navigate("/", {
          replace: true,
        });

        return;
      }

      // 🔥 NEW USER
      if (data.username) {

        navigate(
          "/social-create-password",
          {
            state: {
              username: data.username,
            },
          }
        );
      }
    },

    onError: () => {
      showSnackbar(
        "Google authentication failed.",
        "error"
      );
    },
  });
};