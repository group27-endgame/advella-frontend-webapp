import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceModel from "../models/Service.model";
import ServiceService from "../services/Service.service";
import { Box, Grid, Link, TextField, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import Container from "@mui/system/Container";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/system/Stack";
import SearchIcon from "@mui/icons-material/Search";

export default function CategoryService() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [servicesCopy, setServicesCopy] = useState<ServiceModel[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [search] = useState("");

  const { categoryId } = useParams();

  const serviceService: ServiceService = new ServiceService();

  // eslint-disable-next-line
  useEffect(() => {
    let mounted: boolean = true;
    setLoading(true);
    serviceService.getServicesInCategory(categoryId).then((response) => {
      if (mounted) {
        setServices(response);
        setServicesCopy(response);
        console.log(response);

        serviceService
          .getServiceCategory(Number(categoryId))
          .then((response) => {
            setCategoryName(response?.title!);
          });

        setLoading(false);
      }
    });

    return () => {
      setLoading(false);
      mounted = false;
    };
  }, [search]);

  const arraySearch = (array: any, keyword: any) => {
    const searchTerm = keyword.toLowerCase();
    return array.filter((value: any) => {
      return value.title.toLowerCase().match(new RegExp(searchTerm, "g"));
    });
  };

  const handleOnChange = async (e: any) => {
    let value = e.target.value;
    if (value.length > 0) {
      let search = await arraySearch(services, value);
      setServices(search);
    } else {
      setServices(servicesCopy);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: " left", mb: 10, mt: 10 }}>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems={{ xs: "start", sm: "center" }}
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={1}
        >
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
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <TextField
              onChange={handleOnChange}
              label={"Search for " + categoryName.toLowerCase()}
              size="small"
            />

            <SearchIcon />
          </Box>
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
            <Grid container spacing={2}>
              {services.length === 0 ? (
                <Grid item xs={12}>
                  {" "}
                  Item not found
                </Grid>
              ) : (
                services.map(function (name, index) {
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
                })
              )}
            </Grid>
          </div>
        )}
      </Container>
    </>
  );
}
