import { useEffect, useState } from "react";
import Product from "../models/Product.model";
import ProductService from "../services/Product.service";
import { useCookies } from "react-cookie";
import { Container, Typography, Grid } from "@mui/material";

export default function AllProducts() {
  const [, setProductList] = useState<Product[]>([]);
  const [cookie] = useCookies(["token"]);

  const productService: ProductService = new ProductService();
  useEffect(() => {
    let mounted: boolean = true;

    productService.getProducts(cookie.token).then((movies) => {
      if (mounted) {
        setProductList(movies);
        console.log(movies);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: " left" }}>
        <Typography
          gutterBottom
          sx={{
            fontWeight: "900",
            fontSize: { xs: "3rem", md: "5rem" },
            lineHeight: { xs: "3rem", md: "5rem" },
            marginBottom: "4rem",
          }}
        >
          Categories
        </Typography>
        <Grid container spacing={2}></Grid>
      </Container>
    </>
  );
}
