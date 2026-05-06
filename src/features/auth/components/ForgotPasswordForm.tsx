import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForgotPassword } from "../hooks/useForgotPassword";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schemas/forgotPasswordSchema";

const ForgotPasswordForm = () => {
  const { mutate, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%", borderRadius: 3 }}>
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          
          {/* Icon */}
          <PersonOffIcon sx={{ fontSize: 60, mb: 2, color: "text.secondary" }} />

          {/* Title */}
          <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
            Trouble logging in?
          </Typography>

          {/* Subtitle */}
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            Enter your email or username and we'll send you an OTP to get back into your account.
          </Typography>

          {/* Input */}
          <TextField
            fullWidth
            placeholder="Enter username or email"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          {/* Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, borderRadius: 5 }}
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send OTP"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPasswordForm;