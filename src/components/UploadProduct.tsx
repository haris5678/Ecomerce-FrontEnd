import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
// import { PriceChange } from "@mui/icons-material";

const defaultTheme = createTheme();

const UploadProduct = ({ setToken }) => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>();
  const [qty, setQty] = React.useState<number>();
  const [category_id, setCategory_id] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [priceError, setPriceError] = React.useState("");
  const [qtyError, setQtyError] = React.useState("");
  const [category_idError, setCategory_idError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const validateTitle = () => {
    if (title.length < 4) {
      setTitleError("Title should be more than 3 letters");
    } else {
      setTitleError("");
    }
  };

  const validateDescription = () => {
    if (description == "") {
      setDescriptionError("description must not be empty");
    } else {
      setDescriptionError("");
    }
  };

  const validatePrice = () => {
    // console.log("aty is 2 ", price, typeof price);

    if (price <= 0 || price > 1000000) {
      setPriceError("Price should be a number between 1 and 1000000");
    } else {
      setPriceError("");
    }
  };

  const validateQty = () => {
    // console.log("aty is ");

    // console.log("aty is ", qty, typeof qty);
    if (qty <= 0) {
      console.log("aty is ", qty);
      setQtyError("Quantity should at least 1 ");
    } else {
      setQtyError("");
    }
  };

  // const validateCategory_id = () => {
  //   if (category_id == "") {
  //     setCategory_idError("category_id must not be empty");
  //   } else {
  //     setCategory_idError("");
  //   }
  // };

  const sendDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    console.log("form submitted");

    setTitleError("");
    setDescriptionError("");
    setPriceError("");
    setQtyError("");
    setCategory_idError("");

    if (!title || !description || !price || !qty || !category_id) {
      if (!title) {
        setTitleError("Please fill the title field");
      } else {
        validateTitle();
      }

      if (!description) {
        setDescriptionError("Please fill the description field");
      } else {
        validateDescription();
      }

      if (price == undefined) {
        setPriceError("Please fill the price field");
      } else {
        validatePrice();
      }

      if (qty == undefined) {
        setQtyError("Please fill the quantity field");
      } else {
        validateQty();
      }

      if (!category_id) {
        setCategory_idError("Please fill the category id field");
      }

      setLoading(false);

      return;
    }

    const isTitleVAlidated = title.length >= 4;
    const isDescriptionValidated = description != "";
    const isPriceValidated = price > 0 && price < 1000000 && price != 0;
    const isQtyValidated = qty > 0 && qty != 0;

    if (
      !isTitleVAlidated ||
      !isDescriptionValidated ||
      !isPriceValidated ||
      !isQtyValidated
    ) {
      if (!isTitleVAlidated) {
        setTitleError("Title should be more than 3 letters");
      }
      if (!isDescriptionValidated) {
        setDescriptionError("description must not be empty");
      }
      if (!isPriceValidated) {
        setPriceError("Price should be a number between 1 and 1000000");
      }

      if (!isQtyValidated) {
        setQtyError("Quantity should at least 1 ");
      }

      setLoading(false);

      return;
    }

    sendDetailSignIn();
  };

  const sendDetailSignIn = async () => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MjAsInJvbGVJZCI6IlVzZXIifSwiaWF0IjoxNzAzNzM5NTM2LCJleHAiOjE3MDM3NDMxMzZ9.UlH0TwPgBcDl_qG_8IxOypGIEtRP6Qm8IaGldgJznMo";

    // const payload = JSON.parse(atob(token.split(".")[1]));
    // console.log("payload .... ", payload);

    // const expDate = new Date(payload.exp * 1000);

    // console.log("expDate .... ", expDate);

    // console.log("Expiration Time:", expDate.toUTCString());

    // return;
    await axios
      .post("http://localhost:4000/api/product/create-product", {
        title: title,
        description: description,
        price: price,
        qty: qty,
        category_id: category_id

        // {
        // title: "New Product 10",
        // "description": "Product Description",
        // "price": 200,
        // "qty":20,
        // "category_id":[2]
        //   }
      })
      .then(function(response) {
        // console.log("ghfh", response);
        if (response.status == 200) {
          setLoading(false);

          console.log(response.data.message);
          const token = response.data.token;
          console.log("login token is..... ", token);
          localStorage.setItem("token", token);
          setToken(token);

          navigate("/product");
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          // </Link>
        }
      })
      .catch(function(error) {
        console.log("error", error);

        if (error.response.status == 401) {
          setLoading(false);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      });
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Typography component="h1" variant="h5">
              Upload Product
            </Typography>
            <Box
              component="form"
              onSubmit={sendDetails}
              noValidate
              sx={{ mt: 3 }}
            >
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                  autoFocus
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {titleError}
                </span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="description"
                  type="description"
                  id="description"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {descriptionError}
                </span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="price"
                  type="number"
                  id="price"
                  value={price}
                  onChange={e => {
                    setPrice(parseFloat(e.target.value));
                  }}
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {priceError}
                </span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="qty"
                  label="qty"
                  type="number"
                  id="qty"
                  value={qty}
                  onChange={e => {
                    setQty(parseFloat(e.target.value));
                  }}
                  //   autoComplete="current-password"
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {qtyError}
                </span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="category_id"
                  label="category_id"
                  type="category_id"
                  id="category_id"
                  value={category_id}
                  onChange={e => {
                    setCategory_id(e.target.value);
                  }}
                  //   autoComplete="current-password"
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {category_idError}
                </span>
              </Grid>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading
                  ? <CircularProgress size={24} color="inherit" />
                  : "Upload"}
              </Button>
              <ToastContainer />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default UploadProduct;
