import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  CssBaseline,
  Link as MuiLink,
} from "@mui/material";
import { SHA256 } from "crypto-js";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#800080", // Purple color for primary buttons and elements
    },
    secondary: {
      main: "#000000", // Black color for secondary buttons and elements
    },
    background: {
      default: "#ffffff", // White color for background elements
    },
    text: {
      primary: "#000000", // Black color for primary text
      secondary: "#ffffff", // White color for secondary text
    },
  },
});

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userSummary, setUserSummary] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [defProfilePic, setDefProfilePic] = useState(
    "https://as1.ftcdn.net/v2/jpg/02/85/15/18/1000_F_285151855_XaVw4eFq1QufklRbMFDxdAJos1OadAD1.jpg"
  );
  const [usersSummary, setUsersSummary] = useState([]);
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies([
    "username_token",
    "user_id_token",
  ]);
  const navigate = useNavigate();

  // State variables for dialog messages
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    usersRefetch();
  }, []);

  const usersRefetch = async () => {
    await fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((userFetchData) => setUsersSummary(userFetchData));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const displayDialogMessage = (title, message) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const LogIntoAccount = async () => {
    let accountMatch = false;
    for (var element of usersSummary) {
      if (element.username === usernameLogin) {
        accountMatch = true;
        if (element.password === SHA256(passwordLogin).toString()) {
          removeSessionCookies("user_id_token");
          removeSessionCookies("username_token");
          setSessionCookies("user_id_token", element.id, { path: "/" });
          setSessionCookies("username_token", element.username, { path: "/" });
          setSessionCookies("userPriv_Token", element.is_supracoder, {
            path: "/",
          });
          navigate("/users");
          window.location.reload();
          setUsernameLogin("");
          setPasswordLogin("");
          displayDialogMessage(
            "Login Successful",
            `Login successful for ${element.first_name} ${element.last_name}.`
          );
          break;
        } else {
          displayDialogMessage(
            "Incorrect Password",
            `Incorrect password for ${element.first_name} ${element.last_name}.`
          );
          break;
        }
      }
    }
    if (!accountMatch) {
      displayDialogMessage(
        "Account Not Found",
        "No account found for that username."
      );
    }
  };

  const CreateAccount = async () => {
    let profPicToSet = "";
    if (profilePic === "") {
      profPicToSet = defProfilePic;
    } else {
      profPicToSet = profilePic;
    }
    await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: SHA256(password).toString(),
        user_summary: userSummary,
        profile_pic: profPicToSet,
        is_supracoder: false,
      }),
    });
    window.location.reload();
    displayDialogMessage("Account Created", "Account created successfully!");
    usersRefetch();
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: "relative",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white", // Set the text color
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent overlay
              p: 4, // Padding for text
            }}
          >
            <Typography variant="h4" component="h1" align="center">
              Let's Build Something Amazing Together
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username" // Ensure this is set correctly
                name="username"
                autoComplete="username"
                autoFocus
                value={usernameLogin}
                onChange={(e) => setUsernameLogin(e.target.value)}
                placeholder="Enter your username" // Placeholder text
                InputLabelProps={{
                  shrink: true,
                  style: { color: "purple" },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
                placeholder="Enter your password"
                InputLabelProps={{
                  shrink: true,
                  style: { color: "purple" },
                }}
              />
              {/* Add additional form fields or buttons as needed */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => LogIntoAccount()}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <MuiLink href="#" variant="body2">
                    Forgot password?
                  </MuiLink>
                </Grid> */}
                <Grid item>
                  <MuiLink href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </MuiLink>
                </Grid>
              </Grid>
              {/* Add your copyright component or other footer content */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Dialog for displaying messages */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Login;
