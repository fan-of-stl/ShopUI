import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import { Outlet, useNavigate } from "react-router-dom";

import { useState } from "react";
import { logoutApi } from "../../../features/auth/api/authApi";
import { LogoutOutlined } from "@mui/icons-material";
import { useLogout } from "../../../features/auth/hooks/useLogout";

const drawerWidth = 240;

const menuItems = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    path: "/admin",
  },

  {
    label: "Products",
    icon: <Inventory2OutlinedIcon />,
    path: "/admin/products",
  },

  {
    label: "Categories",
    icon: <CategoryOutlinedIcon />,
    path: "/admin/categories",
  },

  {
    label: "Brands",
    icon: <BrandingWatermarkOutlinedIcon />,
    path: "/admin/brands",
  },

  {
    label: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    path: "/admin/profile",
  },
];

const SideBar = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const { mutate: logoutApi } = useLogout();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

   const handleLogout = () => {
    logoutApi(undefined
      , {
      onSuccess: () => navigate("/login"),
    });
  };

  const drawer = (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          Admin Panel
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />

      {/* ====================== */}
      {/* APPBAR */}
      {/* ====================== */}

      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },

          ml: {
            sm: `${drawerWidth}px`,
          },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: {
                sm: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>


          <IconButton onClick={handleLogout} color="inherit" title="Logout">
          <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ====================== */}
      {/* SIDEBAR */}
      {/* ====================== */}

      <Box
        component="nav"
        sx={{
          width: {
            sm: drawerWidth,
          },

          flexShrink: {
            sm: 0,
          },
        }}
      >
        {/* MOBILE */}

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",

              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* DESKTOP */}

        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",

              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* ====================== */}
      {/* PAGE CONTENT */}
      {/* ====================== */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
};

export default SideBar;
