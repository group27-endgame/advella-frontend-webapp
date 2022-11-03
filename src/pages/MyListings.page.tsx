import { Container, Grid, Typography, Link } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import ProductService from "../services/Product.service";
import { useCookies } from "react-cookie";
import UserService from "../services/User.service";
import { useEffect } from "react";

export default function MyListings() {
  const [cookie] = useCookies(["token"]);

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

  const service: ProductService = new ProductService();
  const userService: UserService = new UserService();

  // let num: number | undefined = undefined;
  useEffect(() => {
    userService.getCurrentUser(cookie.token).then((response) => {
      service
        .getProductsInPostedByUser(cookie.token, response?.userId!)
        .then((value) => {
          console.log(value);
        });
    });

    return () => {};
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ my: "3rem" }}>
        <Grid
          container
          sx={{ alignItems: " center", justifyContent: " center", mt: 8 }}
        >
          <Grid item xs={6}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: "900",
                fontSize: { xs: "2rem", md: "5rem" },
                lineHeight: { xs: "3rem", md: "5rem" },
              }}
            >
              My listings
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

        <Grid container spacing={3}>
          {categories.map(function (name, index) {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ServiceCard
                  id={index}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={" Category"}
                  description={
                    "Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti"
                  }
                  price={0}
                  type={"service"}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
