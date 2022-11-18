import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

function Landing() {
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const handleClick = () => {
    if (search.length > 0) {
      navigate(`/search/${search.toString()}`);
    }
  };

  function SubscribingComponent() {
    const [lastMessage, setLastMessage] = useState("No message received yet");

    useSubscription("/topic/test", (message) => setLastMessage(message.body));
    return (
      <>
        <div>Last Message: {lastMessage}</div>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: " center",
            justifyContent: "center",
            textAlign: " center",
          }}
          marginTop={4}
          minHeight="80vh"
        >
          {/* <StompSessionProvider
            url={"https://api.advella.popal.dev"}
            //All options supported by @stomp/stompjs can be used here
          >
            <SubscribingComponent />
          </StompSessionProvider> */}
          <Grid container spacing={2}>
            <Grid item xs={12} paddingY={4}>
              <Typography
                gutterBottom
                sx={{
                  fontWeight: "900",
                  fontSize: { xs: "3rem", md: "5rem" },
                  lineHeight: { xs: "3rem", md: "5rem" },
                }}
              >
                Post and sell on our circular marketplace
              </Typography>

              <Typography
                gutterBottom
                sx={{ fontSize: "20px", marginBottom: "2rem" }}
              >
                Share services, sell products between each other and make the
                life easier for yourself
              </Typography>

              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                  width: " 100%",
                  display: " flex",
                  justifyContent: " center",
                  gap: "0.5rem",
                  marginBottom: "3rem",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Search for a service or a product"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "530px",
                  }}
                  value={search}
                  onKeyDown={(e: any) =>
                    e.keyCode === 13 ? handleClick() : null
                  }
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="contained" size="large" onClick={handleClick}>
                  Search
                </Button>
              </Box>

              <Typography
                gutterBottom
                sx={{ fontSize: "16px", marginBottom: "1rem" }}
              >
                Most popular categories people need help with
              </Typography>

              <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
                sx={{ flexWrap: "wrap", rowGap: "1rem" }}
              >
                <Button size="large" sx={{ textTransform: "capitalize" }}>
                  <Link
                    href="categoryService/2"
                    color="inherit"
                    underline="none"
                  >
                    Marketing
                  </Link>
                </Button>
                <Button
                  size="large"
                  sx={{
                    textTransform: "capitalize",
                    borderRightColor: {
                      xs: "initial !important",
                      sm: "transparent !important",
                    },
                  }}
                >
                  <Link
                    href="categoryProduct/2"
                    color="inherit"
                    underline="none"
                  >
                    Laptops
                  </Link>
                </Button>
                <Button size="large" sx={{ textTransform: "capitalize" }}>
                  <Link
                    href="categoryService/1"
                    color="inherit"
                    underline="none"
                  >
                    Technology
                  </Link>
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Landing;
