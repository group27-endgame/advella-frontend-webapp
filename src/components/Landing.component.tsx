import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";

function Landing() {
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
                Shop and sell on our circular marketplace
              </Typography>

              <Typography
                gutterBottom
                sx={{ fontSize: "20px", marginBottom: "2rem" }}
              >
                Share services between each other and make the life easier for
                yourself
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
                />
                <Button variant="contained" size="large">
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
                  <Link href="#" color="inherit" underline="none">
                    Outdoors
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
                  <Link href="#" color="inherit" underline="none">
                    Housing
                  </Link>
                </Button>
                <Button size="large" sx={{ textTransform: "capitalize" }}>
                  <Link href="#" color="inherit" underline="none">
                    Electronics
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
