import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ServiceModel from "../models/Service.model";
import ServiceService from "../services/Service.service";
import { Grid, Link, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import Container from "@mui/system/Container";
import UserService from "../services/User.service";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/system/Stack";

export default function CategoryService() {
  const [cookie] = useCookies(["token"]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  const serviceService: ServiceService = new ServiceService();
  const userService: UserService = new UserService();

  // eslint-disable-next-line
  useEffect(() => {
    let mounted: boolean = true;
    setLoading(true);
    serviceService.getServicesInCategory(categoryId).then((response) => {
      if (mounted) {
        setServices(response);
        console.log(response);

        serviceService
          .getServiceCategory(Number(categoryId))
          .then((response) => {
            setCategoryName(response?.title!);
          });

        setLoading(false);
      }
    });

    userService.getCurrentUser(cookie.token).then((response) => {});

    return () => {
      setLoading(false);
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
          <Grid item xs={12}>
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
        </Grid>
        {loading ? (
          <Grid container sx={{ alignItems: " center", mt: 8 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <Grid item xs={12} md={4} lg={3}>
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
            <Grid container spacing={2}>
              {services.map(function (name, index) {
                return (
                  <Grid item xs={12} md={4} lg={3} key={index}>
                    <ServiceCard
                      id={name.serviceId}
                      image={name.serviceImages?.[0]?.path}
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
          </div>
        )}
      </Container>
    </>
  );
}
