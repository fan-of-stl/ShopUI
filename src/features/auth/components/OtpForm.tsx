import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpFormData } from "../schemas/otpSchema";
import { useRef } from "react";

type OtpFormProps = {
  title: string;
  subtitle: string;
  isPending?: boolean;

  onSubmit: (otp: string) => void;
};

const OtpForm = ({
  title,
  subtitle,
  isPending,
  onSubmit,
}: OtpFormProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const otp = watch("otp") || "";

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const otpArr = otp.split("");
    otpArr[index] = value;

    setValue("otp", otpArr.join(""));

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

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
      <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {title}
          </Typography>

          <Typography
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            {subtitle}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit((data) =>
              onSubmit(data.otp)
            )}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* OTP BOXES */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              {[...Array(6)].map((_, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  value={otp[index] || ""}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "20px",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: 50,
                  }}
                />
              ))}
            </Box>

            {/* ERROR */}
            {errors.otp && (
              <Typography color="error" align="center">
                {errors.otp.message}
              </Typography>
            )}

            {/* BUTTON */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending}
            >
              {isPending ? "Verifying..." : "Verify OTP"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OtpForm;