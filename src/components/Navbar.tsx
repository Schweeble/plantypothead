"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  useTheme,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Store",
    link: "/store",
  },
  {
    name: "Plants",
    link: "/plants",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => router.push(item.link)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ bgcolor: "white" }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: "primary.main",
                textDecoration: "none",
                flexGrow: isMobile ? 1 : 0,
              }}
            >
              Planty Pothead
            </Typography>

            {!isMobile && (
              <Box sx={{ display: "flex", mx: "auto" }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    sx={{ mx: 1, color: "text.primary" }}
                    onClick={() => router.push(item.link)}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: "flex" }}>
              <IconButton color="primary" aria-label="shopping cart">
                <ShoppingCartIcon />
              </IconButton>

              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
