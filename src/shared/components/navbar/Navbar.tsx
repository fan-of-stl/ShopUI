import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAuthContext } from "../../../app/providers/AuthProvider";
import { useLogout } from "../../../features/auth/hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { mutate: logoutApi } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logoutApi(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.8)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          
          {/* LEFT - Brand */}
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              fontWeight: 700,
              color: "black",
            }}
            onClick={() => navigate("/")}
          >
            SnapLife
          </Typography>

          {/* CENTER (desktop only) */}
          {!isMobile && user && (
            <Box
              sx={{
                mx: "auto",
                display: "flex",
                gap: 3,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    fontWeight: 500,
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "text.primary",
                    borderBottom:
                      location.pathname === item.path
                        ? "2px solid"
                        : "2px solid transparent",
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* RIGHT */}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
            
            {!user ? (
              <Button variant="contained" onClick={() => navigate("/login")}>
                Login
              </Button>
            ) : (
              <>
                {!isMobile && (
                  <TextField
                    size="small"
                    placeholder="Search..."
                    sx={{
                      width: 200,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 5,
                        bgcolor: "#f9f9f9",
                      },
                    }}
                  />
                )}

                {/* Avatar */}
                <Avatar
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  {user.name?.charAt(0)}
                </Avatar>

                {/* Mobile menu button */}
                {isMobile && (
                  <IconButton onClick={() => setDrawerOpen(true)}>
                    <MenuIcon />
                  </IconButton>
                )}

                {/* Profile menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={()=>{navigate('/profile')}} >{user.name}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔥 MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;