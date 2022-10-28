import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function SignIn() {
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const validateForm = () => {
    let returnVal = true;

    setUsernameError(false);
    setUsernameErrorMessage("");
    setPasswordError(false);
    setPasswordErrorMessage("");

    if (username.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage("Username can't be empty");
      returnVal = false;
    }

    if (password.length < 1) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 5 characters long");
      returnVal = false;
    }
    return returnVal;
  };

  const handleClick = () => {
    if (validateForm()) {
      setCookie("token", "token");
      navigate("/");
    }
  };

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
          Sign in
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordErrorMessage}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, maxWidth: "30%" }}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item sx={{ textAlign: " center" }}>
              <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
