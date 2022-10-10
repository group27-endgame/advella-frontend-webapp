import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ServiceCard from "./ServiceCard.component";
import Link from "@mui/material/Link";

var categories = [
  "Housing",
  "Electronics",
  "Something",
  " Kitchen",
  "Housing",
  "Electronics",
  "Something",
  " Kitchen",
];

function ServicesListings() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ textAlign: " left", marginBottom: "2rem" }}
      >
        <Grid
          container
          sx={{ alignItems: " center", justifyContent: " center" }}
        >
          <Grid item xs={6}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: "900",
                fontSize: "5rem",
                lineHeight: "5rem",
              }}
            >
              Services
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: " end", paddingRight: "16px" }}>
            <Link
              href="#"
              underline="none"
              gutterBottom
              sx={{
                lineHeight: "5rem",
                fontSize: " 20px",
                marginLeft: " auto",
              }}
            >
              See more &gt;
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {categories.map(function (name, index) {
            return (
              <Grid item xs={3}>
                <ServiceCard
                  id={index}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={" Category"}
                  description={" popici"}
                  price={5}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default ServicesListings;
