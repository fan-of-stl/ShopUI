import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useProfile } from "../hooks/useProfile";
import { BadgeOutlined, EmailOutlined, PersonOutlineOutlined } from "@mui/icons-material";


const ProfilePage = () => {
  const { data, isLoading, error } = useProfile();

  const firstName = data?.data?.firstName ?? "";
  const lastName = data?.data?.lastName ?? "";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="error">Failed to load profile</Typography>
      </Box>
    );
  }

  const infoRows = [
    { icon: <PersonOutlineOutlined />, label: "Username", value: data?.data?.username },
    { icon: <EmailOutlined />, label: "Email", value: data?.data?.email },
    { icon: <BadgeOutlined />, label: "Full name", value: `${firstName} ${lastName}`.trim() },
  ];

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, mx: "auto", mt: 5, px: 2 }}>

      {/* ── Header Card ── */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" sx={{alignItems: "center", gap: 2}}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                fontSize: 24,
                fontWeight: 500,
                bgcolor: "primary.light",
                color: "primary.dark",
              }}
            >
              {initials}
            </Avatar>
            <Stack spacing={0.5}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {firstName} {lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{data?.data?.username}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* ── Info Card ── */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Personal info
          </Typography>

          <Stack spacing={0} divider={<Divider />} sx={{ mt: 2 }}>
            {infoRows.map(({ icon, label, value }) => (
              <Stack
                key={label}
                direction="row"
                sx={{ py: 1.5, alignItems: "center", gap: 2 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: "action.hover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </Box>
                <Stack spacing={0.25}>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {value || "—"}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

    </Stack>
  );
};

export default ProfilePage;