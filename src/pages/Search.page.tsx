import { Container, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "../components/ServiceCard.component";

import CategoriesAndServices from "../services/CategoriesAndServices.service";

export default function Search() {
  const categoriesAndServices: CategoriesAndServices =
    new CategoriesAndServices();
  const param = useParams();
  const [productsAndServices, setProductsAndServices] = useState<any>([]);

  useEffect(() => {
    categoriesAndServices
      .getCategoriesAndServices(param?.searchedQuery!)
      .then((response) => {
        setProductsAndServices(response);
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ my: "3rem" }}>
        <Grid
          container
          sx={{
            alignItems: " center",
            justifyContent: " center",
            mt: 8,
            mb: 4,
          }}
        >
          <Grid item xs={6}>
            <Typography
              component={"span"}
              gutterBottom
              sx={{
                fontWeight: "900",
                fontSize: { xs: "2rem", md: "3.5rem" },
                lineHeight: { xs: "3rem", md: "3rem" },
              }}
            >
              Results for: {param.searchedQuery}
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
          {productsAndServices.map((name: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              {name.productId ? (
                <ServiceCard
                  id={name.productId}
                  image={name.image}
                  title={name.title}
                  description={name.detail}
                  price={name.moneyAmount}
                  type={"product"}
                  posted={name?.posted?.username}
                />
              ) : (
                <ServiceCard
                  id={name.serviceId}
                  image={name.image}
                  serviceDescription={name.detail}
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
