import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Button,
  TextField,
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  CssBaseline,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { SHA256 } from "crypto-js";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#800080",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
  },
});

const Register = () => {
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
          navigate("/home");
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
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    await CreateAccount();
  };
  const CreateAccount = async () => {
    let profPicToSet = profilePic === "" ? defProfilePic : profilePic;
    try {
      const response = await fetch("http://localhost:8080/users", {
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

      if (response.ok) {
        displayDialogMessage(
          "Account Created",
          "Account created successfully!"
        );
        usersRefetch();
        navigate("/login");
      } else {
        // Handle server-side validation error messages
        const errorData = await response.json();
        displayDialogMessage("Error Creating Account", errorData.message);
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      displayDialogMessage(
        "Network Error",
        "Unable to create account. Please try again later."
      );
    }
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
              "url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
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
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              p: 4,
            }}
          >
            <Typography variant="h4" component="h1" align="center">
              Join Us and Make a Difference
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
              Create Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    placeholder="Enter First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "purple" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "purple" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    className="inputText"
                    label="Username"
                    variant="outlined"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "purple" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    className="inputText"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "purple" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    className="inputText"
                    label="Profile Picture URL"
                    variant="outlined"
                    type="text"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                    placeholder="Enter Profile Picture URL"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "purple" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    className="inputText"
                    label="User Description"
                    variant="outlined"
                    type="text"
                    multiline
                    rows={3}
                    value={userSummary}
                    onChange={(e) => setUserSummary(e.target.value)}
                    placeholder="Enter Some Information About Yourself"
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: "purple" },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <MuiLink href="/login" variant="body2">
                    Already have an account? Sign in
                  </MuiLink>
                </Grid>
              </Grid>
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

export default Register;
