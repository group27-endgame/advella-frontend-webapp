import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {
  Avatar,
  Button,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/system/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect, useState } from "react";
export default function Product() {
  const [letter, setLetter] = useState<string>();

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  useEffect(() => {
    const userFirstLetter =
      document.querySelector(".userName")?.textContent![0];
    setLetter(userFirstLetter);
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "3rem" }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <ImageGallery
              items={images}
              lazyLoad
              showFullscreenButton={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
              slideDuration={200}
              showNav={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={"bold"} sx={{ mb: 2 }}>
              Product
            </Typography>
            <Typography
              fontWeight={"bold"}
              margin="normal"
              sx={{
                fontSize: { xs: "3rem" },
                lineHeight: { xs: "3rem" },
                marginBottom: "1rem",
              }}
            >
              Need to fix some dishwasher
            </Typography>
            <Stack direction="row" spacing={2} marginBottom={2}>
              <Button
                sx={{ textTransform: "capitalize", color: "green", pl: 0 }}
              >
                {" "}
                <AttachMoneyIcon style={{ color: "green" }} />
                Make a bid
              </Button>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: "0.5rem", sm: "0rem" },
              }}
            >
              <Avatar sx={{ bgcolor: "#E67A35", color: "#fff" }}>
                {" "}
                {letter}
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
                  Patrik Horny
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  marginLeft: { sm: "auto" },
                  gap: "1rem",
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    marginLeft: { sm: "auto" },
                    textTransform: "capitalize",
                  }}
                >
                  View profile
                </Button>
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
            <Typography mt={4} mb={2} fontWeight="bold">
              Description
            </Typography>
            <Typography mb={4}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
            <Typography mb={2} fontWeight="bold">
              Details
            </Typography>
            <Box display={"flex"} mb={1}>
              <Typography sx={{ opacity: 0.7 }}>Price:</Typography>
              <Typography ml={1}>200dk</Typography>
            </Box>
            <Box display={"flex"} mb={1}>
              <Typography sx={{ opacity: 0.7 }}>Pick up location:</Typography>
              <Typography ml={1}>Horsens</Typography>
            </Box>
            <Box display={"flex"} mb={1}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>
                Approximate duration:
              </Typography>
              <Typography ml={1}>10 hours</Typography>
            </Box>
            <Box display={"flex"} mb={1}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>Created:</Typography>
              <Typography ml={1}>27/09/2000</Typography>{" "}
            </Box>
            <Box display={"flex"} mb={1}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>Deadline:</Typography>
              <Typography ml={1}>27/09/2000</Typography>{" "}
            </Box>
            <Box display={"flex"}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>Category:</Typography>
              <Typography ml={1} color={"black"}>
                {" "}
                <Link href="#" color={"#000"}>
                  House
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
