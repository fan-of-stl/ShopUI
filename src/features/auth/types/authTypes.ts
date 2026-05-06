export type FieldError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  data: {
    code: string | null;
    details: FieldError[];
  };
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  success: true;
  message: string;
  data: {
    accessToken: string;
    csrfToken: string;
  };
};

export type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  roles?: string[];
  exp: number;
};

export type User = {
  username: string;
  email?: string;
  name?: string;
  roles?: string[];
  token: string;
} | null;

export type ForgotPasswordPayload = {
  username: string; 
};
export type VerifyOtpForgotPasswordPayload = {
  username: string; 
  otp: string;
};

export type ApiSuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ForgotPasswordResponse = ApiSuccessResponse<{
  username: string; 
}>;

export type VerifyOtpForgotPasswordResponse = ApiSuccessResponse<{
  username: string; 
}>;

export type UpdatePasswordPayload = {
  username: string;
  password: string;
};