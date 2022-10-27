import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {
  Alert,
  Avatar,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/system/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect, useState } from "react";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Service() {
  const [likeCLicked, setLikeClicked] = useState(false);
  const [likeAmount, setLikeAmount] = useState<number>(0);
  const [letter, setLetter] = useState<string>();
  const [currentBid, setCurrentBid] = useState<any | null>(0);
  const [newBid, setNewBid] = useState<any | null>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLikeIconClick = () => {
    setLikeClicked(!likeCLicked);
  };

  const handleLikeClick = () => {
    const getLike = likeAmount;
    setLikeAmount(getLike + 1);
  };

  const handleDislikeClick = () => {
    const getLike = likeAmount;
    setLikeAmount(getLike - 1);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetNewBid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newBid > currentBid) {
      setCurrentBid(newBid);
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 6000);
      console.log(newBid);
      console.log("bid:" + newBid);
      console.log("current Bid" + currentBid);
    } else {
      console.log(newBid);
      console.log("bid:" + newBid);
      console.log("current Bid" + currentBid);
      setOpenErrorSnackbar(true);
      setTimeout(() => {
        setOpenErrorSnackbar(false);
      }, 6000);
    }
  };

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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    borderRadius: "2px",
    boxShadow: 24,
    p: 4,
    zIndex: 5,
    background: "#fff",
  };

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
            <Box display={"flex"} justifyContent="space-between">
              <Typography fontWeight={"bold"} sx={{ mb: 2 }}>
                Service
              </Typography>
              <Tooltip title="Edit listing">
                <IconButton
                  onClick={handleOptionsClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  aria-label="settings"
                >
                  Edit
                </IconButton>
              </Tooltip>
            </Box>
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
            <Stack
              direction="column"
              spacing={2}
              marginBottom={2}
              sx={{ textAlign: "left", alignItems: "flex-start" }}
              divider={<Divider sx={{ mb: 2 }} flexItem />}
            >
              <Box
                sx={{ textTransform: "capitalize", pl: 0 }}
                onClick={handleLikeIconClick}
              >
                {/* // full thumnbs up icon, liked */}
                {likeCLicked ? (
                  <Button
                    variant="text"
                    component="span"
                    onClick={handleDislikeClick}
                    startIcon={<ThumbUpAltIcon sx={{ mr: 1 }}></ThumbUpAltIcon>}
                  >
                    {" "}
                    Likes {likeAmount}{" "}
                  </Button>
                ) : (
                  // empty thumbs up, not liked

                  <Button
                    variant="text"
                    component="span"
                    onClick={handleLikeClick}
                    startIcon={
                      <ThumbUpOffAltIcon sx={{ mr: 1 }}></ThumbUpOffAltIcon>
                    }
                  >
                    {" "}
                    Likes {likeAmount}{" "}
                  </Button>
                )}
              </Box>
              <Typography variant="body1" color="initial" sx={{ mt: 1 }}>
                Status:{" "}
                <Typography component="span" color="initial" fontWeight={600}>
                  Ongoing
                </Typography>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  width: "100%",
                  alignItems: "start",
                }}
                component="form"
                onSubmit={handleSetNewBid}
                noValidate
              >
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignContent={"center"}
                  sx={{ width: "100%" }}
                >
                  <Typography sx={{ display: "flex", flex: 1, mb: 3 }}>
                    Current bid:&nbsp;
                    <Typography fontWeight={"bold"} component={"span"}>
                      {currentBid}dkk
                    </Typography>
                  </Typography>

                  <Button
                    variant="text"
                    sx={{
                      p: "0 !important",
                      height: "fit-content !important",
                      textTransform: "capitalize",
                    }}
                    onClick={handleOpenModal}
                  >
                    See Bidders
                  </Button>
                </Box>

                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} className="bid-modal">
                    <Box display={"flex"} flexDirection="column">
                      <Stack direction="column" spacing={4} marginBottom={2}>
                        <Typography
                          fontWeight={"bold"}
                          sx={{
                            fontSize: "2rem",
                            textAlign: { xs: "center", sm: "left" },
                          }}
                        >
                          Bidders
                        </Typography>
                        {/* loop through the bidders */}

                        <Box
                          display={"flex"}
                          alignItems="center"
                          sx={{ flexDirection: { xs: "column", sm: "row" } }}
                          gap={2}
                        >
                          <Avatar></Avatar>
                          <Box display={"flex"}>
                            <Typography>Janko - &#8203;</Typography>
                            <Typography fontWeight={"bold"}>30dkk</Typography>
                          </Box>
                          <Button
                            variant="contained"
                            sx={{
                              ml: { sm: "auto" },
                              textTransform: "capitalize",
                            }}
                          >
                            Message
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Modal>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    flex: 1,
                    width: "100%",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    margin="none"
                    required
                    fullWidth
                    label="Bid amount"
                    name="bidAmount"
                    type="number"
                    defaultValue={currentBid}
                    onChange={(e) => setNewBid(e.target.value)}
                    sx={{ maxWidth: { md: "25%" } }}
                  />{" "}
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      color: "white",
                      background: "green",
                      maxWidth: { md: "50%" },
                    }}
                    type="submit"
                  >
                    {" "}
                    <AttachMoneyIcon style={{ color: "white" }} />
                    Make a bid
                  </Button>{" "}
                </Box>
              </Box>
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
                  <Link href="/user/1" sx={{ textDecoration: "none" }}>
                    View profile
                  </Link>
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    marginLeft: { sm: "auto" },
                    textTransform: "capitalize",
                  }}
                >
                  <Link
                    href="/chat"
                    sx={{ textDecoration: "none", color: "white" }}
                  >
                    Message
                  </Link>
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
              <Typography sx={{ opacity: 0.7 }}>Location:</Typography>
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

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          open={openSnackbar}
          message="I love snacks"
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Success! You made a new bid with an amount of:
            <Typography component="span" fontWeight={"bold"}>
              &nbsp; {currentBid} dkk
            </Typography>
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={6000}
          open={openErrorSnackbar}
          message="I love snacks"
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            Your bid need to be higher than the current one
          </Alert>
        </Snackbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>Close bidding</MenuItem>

          <Divider />

          <MenuItem sx={{ color: "red" }}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" style={{ color: "red" }} />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </Container>
    </>
  );
}
