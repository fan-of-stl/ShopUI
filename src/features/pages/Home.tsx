import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useAuthContext } from "../../app/providers/AuthProvider";

const HomePage = () => {
  const { user } = useAuthContext();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: "100%",
          borderRadius: 3,
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Icon */}
          <ConstructionIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />

          {/* Title */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Work in Progress 🚧
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            We're building something awesome for you.  
            Please check back soon!
          </Typography>

          {/* User Info */}
          {user && (
            <Typography
              variant="body2"
              sx={{ mb: 2 }}
            >
              Welcome, <strong>{user.name}</strong>
            </Typography>
          )}

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 5 }}
          >
            Explore (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomePage;