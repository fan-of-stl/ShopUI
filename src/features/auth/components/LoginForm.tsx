import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import GoogleLoginPage from "../social-login/GoogleLoginPage";
import { useAuthContext } from "../../../app/providers/AuthProvider";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
  mutate(data, {
    onSuccess: (res) => {      
      login(res.data.accessToken);
      navigate("/", { replace: true });
    },
    });
};

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Login
      </Typography>

      <Stack spacing={2}>
        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        {/* Password + Eye Icon */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControlLabel control={<Checkbox />} label="Keep me logged in" />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isPending}
        >
          {(isPending) ? "Logging in..." : "Log in now"}
        </Button>

        {/* SOCIAL LOGIN */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            OR
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 1, justifyContent: "center" }}
          >
            {/* <Button variant="outlined">G</Button>
            <Button variant="outlined">F</Button>
            <Button variant="outlined">T</Button>
            <Button variant="outlined"></Button> */}
            <GoogleLoginPage />
          </Stack>
        </Box>

        {/* LINKS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
            sx={{
              textTransform: "none",
              textDecoration: "underline",
              p: 0,
              minWidth: "auto",
            }}
            onClick={()=> navigate('/forgot-password')}
          >
            Forgot password
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginForm;
