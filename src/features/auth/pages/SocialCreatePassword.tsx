import { useLocation } from "react-router-dom";

import PasswordForm from "../components/PasswordForm";
import { useCreateSocialPassword } from "../hooks/useCreateSocialPassword";

const SocialCreatePassword = () => {
  const location = useLocation();

  const username = location.state?.username;

  const { mutate, isPending } = useCreateSocialPassword();

  return (
    <PasswordForm
      title="Create a password"
      subtitle="Create a strong new password..."
      buttonText="Create Password"
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

export default SocialCreatePassword;
