import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";

const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: "₹2,499",
    image: "https://source.unsplash.com/300x200/?shoes",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₹5,999",
    image: "https://source.unsplash.com/300x200/?watch",
  },
  {
    id: 3,
    name: "Headphones",
    price: "₹1,999",
    image: "https://source.unsplash.com/300x200/?headphones",
  },
  {
    id: 4,
    name: "Backpack",
    price: "₹1,299",
    image: "https://source.unsplash.com/300x200/?bag",
  },
];

const ShopPage = () => {
  return (
    <Box sx={{ px: 3, py: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* 🔥 HERO */}
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          color: "#fff",
          background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Shop the Latest Trends 🛍️
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Discover amazing products at unbeatable prices
        </Typography>
      </Box>

      {/* 🔥 CATEGORIES */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: "wrap" }}>
        {["All", "Shoes", "Electronics", "Accessories"].map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              "&:hover": { bgcolor: "#ddd" },
            }}
          />
        ))}
      </Stack>

      {/* 🔥 PRODUCT GRID */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",

                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                },
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                height="180"
                image={product.image}
              />

              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {product.price}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 5 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopPage;