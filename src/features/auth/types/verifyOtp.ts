export type VerifyOtpPayload = {
  username: string; 
  otp: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
  data: null;
};