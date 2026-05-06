import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

import { useSocialRegister } from "../hooks/useSocialRegister";

type GooglePayload = {
  given_name: string;
  family_name: string;
  email: string;
};

const GoogleLoginPage = () => {

  const { mutate } = useSocialRegister();

  return (
    <GoogleLogin
      size="large"
      shape="square"
      type="icon"
      theme="outline"

      onSuccess={(credentialResponse) => {

        if (!credentialResponse.credential) {
          return;
        }

        const decoded =
          jwtDecode<GooglePayload>(
            credentialResponse.credential
          );

        mutate({
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,

          provider: "google",

          idToken:
            credentialResponse.credential,
        });
      }}

      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginPage;