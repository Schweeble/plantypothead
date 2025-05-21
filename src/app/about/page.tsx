"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CompostIcon from "@mui/icons-material/Compost";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Emma Green",
      position: "Founder & Plant Expert",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Plant enthusiast with over 10 years of experience in botany and horticulture.",
    },
    {
      name: "David Moss",
      position: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Business expert ensuring our plants are ethically sourced and delivered with care.",
    },
    {
      name: "Sarah Root",
      position: "Plant Care Specialist",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      bio: "Dedicated to helping customers choose and maintain the perfect plants for their spaces.",
    },
  ];

  const companyValues = [
    {
      title: "Sustainability",
      description:
        "We are committed to sustainable practices in every aspect of our business.",
      icon: <CompostIcon fontSize="large" color="primary" />,
    },
    {
      title: "Quality",
      description:
        "We source only the healthiest plants and provide detailed care instructions.",
      icon: <AutoAwesomeIcon fontSize="large" color="primary" />,
    },
    {
      title: "Passion",
      description:
        "Our team is passionate about plants and sharing that love with our customers.",
      icon: <FavoriteIcon fontSize="large" color="primary" />,
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
          position: "relative",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="primary"
            gutterBottom
            fontWeight="bold"
          >
            About Planty Pothead
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Bringing nature into your everyday life since 2015
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid spacing={{ xs: 12, md: 6 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Planty Pothead began with a simple mission: to make the joy of
              plants accessible to everyone. Founded in 2015 by Emma Green, our
              journey started as a small pop-up shop offering carefully selected
              houseplants for urban dwellers.
            </Typography>
            <Typography variant="body1" paragraph>
              Today, we&apos;ve grown into a thriving plant community, providing
              not just beautiful plants but also education, support, and
              inspiration for plant enthusiasts of all levels.
            </Typography>
            <Typography variant="body1">
              Our commitment to sustainability and quality remains at the heart
              of everything we do. Each plant in our collection is thoughtfully
              chosen and nurtured before finding its forever home with you.
            </Typography>
          </Grid>
          <Grid spacing={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                height: 350,
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1585537884202-85a5c651a1b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Our Values
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6 }}
          >
            The principles that guide everything we do
          </Typography>

          <Grid container spacing={4}>
            {companyValues.map((value, index) => (
              <Grid spacing={{ xs: 12, md: 4 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>{value.icon}</Box>
                    <Typography gutterBottom variant="h5" component="h3">
                      {value.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Meet Our Team
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          The plant lovers behind Planty Pothead
        </Typography>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid key={index} spacing={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", pt: 3 }}>
                  <Avatar
                    alt={member.name}
                    src={member.image}
                    sx={{ width: 120, height: 120 }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Why Choose Planty Pothead
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            We&apos;re more than just a plant store - we&apos;re your partners
            in creating a greener, more vibrant living space.
          </Typography>

          <Grid container spacing={2}>
            <Grid spacing={{ xs: 12, md: 6 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Expert Plant Selection"
                    secondary="Each plant is hand-picked by our specialists for quality and health"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Detailed Care Guides"
                    secondary="We provide personalized care instructions with every purchase"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Secure Packaging"
                    secondary="Our plants are carefully packaged to ensure safe delivery"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid spacing={{ xs: 12, md: 6 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="30-Day Guarantee"
                    secondary="We stand behind the health and quality of our plants"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sustainable Practices"
                    secondary="Eco-friendly growing methods and packaging materials"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Community Support"
                    secondary="Join our plant-loving community for ongoing advice and inspiration"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Statement */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <LocalFloristIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" color="primary" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
            To bring the beauty and benefits of plants into everyday life,
            promoting well-being, sustainability, and a deeper connection with
            nature.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            We believe that everyone deserves to experience the joy and
            tranquility that plants bring to our homes and workspaces.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
