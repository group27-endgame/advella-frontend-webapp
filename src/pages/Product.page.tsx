import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Alert,
  Avatar,
  Backdrop,
  Button,
  Divider,
  Fade,
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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import ProductService from "../services/Product.service";
import CategoryProduct from "../models/CategoryProduct.model";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import UserService from "../services/User.service";
export default function Product() {
  const [letter, setLetter] = useState<string>();
  const [currentBid, setCurrentBid] = useState<any | null>(0);
  const [newBid] = useState<any | null>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [money, setMoney] = useState<number | undefined>();
  const [pickUpLocation, setpickUpLocation] = useState("");
  const [postedTime, setPostedTime] = useState("");
  const [productDeadline, setProductDeadline] = useState("");
  const [category, setCategory] = useState<CategoryProduct | undefined>(
    undefined
  );
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const [status, setStatus] = useState("");
  const [isPostedUser, setIsPostedUser] = useState(false);

  const productService: ProductService = new ProductService();
  const userService: UserService = new UserService();

  const { productId } = useParams();

  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUserName] = useState("");

  useEffect(() => {
    productService.getProductById(Number(productId)).then((response) => {
      console.log(response?.posted);
      setUserName(response?.posted?.username!);
      productService
        .getProductCategory(response?.productCategory?.productCategoryId!)
        .then((cat) => {
          console.log(cat);
          let postedDateTime = new Date(response?.postedDateTime!);
          let deadline = new Date(response?.deadline!);

          setTitle(response?.title!);
          setDetail(response?.detail!);
          setMoney(response?.moneyAmount!);
          setpickUpLocation(response?.pickUpLocation!);
          setPostedTime(
            postedDateTime.getDate() +
              "/" +
              (postedDateTime.getMonth() + 1) +
              "/" +
              postedDateTime.getFullYear()
          );
          setStatus(response?.productStatus!);

          setProductDeadline(
            deadline.getDate() +
              "/" +
              (deadline.getMonth() + 1) +
              "/" +
              deadline.getFullYear()
          );

          setCategory(cat!);
          if (response?.productImages) {
            setImage(response.productImages[0].path);
          }
        });
    });

    userService.getCurrentUser(cookie.token).then((resp) => {
      // setUserName(resp?.username!);
      setUserId(resp?.userId!);

      productService.getProductById(Number(productId)).then((e) => {
        if (resp?.userId! === e?.posted?.userId) {
          setIsPostedUser(true);
          setUserId(e?.posted?.userId);
        }
      });
    });
  }, [isPostedUser, status]);

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeService = () => {
    productService.getProductById(Number(productId)).then((resp) => {
      productService.closeProductStatus(resp?.productId!).then((ok) => {
        console.log(ok);
        setStatus("closed");
      });
    });
  };
  const openService = () => {
    productService.getProductById(Number(productId)).then((resp) => {
      productService.openProductStatus(resp?.productId!).then((ok) => {
        setStatus("open");
      });
    });
  };

  const deleteService = () => {
    productService.getProductById(Number(productId)).then((resp) => {
      productService
        .deleteService(cookie.token, resp?.productId!)
        .then((ok) => {
          navigate("/mylistings");
        });
    });
  };

  const [confirmModal, setConfirmModal] = React.useState(false);

  const handleOpen = () => setConfirmModal(true);
  const handleCloseConfirmModal = () => setConfirmModal(false);

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "3rem" }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <img
              src={
                image
                  ? `https://api.advella.popal.dev/content${image}`
                  : require("../assets/images/product-placeholder.jpeg")
              }
              alt={title + " image"}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display={"flex"} justifyContent="space-between">
              <Typography fontWeight={"bold"} sx={{ mb: 2 }}>
                Product
              </Typography>
              {isPostedUser ? (
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
              ) : (
                ""
              )}
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
              {title}{" "}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack
              direction="column"
              spacing={2}
              marginBottom={2}
              sx={{ textAlign: "left", alignItems: "flex-start" }}
              divider={<Divider sx={{ mb: 2 }} flexItem />}
            >
              <Typography variant="body1" color="initial">
                Status:{" "}
                <Typography
                  component="span"
                  color="initial"
                  fontWeight={600}
                  textTransform="capitalize"
                >
                  {status}
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
                    value={newBid}
                    InputProps={{
                      inputProps: { min: { currentBid } },
                    }}
                    disabled={
                      status === "closed" ||
                      status === "Closed" ||
                      cookie.token === undefined
                    }
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
                    disabled={
                      status === "closed" ||
                      status === "Closed" ||
                      cookie.token === undefined
                    }
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
                {username?.charAt(0).toUpperCase()}
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
                  {username}
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
                  <Link
                    href={`/user/${userId}`}
                    sx={{ textDecoration: "none" }}
                  >
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
            <Typography mb={4}>{detail}</Typography>
            <Typography mb={2} fontWeight="bold">
              Details
            </Typography>
            <Box display={"flex"} mb={1}>
              <Typography sx={{ opacity: 0.7 }}>Price:</Typography>
              <Typography ml={1}>{money} dkk</Typography>
            </Box>
            <Box display={"flex"} mb={1}>
              <Typography sx={{ opacity: 0.7 }}>Pick up location:</Typography>
              <Typography ml={1}>{pickUpLocation}</Typography>
            </Box>

            <Box display={"flex"} mb={1}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>Created:</Typography>
              <Typography ml={1}>{postedTime}</Typography>{" "}
            </Box>
            <Box display={"flex"} mb={1}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>Deadline:</Typography>
              <Typography ml={1}>{productDeadline}</Typography>{" "}
            </Box>
            <Box display={"flex"}>
              {" "}
              <Typography sx={{ opacity: 0.7 }}>Category:</Typography>
              <Typography ml={1} color={"black"}>
                {" "}
                <Link
                  href={`/categoryProduct/${category?.productCategoryId!}`}
                  color={"#000"}
                >
                  {category?.title}
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
          className="bid-modal"
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
          <MenuItem
            onClick={
              status === "open" || status === "Open"
                ? closeService
                : openService
            }
          >
            {status === "open" || status === "Open"
              ? "Close bidding"
              : "Open bidding"}
          </MenuItem>

          <Divider />

          <MenuItem sx={{ color: "red" }} onClick={handleOpen}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" style={{ color: "red" }} />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={confirmModal}
          onClose={handleCloseConfirmModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 300,
          }}
        >
          <Fade in={confirmModal}>
            <Box sx={style} className="bid-modal">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                fontWeight={"bold"}
              >
                Do you really want to delete this listing?
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                After this you won't be able to recover this listing.
              </Typography>
              <Box display={"flex"} mt={2} gap={2}>
                <Button variant="outlined">Close</Button>
                <Button
                  onClick={deleteService}
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}
