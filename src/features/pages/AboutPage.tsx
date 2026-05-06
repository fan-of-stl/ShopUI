import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AboutPage = () => {
  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        mt: 4,

        // 🔥 Gradient background (depth feel)
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,

          // 🔥 Glass effect
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.1)",

          // 🔥 3D shadow
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",

          textAlign: "center",
          transition: "0.3s",

          "&:hover": {
            transform: "translateY(-6px) scale(1.02)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Icon */}
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#764ba2",
              width: 70,
              height: 70,
              margin: "0 auto",
              mb: 2,
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <InfoOutlinedIcon fontSize="large" />
          </Avatar>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#fff",
              mb: 1,
            }}
          >
            About SnapLife
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 3,
            }}
          >
            SnapLife is a modern platform designed to deliver seamless user
            experience with high performance, secure authentication, and
            scalable architecture.
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 3,
            }}
          >
            Built using React, TypeScript, TanStack Query, and Spring Boot, we
            aim to provide a fast and intuitive experience for users.
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            sx={{
              borderRadius: 5,
              px: 4,
              background: "#fff",
              color: "#764ba2",
              fontWeight: 600,

              "&:hover": {
                background: "#eee",
              },
            }}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutPage;