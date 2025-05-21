"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";

interface OrderDetails {
  id: string;
  amount_total: number;
  customer_details: {
    email: string;
    name: string;
  };
  payment_status: string;
  shipping: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string | null;
      postal_code: string;
      state: string;
    };
    name: string;
  } | null;
  created: number;
}

function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Clear the cart since the purchase is complete
    localStorage.removeItem("cart");

    // If there's a session ID, fetch the order details
    if (sessionId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await fetch(
            `/api/checkout/session?session_id=${sessionId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch order details");
          }

          const data = await response.json();
          setOrder(data);
        } catch (err) {
          console.error("Error fetching order details:", err);
          setError(
            "We couldn't retrieve your order details, but your order has been processed successfully."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
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
        <Typography color="text.primary">Order Confirmation</Typography>
      </Breadcrumbs>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
          Your order has been placed successfully. We&apos;ve sent a
          confirmation email with the order details.
        </Typography>

        {loading ? (
          <CircularProgress sx={{ my: 4 }} />
        ) : error ? (
          <Typography color="error" sx={{ my: 2 }}>
            {error}
          </Typography>
        ) : order ? (
          <Box sx={{ width: "100%", mt: 3 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2">Order ID:</Typography>
              <Typography>{order.id}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2">Date:</Typography>
              <Typography>
                {new Date(order.created * 1000).toLocaleDateString()}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2">Total Amount:</Typography>
              <Typography>${(order.amount_total / 100).toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="subtitle2">Payment Status:</Typography>
              <Chip
                label={order.payment_status}
                color={order.payment_status === "paid" ? "success" : "default"}
                size="small"
              />
            </Box>

            {order.customer_details && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Customer Information
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">Name:</Typography>
                  <Typography>{order.customer_details.name}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">Email:</Typography>
                  <Typography>{order.customer_details.email}</Typography>
                </Box>
              </>
            )}

            {order.shipping && order.shipping.address && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Shipping Address
                </Typography>
                <Box sx={{ textAlign: "right" }}>
                  <Typography>{order.shipping.name}</Typography>
                  <Typography>{order.shipping.address.line1}</Typography>
                  {order.shipping.address.line2 && (
                    <Typography>{order.shipping.address.line2}</Typography>
                  )}
                  <Typography>
                    {order.shipping.address.city},{" "}
                    {order.shipping.address.state}{" "}
                    {order.shipping.address.postal_code}
                  </Typography>
                  <Typography>{order.shipping.address.country}</Typography>
                </Box>
              </>
            )}
          </Box>
        ) : (
          <Typography sx={{ my: 2 }}>
            Your order is confirmed, but no further details are available.
          </Typography>
        )}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          component={Link}
          href="/store"
          sx={{ minWidth: 150 }}
        >
          Continue Shopping
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href="/"
          sx={{ minWidth: 150 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<CircularProgress sx={{ mt: 8 }} />}>
      <Success />
    </Suspense>
  );
}
