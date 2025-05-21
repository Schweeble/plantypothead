"use client";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useRouter } from "next/navigation";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const featuredPlants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: "$29.99",
      image:
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Popular houseplant with unique split leaves",
    },
    {
      id: 2,
      name: "Snake Plant",
      price: "$24.99",
      image:
        "https://images.unsplash.com/photo-1593482892290-f54c7f8ed372?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Easy to care for plant with tall, architectural leaves",
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: "$39.99",
      image:
        "https://images.unsplash.com/photo-1615213612138-d554e8f8d726?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Trendy plant with large violin-shaped leaves",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            fontWeight="bold"
          >
            Planty Pothead
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Bring life to your space with our carefully curated selection of
            indoor and outdoor plants.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => handleNavigation("/store")}
            >
              Shop Plants
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => handleNavigation("/about")}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Featured Plants Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Featured Plants
        </Typography>
        <Grid container spacing={4}>
          {featuredPlants.map((plant) => (
            <Grid key={plant.id} spacing={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    image={plant.image}
                    alt={plant.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {plant.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="primary">
                      {plant.price}
                    </Typography>
                    <Typography>{plant.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary">
            View All Plants
          </Button>
        </Box>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Why Choose Our Plants
          </Typography>
          <Grid container spacing={4}>
            <Grid spacing={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, textAlign: "center", bgcolor: "transparent" }}
              >
                <LocalFloristIcon
                  color="primary"
                  sx={{ fontSize: 60, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Eco-Friendly
                </Typography>
                <Typography color="textSecondary">
                  All our plants are grown using sustainable practices to
                  minimize environmental impact.
                </Typography>
              </Paper>
            </Grid>
            <Grid spacing={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, textAlign: "center", bgcolor: "transparent" }}
              >
                <WaterDropIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Easy Care
                </Typography>
                <Typography color="textSecondary">
                  We provide detailed care instructions for each plant to ensure
                  they thrive in your home.
                </Typography>
              </Paper>
            </Grid>
            <Grid spacing={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, textAlign: "center", bgcolor: "transparent" }}
              >
                <LightModeIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Health Benefits
                </Typography>
                <Typography color="textSecondary">
                  Plants improve air quality, reduce stress, and enhance your
                  overall well-being.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Paper
          sx={{
            p: 4,
            background: `linear-gradient(120deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid spacing={{ xs: 12, md: 6 }}>
              <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
                Join Our Newsletter
              </Typography>
              <Typography sx={{ color: "white", opacity: 0.9 }}>
                Sign up to receive plant care tips, special offers, and updates
                on new arrivals.
              </Typography>
            </Grid>
            <Grid spacing={{ xs: 12, md: 6 }}>
              <Box component="form" sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Email Address"
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    "& .MuiFilledInput-root": {
                      bgcolor: "white",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ bgcolor: theme.palette.secondary.main, color: "white" }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
