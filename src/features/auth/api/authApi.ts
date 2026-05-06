import apiClient from "../../../services/apiClient";
import type { ForgotPasswordPayload, ForgotPasswordResponse, LoginPayload, LoginResponse, UpdatePasswordPayload, VerifyOtpForgotPasswordPayload, VerifyOtpForgotPasswordResponse } from "../types/authTypes";
import type { RegisterPayload } from "../types/register";
import type { VerifyOtpPayload, VerifyOtpResponse } from "../types/verifyOtp";

export const registerApi = async (data: RegisterPayload) => {
  const res = await apiClient.post("/auth/register", data);
  return res.data;
};

export const verifyOtpApi = async (
  data: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  const res = await apiClient.post("/auth/confirm-otp", data);

  return res.data;
};

export const resendOtpApi = async (data: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
  const res = await apiClient.post("/auth/resend-otp", data);
  return res.data;
};

export const loginApi = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await apiClient.post("/auth/logout");
  return res.data;
};

export const forgotPasswordApi = async (
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
  const res = await apiClient.post<ForgotPasswordResponse>(
    "/auth/forget-password-otp",
    payload
  );
  return res.data;
};

export const verifyOtpforgotPasswordApi = async (
  payload: VerifyOtpForgotPasswordPayload
): Promise<VerifyOtpForgotPasswordResponse> => {
  const res = await apiClient.post<VerifyOtpForgotPasswordResponse>(
    "/auth/verify-forget-password-otp",
    payload
  );
  return res.data;
};

export const updatePasswordApi = async (
  data: UpdatePasswordPayload
) => {
  const res = await apiClient.post(
    "/auth/update-password",
    data
  );

  return res.data;
};

export const createSocialPasswordApi = async (
  data: UpdatePasswordPayload
) => {
  const res = await apiClient.post(
    "/auth/social-create-password",
    data
  );

  return res.data;
};

export const socialRegisterApi = async (
  data: {
    firstName: string;
    lastName: string;
    email: string;
    provider: string;
    idToken: string;
  }
) => {

  const res = await apiClient.post(
    "/auth/social-register",
    data
  );

  return res.data;
};