import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, Select, Slide } from "@mui/material";
import { MenuItem } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SlideProps } from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Transition = React.forwardRef<unknown, SlideProps>(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignUp() {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [text1, setText1] = React.useState<string>("");
  const [okButton, setOkButton] = React.useState(false);
  const [verifyLink, setVerifyLink] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const [fullNameError, setFullNameError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [roleIdError, setRoleIdError] = React.useState("");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  //--------------------------------------------------------------------

  //---------------------------------------------------------------------

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    window.open(verifyLink, "_blank");
    setOpen(false);
  };

  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   setRole(event.target.value);
  // };

  const validateFullName = () => {
    // Implement your validation logic here
    if (!name) {
      setFullNameError("Full name is required");
      // return false;
    } else {
      setFullNameError("");
      // return true;
    }
  };

  const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      // return false;
    } else {
      setPasswordError("");
      // return true;
    }
  };

  const validateRoleId = () => {
    // Implement role ID validation logic here
    if (!role) {
      setRoleIdError("Role ID is required");
      // return false;
    } else {
      setRoleIdError("");
    }
  };

  const sendDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    console.log("form submitted");

    setEmailError("");
    setFullNameError("");
    setPasswordError("");
    setRoleIdError("");

    if (!name || !email || !password || !role) {
      if (!name) {
        validateFullName();
      }

      if (!email) {
        validateEmail();
      }

      if (!password) {
        validatePassword();
      }

      if (!role) {
        validateRoleId();
      }
      setLoading(false);

      return;
    }

    const isEmailVAlidated = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValidated = password.length > 8;

    console.log("isEmailValidated", isEmailVAlidated);
    console.log("isPassword Validated", isPasswordValidated);

    if (!isEmailVAlidated || !isPasswordValidated) {
      if (!isEmailVAlidated) {
        setEmailError("Invalid email format");
      }
      if (!isPasswordValidated) {
        setPasswordError("Password must be at least 8 characters");
        // return;
      }
      setLoading(false);

      return;
    }

    sendDetails2();
  };

  const sendDetails2 = async () => {
    await axios
      .post("http://localhost:4000/api/auth/sign-up", {
        fullName: name,
        email: email,
        password: password,
        roleId: role
      })
      .then(function(response) {
        console.log("ghfh", response);
        if (response.status == 200) {
          setLoading(false);

          setOkButton(true);
          setOpen(true);
          setText1("You're Successfully registered ");
          setText(
            "You're Successfully registered\nPress OK for account verification "
          );
          setVerifyLink(response.data.testURI);
          console.log("Test URI", response.data.testURI);
        }
      })
      .catch(function(error) {
        console.log("error", error);
        if (error.response.status == 400) {
          setLoading(false);

          setOpen(true);
          setText1("Error");
          setText(error.response.data.message);
        }
      });
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={sendDetails}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  autoFocus
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {fullNameError}
                </span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {emailError}
                </span>
              </Grid>
              <Grid item xs={12}>
                <TextField
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
                  autoComplete="new-password"
                />
                <span style={{ color: "red", fontSize: "13px" }}>
                  {passwordError}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={e => {
                        setRole(e.target.value);
                      }}

                      // onChange={handleChange}
                    >
                      <MenuItem value={"User"}>User</MenuItem>
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <span style={{ color: "red", fontSize: "13px" }}>
                    {roleIdError}
                  </span>
                </Box>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading
                ? <CircularProgress size={24} color="inherit" />
                : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {text1}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {okButton && <Button onClick={handleOk}>Ok</Button>}
          </DialogActions>
        </Dialog>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
