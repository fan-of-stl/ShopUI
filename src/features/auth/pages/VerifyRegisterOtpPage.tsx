import { useLocation } from "react-router-dom";
import OtpForm from "../components/OtpForm";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

const VerifyRegisterOtpPage = () => {
  const { state } = useLocation();

  const username = state?.username;

  const { mutate, isPending } = useVerifyOtp();

  return (
    <OtpForm
      title="Verify your account"
      subtitle="Enter the 6-digit code sent to your email"
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

export default VerifyRegisterOtpPage;