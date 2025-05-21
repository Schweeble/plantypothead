"use client";

import { Fab, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CartItem } from "@/types/cart";

export default function FloatingCartButton() {
  const router = useRouter();
  const [itemCount, setItemCount] = useState(0);

  // Function to calculate total items in cart
  const calculateItemCount = () => {
    const cartData = localStorage.getItem("cart");
    if (!cartData) return 0;

    try {
      const cart = JSON.parse(cartData);
      return cart.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return 0;
    }
  };

  // Update count when component mounts and when storage changes
  useEffect(() => {
    // Set initial count
    setItemCount(calculateItemCount());

    // Update count when localStorage changes
    const handleStorageChange = () => {
      setItemCount(calculateItemCount());
    };

    // Listen for storage events (when cart is updated from another tab)
    window.addEventListener("storage", handleStorageChange);

    // Create a custom interval to check for changes in the same tab
    const checkCartInterval = setInterval(() => {
      setItemCount(calculateItemCount());
    }, 1000); // Check every second

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkCartInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1,
      }}
    >
      <Badge
        badgeContent={itemCount}
        color="error"
        max={99}
        sx={{
          "& .MuiBadge-badge": {
            right: 8,
            top: 8,
          },
        }}
      >
        <Fab
          color="primary"
          aria-label="shopping cart"
          onClick={() => {
            // Navigate to the cart page
            router.push("/cart");
          }}
        >
          <ShoppingCartIcon />
        </Fab>
      </Badge>
    </div>
  );
}
