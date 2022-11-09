import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ServiceModel from "../models/Service.model";
import ServiceService from "../services/Service.service";
import { Grid, Link, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import Container from "@mui/system/Container";
import UserService from "../services/User.service";

export default function CategoryService() {
  const [cookie] = useCookies(["token"]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const { categoryId } = useParams();

  const serviceService: ServiceService = new ServiceService();
  const userService: UserService = new UserService();

  // eslint-disable-next-line
  useEffect(() => {
    let mounted: boolean = true;

    serviceService.getServicesInCategory(categoryId).then((response) => {
      if (mounted) {
        setServices(response);
        console.log(response);

        serviceService
          .getServiceCategory(Number(categoryId))
          .then((response) => {
            setCategoryName(response?.title!);
          });
      }
    });

    userService.getCurrentUser(cookie.token).then((response) => {});

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
          {services.map(function (name, index) {
            return (
              <Grid item xs={6} md={4} lg={3} key={index}>
                <ServiceCard
                  id={name.serviceId}
                  image={"https://www.fillmurray.com/g/200/300"}
                  serviceDescription={name.detail}
                  price={name.moneyAmount}
                  type={"service"}
                  serviceTitle={name.title}
                  posted={name?.posted?.username}
                  servicePrice={name.moneyAmount}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
