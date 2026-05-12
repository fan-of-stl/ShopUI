import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useProfile } from "../hooks/useProfile";

const ProfilePage = () => {

  const {
    data,
    isLoading,
    error,
  } = useProfile();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to load profile
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Profile
          </Typography>

          <Typography>
            <strong>Username:</strong>{" "}
            {data?.data?.username}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Email:</strong>{" "}
            {data?.data?.email}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Name:</strong>{" "}
            {data?.data?.firstName} {data?.data?.lastName}
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;