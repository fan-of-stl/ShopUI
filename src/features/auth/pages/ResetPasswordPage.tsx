import { useLocation } from "react-router-dom";

import ResetPasswordForm from "../components/PasswordForm";

import { useResetPassword } from "../hooks/useResetPassword";
import PasswordForm from "../components/PasswordForm";

const ResetPasswordPage = () => {
  const location = useLocation();

  const username = location.state?.username;

  const { mutate, isPending } = useResetPassword();

  return (
    <PasswordForm
      title="Reset your password"
      subtitle="Create a strong new password..."
      buttonText="Update Password"
      isPending={isPending}
      onSubmit={(data) => {
        mutate({
          username,
          password: data.password,
        });
      }}
    />
  );
};

export default ResetPasswordPage;
