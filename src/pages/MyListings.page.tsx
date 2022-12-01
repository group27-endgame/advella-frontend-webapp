import { Container, Grid, Typography, Link } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import ProductService from "../services/Product.service";
import { useCookies } from "react-cookie";
import UserService from "../services/User.service";
import { useEffect, useState } from "react";
import ServiceService from "../services/Service.service";
import ServiceModel from "../models/Service.model";
import ProductModel from "../models/Product.model";

export default function MyListings() {
  const [cookie] = useCookies(["token"]);
  const [serviceList, setServiceList] = useState<ServiceModel[] | undefined>(
    []
  );
  const [productList, setProductList] = useState<ProductModel[] | undefined>(
    []
  );

  const [username, setName] = useState("");

  const [posted, setPosted] = useState<number | null>(null);

  const productService: ProductService = new ProductService();
  const serviceService: ServiceService = new ServiceService();
  const userService: UserService = new UserService();

  useEffect(() => {
    userService.getCurrentUser(cookie.token).then((response) => {
      setName(response?.username!);
      setPosted(posted);
      productService
        .getProductsInPostedByUser(response?.userId!)
        .then((value) => {
          setProductList(value);
        });

      serviceService
        .getServicesInPostedByUser(response?.userId!)
        .then((response) => {
          setServiceList(response);
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
          <Grid item xs={12}>
            <Typography
              gutterBottom
              sx={{
                fontWeight: "900",
                fontSize: { xs: "3rem", md: "5rem" },
                lineHeight: { xs: "3rem", md: "5rem" },
              }}
            >
              My listings
            </Typography>
          </Grid>
          {/* <Grid item xs={6} sx={{ textAlign: " end", paddingRight: "16px" }}>
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
          </Grid> */}
        </Grid>

        <Typography
          gutterBottom
          sx={{
            fontWeight: "900",
            fontSize: { xs: "2rem" },
            lineHeight: { xs: "3rem", md: "5rem" },
          }}
        >
          Products{" "}
        </Typography>
        <Grid container spacing={3}>
          {productList?.length! > 0 ? (
            productList?.map((name: any, index: number) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ServiceCard
                    id={name.productId}
                    title={name.title}
                    description={name.detail}
                    price={name.moneyAmount}
                    type={"product"}
                    posted={name.posted.username}
                    image={name.productImages[0]?.path}
                    username={username}
                  />
                </Grid>
              );
            })
          ) : (
            <Grid item>
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem" },
                }}
              >
                You haven't created any products
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography
          gutterBottom
          sx={{
            fontWeight: "900",
            fontSize: { xs: "2rem" },
            mt: 4,
            lineHeight: { xs: "3rem", md: "5rem" },
          }}
        >
          Services{" "}
        </Typography>

        <Grid container spacing={3}>
          {serviceList?.length! > 0 ? (
            serviceList?.map((name: any, index: number) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ServiceCard
                    id={name.serviceId}
                    serviceDescription={name.detail}
                    price={name.service}
                    type={"service"}
                    serviceTitle={name.title}
                    posted={name.posted.username}
                    servicePrice={name.moneyAmount}
                    image={name.serviceImages[0]?.path}
                    username={username}
                  />
                </Grid>
              );
            })
          ) : (
            <Grid item>
              <Typography
                sx={{
                  fontSize: { xs: "1.2rem" },
                }}
              >
                You haven't created any services
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
