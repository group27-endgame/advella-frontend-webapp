import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/User.service";
import { Snackbar, Alert } from "@mui/material";

export default function SignUp() {
  const navigate = useNavigate();
  const userService: UserService = new UserService();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [location] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [, setLocationError] = useState(false);

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [, setLocationErrorMessage] = useState("");

  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    let returnVal = true;

    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);
    setDescriptionError(false);
    setLocationError(false);

    setUsernameErrorMessage("");
    setPasswordErrorMessage("");
    setEmailErrorMessage("");
    setDescriptionErrorMessage("");
    setLocationErrorMessage("");

    if (username.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage("Username can't be empty");
      returnVal = false;
    }

    if (password.length < 2) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 3 characters long");
      returnVal = false;
    }
    //eslint-disable-next-line
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Email must be valid");
      returnVal = false;
    }

    return returnVal;
  };

  const handleClick = () => {
    if (handleSubmit()) {
      userService
        .registerUser(username, password, email, description, location)
        .then((registered) => {
          if (registered) {
            navigate("/signin");
          } else {
            setIsError(true);
          }
        })
        .catch(() => {
          setIsError(true);
        });
    }
  };

  // useEffect(() => {
  //   const detectKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Enter") {
  //       handleClick();
  //     }
  //   };
  //   document.addEventListener("keydown", detectKeyDown, true);
  // }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: " center",
          justifyContent: "center",
          textAlign: " center",
        }}
        minHeight="90vh"
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            error={usernameError}
            helperText={usernameErrorMessage}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            error={passwordError}
            helperText={passwordErrorMessage}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            error={emailError}
            helperText={emailErrorMessage}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Bio"
            name="Bio"
            autoComplete="Bio"
            autoFocus
            multiline={true}
            rows={4}
            value={description}
            error={descriptionError}
            helperText={descriptionErrorMessage}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, maxWidth: "30%" }}
            onClick={handleClick}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="center">
            <Grid item sx={{ textAlign: " center" }}>
              <Link href="/signin">{"Already have an account? Sing in"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setIsError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Can't register. User already exists.
        </Alert>
      </Snackbar>
    </Container>
  );
}
