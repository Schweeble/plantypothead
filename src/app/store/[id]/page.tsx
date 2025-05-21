"use client";

import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

// This is just mock data - in a real app, you would fetch from a database or API
const plantsData = {
  "1": {
    id: "1",
    name: "Monstera Deliciosa",
    price: 39.99,
    description:
      "Known for its distinctive leaves with natural holes, the Monstera Deliciosa is a great addition to any home. It requires moderate light and watering.",
    image: "/plant-placeholder.jpg",
  },
  "2": {
    id: "2",
    name: "Snake Plant",
    price: 24.99,
    description:
      "The Snake Plant is a hardy indoor plant with stiff, upright leaves. It is known for being very low maintenance and can thrive in almost any condition.",
    image: "/plant-placeholder.jpg",
  },
  "3": {
    id: "3",
    name: "Fiddle Leaf Fig",
    price: 49.99,
    description:
      "With large, violin-shaped leaves, the Fiddle Leaf Fig makes a striking statement in any room. It needs bright, indirect light and consistent care.",
    image: "/plant-placeholder.jpg",
  },
};

export default function PlantDetail({ params }: { params: { id: string } }) {
  const plant = plantsData[params.id as keyof typeof plantsData];

  if (!plant) {
    notFound();
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
        <Grid spacing={{ xs: 6, md: 12 }}>
          <Paper
            elevation={2}
            sx={{
              height: 400,
              bgcolor: "grey.200",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">
              Plant Image Placeholder
            </Typography>
          </Paper>
        </Grid>

        <Grid spacing={{ xs: 6, md: 12 }}>
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
