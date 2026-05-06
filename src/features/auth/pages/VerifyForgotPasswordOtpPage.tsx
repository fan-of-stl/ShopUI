import { useLocation } from "react-router-dom";
import OtpForm from "../components/OtpForm";
import { useVerifyForgotPasswordOtp } from "../hooks/useVerifyForgotPasswordOtp";

const VerifyForgotPasswordOtpPage = () => {
  const { state } = useLocation();

  const username = state?.username;

  const { mutate, isPending } =
    useVerifyForgotPasswordOtp();

  return (
    <OtpForm
      title="Verify password reset"
      subtitle="Enter the OTP sent to your email"
      isPending={isPending}
      onSubmit={(otp) => {
        mutate({
          username,
          otp,
        });
      }}
    />
  );
};

export default VerifyForgotPasswordOtpPage;