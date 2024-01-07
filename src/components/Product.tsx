import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, styled, Paper, Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
// import { Scale } from "@mui/icons-material";
// import ScaleIn from "material-ui/internal/ScaleIn";
// import { Paper } from "material-ui";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const StyledButton = styled(Button)({
  "&:hover": {
    backgroundColor: "gray",
    transform: "scale(1.1)"
  }
});

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  // Add more fields if needed
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const classes = useStyles();

  const fetchProducts = async () => {
    try {
      // Retrieve the authentication token from local storage
      const token = localStorage.getItem("token");
      console.log("token is ... ", token);

      // Make an authenticated API request to get products
      const response = await axios.get(
        "http://localhost:4000/api/product/show-products",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response);

      // Update the state with the fetched products
      setProducts(response.data.products);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of the token

    // const isLoggedIn = localStorage.getItem("token");

    // if (isLoggedIn) {
    // If the user is logged in, fetch products
    fetchProducts();
    // Handle the case when the user is not logged in
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2>Product List </h2>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ marginTop: "20px" }}
        >
          {products &&
            products.map(prod =>
              <Grid item xs={2} sm={4} md={4} key={prod.id}>
                <Link
                  to={`/product/${prod.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Item
                    sx={{
                      border: "1px solid #000000",
                      marginLeft: "30px",
                      marginRight: "30px"
                    }}
                  >
                    <div style={{ whiteSpace: "pre-line" }}>
                      <div style={{ fontWeight: "bold", color: "black" }}>
                        {prod.title}
                      </div>
                      <div style={{ color: "black" }}>
                        {prod.price}
                      </div>
                      <div>
                        <StyledButton
                          variant="contained"
                          sx={{
                            height: "fit-content",
                            width: "fit-content",
                            color: "black",
                            backgroundColor: "gray"
                          }}
                        >
                          <ShoppingBagIcon fontSize="medium" />
                        </StyledButton>
                      </div>
                    </div>
                  </Item>
                </Link>
              </Grid>
            )}
        </Grid>
      </Box>
    </div>
  );
};

export default ProductList;
