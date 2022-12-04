import {
  Container,
  Grid,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "../components/ServiceCard.component";

import CategoriesAndServices from "../services/CategoriesAndServices.service";

export default function Search() {
  const categoriesAndServices: CategoriesAndServices =
    new CategoriesAndServices();
  const param = useParams();
  const [productsAndServices, setProductsAndServices] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    categoriesAndServices
      .getCategoriesAndServices(param?.searchedQuery!)
      .then((response) => {
        setLoading(false);
        console.log(response);
        setProductsAndServices(response);
      });
    return () => {
      setLoading(false);
    };
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
          <Grid item xs={12}>
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
        </Grid>
        {loading ? (
          <Grid container sx={{ alignItems: " center", mt: 8 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <Grid item xs={12} md={4} lg={3} key={i}>
                <Stack spacing={1}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div>
            <Grid container spacing={3}>
              {productsAndServices.length === 0 ? (
                <Grid item xs={12}>
                  <Typography fontSize={20}> No results</Typography>
                </Grid>
              ) : (
                ""
              )}

              {productsAndServices.map((name: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  {name}
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
          </div>
        )}
      </Container>
    </>
  );
}
