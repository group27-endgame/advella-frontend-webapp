import CategoryCard from "./CategoryCard.component";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

function Categories() {
  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: " left" }}>
        <Typography
          gutterBottom
          sx={{
            fontWeight: "900",
            fontSize: "5rem",
            lineHeight: "5rem",
            marginBottom: "4rem",
          }}
        >
          Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.map(function (name, index) {
            return (
              <Grid item xs={3}>
                <CategoryCard
                  id={index}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={" Category"}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Categories;
