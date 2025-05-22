"use client";

import { CartItem } from "@/types/cart";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCartDialog from "@/components/ui/AddToCartDialog";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: [string];
  priceId: string;
}

export default function PlantDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [plant, setPlant] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
        {/* Image Section */}
        <Grid spacing={{ xs: 12, md: 6 }}>
          <Card
            elevation={3}
            sx={{
              maxWidth: "100%",
              height: "auto",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={plant.images?.[0] || "/plant-placeholder.jpg"}
              alt={plant.name}
              sx={{
                height: 400,
                objectFit: "contain",
                bgcolor: "grey.100",
              }}
            />
          </Card>
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

                // Open dialog instead of alert
                setDialogOpen(true);
              }}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" component={Link} href="/store">
              Back to Store
            </Button>
          </Box>

          {/* Add the dialog component */}
          <AddToCartDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            productName={plant?.name || ""}
            onAddAnother={() => {
              // Get existing cart
              const existingCart = localStorage.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart") || "[]")
                : [];

              // Find the item
              const itemIndex = existingCart.findIndex(
                (item: CartItem) => item.id === plant?.id
              );

              // Increase quantity
              if (itemIndex > -1) {
                existingCart[itemIndex].quantity += 1;
                // Save updated cart
                localStorage.setItem("cart", JSON.stringify(existingCart));
              }
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
