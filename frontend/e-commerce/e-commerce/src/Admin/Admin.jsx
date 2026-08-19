import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CreateProductForm from "./Components/CreateProductForm";
import ProductsTable from "./Components/ProductsTable";
import OrdersTable from "./Components/OrdersTable";
import AdminDashboard from "./Components/AdminDashboard";
import CustomerTable from "./Components/CustomerTable";

import {
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Badge,
  useMediaQuery,
  useTheme
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Auth/Action";

const drawerWidth = 250;

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon fontSize="small" /> },
  { name: "Product", path: "/admin/products", icon: <InventoryIcon fontSize="small" /> },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon fontSize="small" /> },
  { name: "Orders", path: "/admin/orders", icon: <ReceiptLongIcon fontSize="small" /> },
  { name: "Add Products", path: "/admin/product/create", icon: <AddBoxIcon fontSize="small" /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuClick = (path) => {
    navigate(path);
    if (!isLargeScreen) setMobileOpen(false);
  };
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  const isActive = (path) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  const currentPage = menu.find((m) => isActive(m.path))?.name || "Dashboard";

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', gap: 1.2 }}>
        <Box sx={{ width: 34, height: 34, borderRadius: '8px', background: 'linear-gradient(135deg, #4F7CFF, #2148C9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 1px rgba(79,124,255,0.5), 0 8px 20px -6px rgba(79,124,255,0.6)' }}>
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none"><path d="M13 2 3 14h7l-1 8 11-14h-7l0-6z" fill="#fff" /></svg>
        </Box>
        <Box sx={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 16, color: '#fff' }}>
          NOVA<span style={{ color: '#4F7CFF' }}>TECH</span>
          <Box component="span" sx={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#8993AC', letterSpacing: 1, fontWeight: 400 }}>ADMIN CONSOLE</Box>
        </Box>
      </Box>

      <Typography sx={{ px: 3, mb: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, letterSpacing: 1.2, color: '#5B6584', textTransform: 'uppercase' }}>
        Menu
      </Typography>

      <List sx={{ px: 0 }}>
        {menu.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemButton
                sx={{
                  mx: 1.5,
                  mb: 0.5,
                  borderRadius: '8px',
                  position: 'relative',
                  bgcolor: active ? 'rgba(79,124,255,0.15)' : 'transparent',
                  "&:hover": {
                    backgroundColor: "rgba(79,124,255,0.12)",
                  },
                  "&::before": active ? {
                    content: '""',
                    position: 'absolute',
                    left: -12,
                    top: '20%',
                    height: '60%',
                    width: 3,
                    borderRadius: 4,
                    bgcolor: '#4F7CFF',
                  } : {},
                }}
              >
                <ListItemIcon sx={{ color: active ? '#4F7CFF' : "#8993AC", minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  slotProps={{ primary: { sx: { color: active ? '#fff' : '#B7C2E0', fontWeight: active ? 700 : 500, fontSize: 14 } } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAvatarClick} sx={{ mx: 1.5, mb: 1.5, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: "#4F7CFF", color: "#fff", fontWeight: 700, width: 32, height: 32, fontSize: 14 }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={user?.name || "Admin"}
              secondary="Administrator"
              slotProps={{ primary: { sx: { color: '#E7EBF5', fontSize: 13.5, fontWeight: 600 } }, secondary: { sx: { color: '#5B6584', fontSize: 11 } } }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{ paper: { sx: { bgcolor: '#111729', color: '#F4F6FB', border: '1px solid rgba(255,255,255,0.08)' } } }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#4F7CFF",
            fontWeight: 600,
          }}
        >
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: '#070B14' }}>
      <CssBaseline />

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen ? true : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0C111F",
            color: "white",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "3px 0px 20px rgba(0,0,0,0.4)",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { xs: 0, lg: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Topbar */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, sm: 3 },
            py: 1.5,
            bgcolor: 'rgba(7,11,20,0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {!isLargeScreen && (
              <IconButton
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#F4F6FB' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box>
              <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#5B6584', letterSpacing: 1 }}>
                ADMIN / {currentPage.toUpperCase()}
              </Typography>
              <Typography sx={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 17, color: '#fff' }}>
                {currentPage}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton sx={{ color: '#8993AC', bgcolor: '#111729', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Badge variant="dot" color="error" sx={{ '& .MuiBadge-dot': { bgcolor: '#FFB13B' } }}>
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "#4F7CFF", color: "#fff", fontWeight: 700, width: 34, height: 34, fontSize: 14, cursor: 'pointer' }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </Avatar>
          </Box>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: '#070B14',
            overflowY: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/customers" element={<CustomerTable />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
