"use client";

import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      const total = parsedCart.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      setSubtotal(total);
    }
  }, []);

  const steps = [
    "Shipping information",
    "Payment details",
    "Review your order",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      // Order completed
      localStorage.removeItem("cart");
      // In a real app, you would submit the order to your backend here
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <MuiLink component={Link} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/cart"
          underline="hover"
          color="inherit"
        >
          Cart
        </MuiLink>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid spacing={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            {activeStep === 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid spacing={{ xs: 12, sm: 6 }}>
                    <TextField required fullWidth label="First name" />
                  </Grid>
                  <Grid spacing={{ xs: 12, sm: 6 }}>
                    <TextField required fullWidth label="Last name" />
                  </Grid>
                  <Grid spacing={{ xs: 12 }}>
                    <TextField required fullWidth label="Address line 1" />
                  </Grid>
                  <Grid spacing={{ xs: 12 }}>
                    <TextField fullWidth label="Address line 2" />
                  </Grid>
                  <Grid spacing={{ xs: 12, sm: 6 }}>
                    <TextField required fullWidth label="City" />
                  </Grid>
                  <Grid spacing={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="State/Province/Region"
                    />
                  </Grid>
                  <Grid spacing={{ xs: 12, sm: 6 }}>
                    <TextField required fullWidth label="Zip / Postal code" />
                  </Grid>
                  <Grid spacing={{ xs: 12, sm: 6 }}>
                    <TextField required fullWidth label="Country" />
                  </Grid>
                  <Grid spacing={{ xs: 12 }}>
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Use this address for payment details"
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Payment method
                </Typography>
                <Grid container spacing={2}>
                  <Grid spacing={{ xs: 12, md: 6 }}>
                    <TextField required fullWidth label="Name on card" />
                  </Grid>
                  <Grid spacing={{ xs: 12, md: 6 }}>
                    <TextField required fullWidth label="Card number" />
                  </Grid>
                  <Grid spacing={{ xs: 12, md: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry date"
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid spacing={{ xs: 12, md: 6 }}>
                    <TextField required fullWidth label="CVV" />
                  </Grid>
                </Grid>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>
                        {item.name} × {item.quantity}
                      </Typography>
                      <Typography>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
                </Box>
              </>
            )}

            {activeStep === steps.length && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order!
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/store"
                  sx={{ mt: 3 }}
                >
                  Continue Shopping
                </Button>
              </Box>
            )}
          </Paper>

          {activeStep < steps.length && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          )}
        </Grid>

        <Grid spacing={{ xs: 12, md: 4 }}>
          {activeStep < steps.length && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {item.name} × {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Shipping</Typography>
                <Typography variant="body2">Free</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
