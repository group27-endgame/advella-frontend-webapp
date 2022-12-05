import { useEffect, useState } from "react";
import Product from "../models/Product.model";
import ProductService from "../services/Product.service";
import { Container, Typography, Grid } from "@mui/material";
import CategoriesAndServices from "../services/CategoriesAndServices.service";
import ServiceCard from "./ServiceCard.component";

export default function AllProducts() {
  const [, setProductList] = useState<Product[]>([]);
  const [all, setAll] = useState([]);

  const productService: ProductService = new ProductService();
  const productsAndServices: CategoriesAndServices =
    new CategoriesAndServices();
  useEffect(() => {
    let mounted: boolean = true;

    productService.getProducts().then((movies) => {
      if (mounted) {
        setProductList(movies);
      }
    });

    productsAndServices.getProductsAndServicesLatest().then((e) => {
      setAll(e);
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
          Latest postings
        </Typography>

        <Grid container spacing={3}>
          {all.map((name: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {name.productId ? (
                <ServiceCard
                  id={name.productId}
                  image={name.productImages?.[0]?.path}
                  title={name.title}
                  description={name.detail}
                  price={name.moneyAmount}
                  type={"product"}
                  posted={name?.posted?.username}
                />
              ) : (
                <ServiceCard
                  id={name.serviceId}
                  serviceDescription={name.detail}
                  image={name.serviceImages?.[0]?.path}
                  price={name.service}
                  type={"service"}
                  serviceTitle={name.title}
                  servicePrice={name.moneyAmount}
                  posted={name?.posted?.username}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
