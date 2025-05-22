"use client";

import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem } from "@/types/cart";
import Image from "next/image";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      calculateSubtotal(parsedCart);
    }
  }, []);

  // Calculate subtotal based on items in cart
  const calculateSubtotal = (items: CartItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  // Update cart in localStorage and recalculate subtotal
  const updateCart = (newCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    calculateSubtotal(newCart);
  };

  // Increase item quantity
  const increaseQuantity = (itemId: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (itemId: string) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCart(updatedCart);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <MuiLink component={Link} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/store"
          underline="hover"
          color="inherit"
        >
          Store
        </MuiLink>
        <Typography color="text.primary">Shopping Cart</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            component={Link}
            href="/store"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            mr: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={60}
                              style={{ objectFit: "contain" }}
                            />
                          )}
                          {!item.image && (
                            <Typography variant="body2">No Image</Typography>
                          )}
                        </Box>
                        <Typography>{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid spacing={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>Shipping:</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid",
                    borderColor: "divider",
                    pt: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  href="/checkout"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  href="/store"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
