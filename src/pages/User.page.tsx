import { Box, Avatar, Typography, Button, Grid, Link } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import ServiceCard from "../components/ServiceCard.component";

import { useCookies } from "react-cookie";
import UserService from "../services/User.service";

export default function User() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [userName, setUsername] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    userService.getCurrentUser(cookie.token).then((resp) => {
      setUsername(resp?.username!);
      setDescription(resp?.description!);
    });
  }, []);

  const userService: UserService = new UserService();

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

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "5rem" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "0.5rem", sm: "0rem" },
            justifyContent: "center",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#E67A35",
              color: "#fff",
              textTransform: "upperCase",
            }}
          >
            {" "}
            {userName.charAt(0)}
          </Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: { sm: "1rem" },
              fontSize: "1.5rem",
              textAlign: { xs: "center", sm: "left" },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography fontSize={20} className="userName">
              {userName}
            </Typography>
            <Rating size="small" />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: { sm: "auto" },
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                marginLeft: { sm: "auto" },
                textTransform: "capitalize",
              }}
            >
              Message
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: "0.5rem", sm: "0rem" },

            maxWidth: "700px",
            margin: "auto",
            textAlign: "left",
            mt: 4,
          }}
        >
          {" "}
          <Typography sx={{ ml: { sm: 7 } }}> {description}</Typography>
        </Box>

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
              Listings
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
          {categories.map(function (name, index) {
            return (
              <Grid item xs={6} md={4} lg={3} key={index}>
                <ServiceCard
                  id={index}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={" Category"}
                  description={
                    "Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti Lorem Ipsum is simply dummy text of the printing and typesetti"
                  }
                  price={0}
                  type={"product"}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
