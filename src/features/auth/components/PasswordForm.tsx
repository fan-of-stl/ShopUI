import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/resetPasswordSchema";

type PasswordFormProps = {
  title: string;
  subtitle: string;

  buttonText: string;

  isPending?: boolean;

  onSubmit: (
    data: ResetPasswordFormData
  ) => void;
};

const PasswordForm = ({
  title,
  subtitle,
  buttonText,
  isPending,
  onSubmit,
}: PasswordFormProps) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(
      resetPasswordSchema
    ),
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "text.secondary",
              mb: 4,
            }}
          >
            {subtitle}
          </Typography>

          {/* ICON */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <LockResetIcon
              sx={{
                fontSize: 55,
                color: "primary.main",
              }}
            />
          </Box>

          {/* FORM */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >

            {/* PASSWORD */}
            <TextField
              label="New Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              label="Confirm Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              fullWidth
              {...register(
                "confirmPassword"
              )}
              error={
                !!errors.confirmPassword
              }
              helperText={
                errors.confirmPassword
                  ?.message
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(
                            (prev) => !prev
                          )
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* BUTTON */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending}
              sx={{
                borderRadius: 3,
                py: 1.3,
                fontWeight: 600,
              }}
            >
              {isPending
                ? "Updating..."
                : buttonText}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PasswordForm;