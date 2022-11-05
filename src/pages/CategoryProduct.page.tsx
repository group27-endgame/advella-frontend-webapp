import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProductService from "../services/Product.service";
import { useEffect, useState } from "react";
import ProductModel from "../models/Product.model";
import { Grid, Link, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import Container from "@mui/system/Container";
import UserService from "../services/User.service";

export default function CategoryProduct() {
  const [cookie] = useCookies(["token"]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const { categoryId } = useParams();
  const productService: ProductService = new ProductService();
  const userService: UserService = new UserService();

  // eslint-disable-next-line
  useEffect(() => {
    let mounted: boolean = true;

    productService.getProductsInCategory(categoryId).then((response) => {
      if (mounted) {
        setProducts(response);

        productService
          .getProductCategory(Number(categoryId))
          .then((response) => {
            setCategoryName(response?.title!);
          });
      }
    });

    userService.getCurrentUser(cookie.token).then((response) => {
      // console.log(response);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: " left", mb: 10 }}>
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
              {categoryName}
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
          {products.map(function (name, index) {
            return (
              <Grid item xs={6} md={4} lg={3} key={index}>
                <ServiceCard
                  id={name.productId}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={name?.title}
                  description={name.detail}
                  price={name.moneyAmount}
                  type={"product"}
                  categoryId={Number(categoryId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
