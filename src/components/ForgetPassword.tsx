import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const defaultTheme = createTheme();

const ForgetPassword = ({ setToken }) => {
  const [email, setEmail] = React.useState<string>("");
  //   const [password, setPassword] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState("");
  //   const [passwordError, setPasswordError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  //   const validatePassword = () => {
  //     if (password.length < 8) {
  //       setPasswordError("Password must be at least 8 characters");
  //     } else {
  //       setPasswordError("");
  //     }
  //   };

  const sendDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    console.log("form submitted");

    setEmailError("");
    // setPasswordError("");

    // if (!email) {
    if (!email) {
      validateEmail();
    }

    //   if (!password) {
    //     validatePassword();
    //   }

    setLoading(false);

    //   return;
    // }

    const isEmailVAlidated = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // const isPasswordValidated = password.length > 8;

    console.log("isEmailValidated", isEmailVAlidated);
    // console.log("isPassword Validated", isPasswordValidated);

    // if (!isEmailVAlidated || !isPasswordValidated) {
    if (!isEmailVAlidated) {
      setEmailError("Invalid email format");
    }
    //   if (!isPasswordValidated) {
    //     setPasswordError("Password must be at least 8 characters");
    //   }
    setLoading(false);

    //   return;
    // }

    sendDetailSignIn();
  };

  const sendDetailSignIn = async () => {
    await axios
      .post("http://localhost:4000/api/auth/forgot-password", {
        email: email
        // password: password
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* <Card
          sx={{
            minWidth: 450,
            padding: "30px",

            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          }}
        > */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={sendDetails}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />
              <span style={{ color: "red", fontSize: "13px" }}>
                {emailError}
              </span>
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <span style={{ color: "red", fontSize: "13px" }}>
                {passwordError}
              </span>
            </Grid> */}
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
                : "Reset Password"}
            </Button>
            <ToastContainer />
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <Grid container>
                <Grid item xs>
                  {/* href="#" */}
                  <Link href="/login" variant="body2">
                    {"Login? "}
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/sign-up" variant="body2">
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
        {/* </Card> */}
      </Container>
    </ThemeProvider>
  );
};

export default ForgetPassword;
