import { Box, Typography, Paper, Grid } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      
      {/* LEFT SIDE */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
          SnapLife
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
          SnapLife helps you to store your daily life moments
        </Typography>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <LoginForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;