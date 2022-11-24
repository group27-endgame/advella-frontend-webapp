import { useParams } from "react-router-dom";
import ProductService from "../services/Product.service";
import { useEffect, useState } from "react";
import ProductModel from "../models/Product.model";
import {
  Box,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import Container from "@mui/system/Container";
import SearchIcon from "@mui/icons-material/Search";

export default function CategoryProduct() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [productsCopy, setProductsCopy] = useState<ProductModel[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const { categoryId } = useParams();
  const productService: ProductService = new ProductService();
  const [loading, setLoading] = useState(true);
  const [search] = useState("");

  // eslint-disable-next-line
  useEffect(() => {
    setLoading(true);

    productService.getProductCategory(Number(categoryId)).then((response) => {
      setCategoryName(response?.title!);

      productService.getProductsInCategory(categoryId).then((resp) => {
        setProducts(resp);
        console.log(resp);
        setProductsCopy(resp);
        setLoading(false);
      });
    });

    return () => {
      setLoading(false);
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
      let search = await arraySearch(products, value);
      setProducts(search);
    } else {
      setProducts(productsCopy);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: " left", mb: 10 }}>
        <Grid
          container
          sx={{ alignItems: " center", justifyContent: " center", mt: 8 }}
        >
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
              {products.length === 0 ? (
                <Grid item xs={12}>
                  {" "}
                  Item not found
                </Grid>
              ) : (
                products.map(function (name, index) {
                  return (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                      <ServiceCard
                        id={name.productId}
                        image={name.productImages?.[0]?.path}
                        title={name?.title}
                        description={name.detail}
                        price={name.moneyAmount}
                        type={"product"}
                        posted={name?.posted?.username}
                        categoryId={Number(categoryId)}
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
