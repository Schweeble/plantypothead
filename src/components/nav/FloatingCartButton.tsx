"use client";

import { Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function FloatingCartButton() {
  return (
    <Fab
      color="primary"
      aria-label="shopping cart"
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <ShoppingCartIcon />
    </Fab>
  );
}
