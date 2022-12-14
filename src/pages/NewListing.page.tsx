import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/Product.service";
import { useCookies } from "react-cookie";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import ProductCategory from "../models/CategoryProduct.model";
import ServiceCategory from "../models/CategoryService.model";
import ServiceService from "../services/Service.service";
import UserService from "../services/User.service";
import FormHelperText from "@mui/material/FormHelperText";

export default function NewListing() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [images, setImages] = useState<ImageListType>([]);
  const [hours, setHours] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [location, setLocation] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [productStatus] = useState("Open");
  const [serviceStatus] = useState("Open");
  const [postedDay, setPostedDay] = useState("");

  const [radioCategory, setRadioCategory] = useState("service");

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [durationErrorMessage, setDurationErrorMessage] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

  const [productCategories, setProductCategories] = useState<
    ProductCategory[] | undefined
  >([]);
  const [serviceCategories, setServiceCategories] = useState<
    ServiceCategory[] | undefined
  >([]);

  const [productCategoryId, setProductCategoryId] = useState<number | null>(
    null
  );
  const [serviceCategoryId, setServiceCategoryId] = useState<number | null>(
    null
  );

  const maxNumber = 69;

  const productService: ProductService = new ProductService();
  const serviceService: ServiceService = new ServiceService();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList);
  };

  const handleSubmit = () => {
    let returnVal = true;

    setTitleError(false);
    setDescriptionError(false);
    setDurationError(false);
    setPriceError(false);
    setDurationError(false);
    setLocationError(false);
    setCategoryError(false);

    setTitleErrorMessage("");
    setDescriptionErrorMessage("");
    setDurationErrorMessage("");
    setPriceErrorMessage("");
    setDurationErrorMessage("");
    setLocationErrorMessage("");
    setCategoryErrorMessage("");

    if (title.length < 1) {
      setTitleError(true);
      setTitleErrorMessage("Title should not be empty");
      returnVal = false;
    }

    if (description.length < 1) {
      setDescriptionError(true);
      setDescriptionErrorMessage(
        "You should write something about your listing"
      );
      returnVal = false;
    }

    if (radioCategory === "service") {
      if (serviceCategoryId === null) {
        setCategoryError(true);
        setCategoryErrorMessage("You must specify a product category");
        returnVal = false;
      }
    } else {
      if (productCategoryId === null || productCategoryId === undefined) {
        setCategoryError(true);
        setCategoryErrorMessage("You must specify a product category");
        returnVal = false;
      }
    }

    if (location === null) {
      setLocationError(true);
      setLocationErrorMessage("You must specify a location");
      returnVal = false;
    }

    if (price === null) {
      setPriceError(true);
      setPriceErrorMessage("You must provide a price");
      returnVal = false;
    }

    return returnVal;
  };

  useEffect(() => {
    if (radioCategory === "product") {
      productService.getProductCategories().then((category) => {
        setProductCategories(category);
      });
    } else {
      serviceService.getServiceCategories().then((response) => {
        setServiceCategories(response);
      });
    }

    setDuration(hours! * 60 + minutes!);
    setPostedDay(Date.now().toString());

    const min = new Date().toISOString().split("T")[0];

    document.getElementById("deadline")!.setAttribute("min", min);
  }, [radioCategory, hours, minutes]);

  const handleClick = () => {
    if (handleSubmit()) {
      if (radioCategory === "product") {
        productService
          .getProductCategory(productCategoryId!)
          .then((productResponse) => {
            productService
              .addNewProduct(
                cookie.token,
                title,
                new Date(deadline).getTime(),
                productStatus,
                price!,
                description,
                location!,
                postedDay!,
                productCategoryId!,
                images[0]?.file
              )

              .then((val) => {
                console.log(val);
                navigate(`/product/${val?.productId!}`);
              })
              .catch((err) => {
                console.log(err);
              });
          });
      } else {
        serviceService
          .getServiceCategory(serviceCategoryId!)
          .then((serviceResponse) => {
            serviceService
              .addNewService(
                cookie.token,
                title,
                new Date(deadline).getTime(),
                serviceStatus,
                price!,
                description,
                location!,
                postedDay!,
                duration!,
                serviceResponse!,
                images[0]?.file
              )
              .then((val) => {
                navigate(`/service/${val?.serviceId!}`);
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    }
  };
  const radioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioCategory((event.target as HTMLInputElement).value);

    setProductCategoryId(null);
    setServiceCategoryId(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (radioCategory === "service") {
      setServiceCategoryId(Number(event.target.value));
    } else {
      setProductCategoryId(Number(event.target.value));
    }
  };

  const [terms, setTerms] = useState("");

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: " center",
          justifyContent: "center",
          textAlign: " center",
          marginTop: "2rem",
        }}
        minHeight="90vh"
      >
        <Typography
          component="h1"
          variant="h5"
          fontWeight={"bold"}
          fontSize="3rem"
        >
          Create a new listing
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            autoFocus
            value={title}
            error={titleError}
            helperText={titleErrorMessage}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="detail"
            label="Detail"
            rows={4}
            multiline={true}
            sx={{ mb: 2 }}
            value={description}
            error={descriptionError}
            helperText={descriptionErrorMessage}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl sx={{ textAlign: "left", width: "100%" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Type of listing
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioCategory}
              defaultValue={radioCategory}
              onChange={radioButtonChange}
            >
              <FormControlLabel
                value="service"
                control={<Radio />}
                label="Service"
              />
              <FormControlLabel
                value="product"
                control={<Radio />}
                label="Product"
              />
            </RadioGroup>
          </FormControl>

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ marginBottom: { xs: "1rem", sm: "0rem" } }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Price in DKK"
                name="price"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 99999 } }}
                value={price}
                error={priceError}
                helperText={priceErrorMessage}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: "flex", gap: "1rem" }}>
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  zIndex: 1,
                  textAlign: "left",
                  gap: "1rem",
                  width: "100%",
                }}
                style={{ opacity: radioCategory === "product" ? 0.5 : 1 }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: { xs: "-1.7rem", sm: "-2rem" },
                    opacity: "0.7",
                    zIndex: 2,
                    width: "150%",
                    left: 0,
                  }}
                >
                  Duration of the service
                </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Hours"
                  name="hours"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 99999 } }}
                  disabled={radioCategory === "product"}
                  onChange={(e) => setHours(Number(e.target.value))}
                  value={hours}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Minutes"
                  name="minutes"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 99999 } }}
                  disabled={radioCategory === "product"}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  value={minutes}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ my: 1, p: 0 }}>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyCL9N2D1Rnli3pBRgURbN-nGq2yVm85QbE"
                apiOptions={{ language: "dk", region: "DK" }}
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ["dk"],
                  },
                }}
                selectProps={{
                  placeholder: "Select your location*",
                  noOptionsMessage: () => {
                    return "Type something to show location suggestions";
                  },
                  location,
                  onChange: (e: any) => {
                    setTerms(e.value.terms.slice(-1)[0].value);

                    setLocation(e.label);
                  },
                  styles: {
                    control: (provided: any) => ({
                      ...provided,
                      height: 52,
                    }),

                    menu: (provided: any) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                    container: (provided: any) => ({
                      ...provided,
                      border: locationError ? "1.2px solid red" : "",
                      borderRadius: "6px",
                    }),
                  },
                }}
              />
            </Grid>
            {locationError ? (
              <Grid
                item
                xs={12}
                p={0}
                pt={0}
                color={"#d32f2f"}
                textAlign={"left"}
                fontSize={"13px"}
                style={{ padding: 0, paddingLeft: 35, paddingBottom: 20 }}
              >
                {locationErrorMessage}
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={6} sx={{ paddingTop: "0px !important" }}>
              {" "}
              <TextField
                id="deadline"
                name="deadline"
                label="Due deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                sx={{
                  width: " 100%",
                  marginBottom: { sm: "1.5rem" },
                }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ pt: "16px !important", mb: { xs: "1.5rem", sm: "0rem" } }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    radioCategory === "service"
                      ? serviceCategoryId?.toString()
                      : productCategoryId?.toString()
                  }
                  label="Category"
                  onChange={(e) => handleChange(e)}
                  error={categoryError}
                  sx={{ textAlign: "left" }}
                >
                  {radioCategory === "product"
                    ? productCategories?.map((item) => (
                        <MenuItem
                          value={Number(item.productCategoryId)}
                          key={item.productCategoryId}
                        >
                          {item.title}
                        </MenuItem>
                      ))
                    : serviceCategories?.map((item) => (
                        <MenuItem
                          value={Number(item.serviceCategoryId)}
                          key={item.serviceCategoryId}
                        >
                          {item.title}
                        </MenuItem>
                      ))}
                </Select>
                {categoryErrorMessage ? (
                  <FormHelperText
                    variant="outlined"
                    style={{ color: "#d32f2f" }}
                  >
                    You need to specify a category
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
          </Grid>

          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <>
                <div
                  className="upload__image-wrapper"
                  style={{
                    pointerEvents: images.length > 0 ? "none" : "auto",
                    opacity: images.length > 0 ? "0.3" : "1",
                  }}
                >
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="add-images-icon"
                  >
                    <path
                      d="M21.68 0H5C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5V21.68C0.00158786 23.0056 0.528882 24.2764 1.46622 25.2138C2.40356 26.1511 3.67441 26.6784 5 26.68H16.78C17.0452 26.68 17.2996 26.5746 17.4871 26.3871C17.6746 26.1996 17.78 25.9452 17.78 25.68C17.78 25.4148 17.6746 25.1604 17.4871 24.9729C17.2996 24.7854 17.0452 24.68 16.78 24.68H13.7L24.68 12.9V16.78C24.68 17.0452 24.7854 17.2996 24.9729 17.4871C25.1604 17.6746 25.4148 17.78 25.68 17.78C25.9452 17.78 26.1996 17.6746 26.3871 17.4871C26.5746 17.2996 26.68 17.0452 26.68 16.78V5C26.6784 3.67441 26.1511 2.40356 25.2138 1.46622C24.2764 0.528882 23.0056 0.00158786 21.68 0ZM5 24.68C4.56477 24.6781 4.13529 24.5804 3.742 24.394L12.588 14.912C12.6816 14.8118 12.7947 14.7319 12.9205 14.6772C13.0462 14.6226 13.1819 14.5944 13.319 14.5944C13.4561 14.5944 13.5918 14.6226 13.7175 14.6772C13.8433 14.7319 13.9564 14.8118 14.05 14.912L17.058 18.144L10.964 24.68H5ZM18.426 16.676L15.516 13.55C15.2354 13.2486 14.8958 13.0081 14.5182 12.8436C14.1406 12.6792 13.7333 12.5942 13.3214 12.594C12.9096 12.5938 12.5022 12.6784 12.1244 12.8425C11.7467 13.0067 11.4069 13.2468 11.126 13.548L2.316 22.994C2.11088 22.5862 2.00274 22.1365 2 21.68V5C2.00106 4.20468 2.31747 3.44223 2.87985 2.87985C3.44223 2.31747 4.20468 2.00106 5 2H21.68C22.4753 2.00106 23.2378 2.31747 23.8002 2.87985C24.3625 3.44223 24.6789 4.20468 24.68 5V9.966L18.426 16.676ZM7.86 4.712C7.27448 4.712 6.70212 4.88565 6.2153 5.21099C5.72849 5.53633 5.3491 5.99873 5.12513 6.53972C4.90115 7.08071 4.84265 7.67596 4.95702 8.2502C5.0714 8.82444 5.35351 9.35186 5.76767 9.76574C6.18184 10.1796 6.70944 10.4614 7.28376 10.5754C7.85808 10.6894 8.45329 10.6305 8.99413 10.4061C9.53496 10.1818 9.99711 9.80207 10.3221 9.31503C10.6471 8.828 10.8204 8.25552 10.82 7.67C10.8195 6.88512 10.5074 6.13254 9.95245 5.57755C9.39746 5.02256 8.64488 4.71053 7.86 4.71V4.712ZM7.86 8.63C7.67013 8.63 7.48452 8.5737 7.32665 8.46821C7.16878 8.36273 7.04574 8.21279 6.97308 8.03738C6.90042 7.86196 6.8814 7.66894 6.91845 7.48271C6.95549 7.29649 7.04692 7.12544 7.18118 6.99118C7.31544 6.85692 7.48649 6.76549 7.67271 6.72845C7.85893 6.6914 8.05196 6.71042 8.22738 6.78308C8.40279 6.85574 8.55272 6.97878 8.65821 7.13665C8.7637 7.29452 8.82 7.48013 8.82 7.67C8.82 7.92461 8.71886 8.16879 8.53882 8.34882C8.35879 8.52886 8.11461 8.63 7.86 8.63ZM26.678 23.23C26.678 23.4952 26.5726 23.7496 26.3851 23.9371C26.1976 24.1246 25.9432 24.23 25.678 24.23H24.228V25.68C24.228 25.9452 24.1226 26.1996 23.9351 26.3871C23.7476 26.5746 23.4932 26.68 23.228 26.68C22.9628 26.68 22.7084 26.5746 22.5209 26.3871C22.3334 26.1996 22.228 25.9452 22.228 25.68V24.232H20.782C20.5168 24.232 20.2624 24.1266 20.0749 23.9391C19.8874 23.7516 19.782 23.4972 19.782 23.232C19.782 22.9668 19.8874 22.7124 20.0749 22.5249C20.2624 22.3374 20.5168 22.232 20.782 22.232H22.228V20.782C22.228 20.5168 22.3334 20.2624 22.5209 20.0749C22.7084 19.8874 22.9628 19.782 23.228 19.782C23.4932 19.782 23.7476 19.8874 23.9351 20.0749C24.1226 20.2624 24.228 20.5168 24.228 20.782V22.232H25.678C25.9432 22.232 26.1976 22.3374 26.3851 22.5249C26.5726 22.7124 26.678 22.9668 26.678 23.232V23.23Z"
                      fill="black"
                    />
                  </svg>

                  <input
                    className={"upload__image "}
                    type="button"
                    style={
                      isDragging
                        ? { background: "#4989d3", color: "white" }
                        : undefined
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                    value={
                      isDragging
                        ? "Release the image"
                        : " Click or drop images here"
                    }
                  />
                </div>
                <Box mb={4} fontSize={12}>
                  You can upload only 1 image*
                </Box>
                <Grid container spacing={4}>
                  {imageList.map((image, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      className="image-item"
                      sx={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button
                          variant="outlined"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </>
              // write your building UI
            )}
          </ImageUploading>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, maxWidth: "30%" }}
            onClick={handleClick}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
