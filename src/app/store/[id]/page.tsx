"use client";

import { CartItem } from "@/types/cart";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  priceId: string;
}

export default function PlantDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [plant, setPlant] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            router.push("/404");
            return;
          }
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setPlant(data);
      } catch (err) {
        setError("Error loading product. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !plant) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography color="error" align="center">
          {error || "Product not found"}
        </Typography>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button variant="contained" component={Link} href="/store">
            Back to Store
          </Button>
        </Box>
      </Container>
    );
  }

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
        <Typography color="text.primary">{plant.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        <Grid spacing={{ xs: 12, md: 6 }}>
          <Paper
            elevation={2}
            sx={{
              height: 400,
              bgcolor: "grey.200",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${plant.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {!plant.image && (
              <Typography color="text.secondary">
                Plant Image Placeholder
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid spacing={{ xs: 12, md: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {plant.name}
          </Typography>

          <Typography variant="h4" component="p" color="primary" gutterBottom>
            ${plant.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 3, mb: 4 }}>
            {plant.description}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2 }}
              onClick={() => {
                // Get existing cart from localStorage
                const existingCart = localStorage.getItem("cart")
                  ? JSON.parse(localStorage.getItem("cart") || "[]")
                  : [];

                // Check if item already exists in cart
                const itemIndex = existingCart.findIndex(
                  (item: CartItem) => item.id === plant.id
                );

                if (itemIndex > -1) {
                  // Increase quantity if item exists
                  existingCart[itemIndex].quantity += 1;
                } else {
                  // Add new item with quantity 1
                  existingCart.push({ ...plant, quantity: 1 });
                }

                // Save updated cart
                localStorage.setItem("cart", JSON.stringify(existingCart));

                // Show feedback
                alert("Item added to cart!");
              }}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" component={Link} href="/store">
              Back to Store
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
