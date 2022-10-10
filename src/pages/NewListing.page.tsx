import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function NewListing() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const duration = {
      hours: data.get("hours"),
      minutes: data.get("minutes"),
    };

    if (radioValue === "service") {
      console.log({
        title: data.get("title"),
        description: data.get("detail"),
        listingType: radioValue,
        price: data.get("price"),
        date: data.get("date"),
        images: images,
        duration: duration,
        location: data.get("location"),
        category: category,
      });
    } else {
      console.log({
        title: data.get("title"),
        description: data.get("detail"),
        listingType: radioValue,
        price: data.get("price"),
        date: data.get("date"),
        images: images,
        location: data.get("location"),
        category: category,
      });
    }
  };

  const [radioValue, setRadioValue] = React.useState("service");

  const radioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            autoFocus
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
          />
          <FormControl sx={{ textAlign: "left", width: "100%" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Type of listing
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioValue}
              defaultValue={radioValue}
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
                autoComplete="price"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 99999 } }}
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
                style={{ opacity: radioValue === "product" ? 0.5 : 1 }}
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
                  required
                  fullWidth
                  label="Hours"
                  name="hours"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 99999 } }}
                  disabled={radioValue === "product"}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Minutes"
                  name="minutes"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 99999 } }}
                  disabled={radioValue === "product"}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {" "}
              <TextField
                required
                name="location"
                label="Location"
                sx={{ width: " 100%" }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ paddingTop: "0px !important" }}>
              {" "}
              <TextField
                id="date"
                required
                name="date"
                label="Due date"
                type="date"
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
                  value={category}
                  label="Age"
                  onChange={handleCategoryChange}
                  required
                >
                  <MenuItem value={"Housing"}>Housing</MenuItem>
                  <MenuItem value={"Appliances"}>Appliances</MenuItem>
                  <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <>
                <div className="upload__image-wrapper">
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
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
