import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthLinks = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Button
        variant="text"
        onClick={() => navigate("/register")}
        sx={{
          textTransform: "none",
          textDecoration: "underline",
          p: 0,
          minWidth: "auto",
        }}
      >
        Create new account
      </Button>

      <Button
        variant="text"
        onClick={() => navigate("/forgot-password")}
        sx={{
          textTransform: "none",
          textDecoration: "underline",
          p: 0,
          minWidth: "auto",
        }}
      >
        Forgot password
      </Button>
    </Box>
  );
};

export default AuthLinks;
