
# Auth Flow

## Flow Overview

1. User registers with email & password
2. OTP sent to email
3. User enters OTP
4. If valid → login success
5. Redirect to dashboard

## Route Flow

/register → /verify-otp → /login → /

## Guards

- PublicRoute → blocks logged-in users
- ProtectedRoute → blocks unauthenticated users