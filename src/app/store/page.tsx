"use client";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

export default function StorePage() {
  // This is just placeholder data - in a real app you would fetch this from an API
  const plants = [
    {
      id: "1",
      name: "Monstera Deliciosa",
      price: 39.99,
      image: "/plant-placeholder.jpg",
    },
    {
      id: "2",
      name: "Snake Plant",
      price: 24.99,
      image: "/plant-placeholder.jpg",
    },
    {
      id: "3",
      name: "Fiddle Leaf Fig",
      price: 49.99,
      image: "/plant-placeholder.jpg",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Our Plants
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Browse our selection of beautiful houseplants
      </Typography>

      <Grid container spacing={4}>
        {plants.map((plant) => (
          <Grid key={plant.id} spacing={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "100%",
                  bgcolor: "grey.200", // Placeholder for image
                }}
                image={plant.image}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {plant.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  ${plant.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  href={`/store/${plant.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
