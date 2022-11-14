import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ProductService from "../services/Product.service";
import { useEffect, useState } from "react";
import ProductModel from "../models/Product.model";
import { Grid, Link, Skeleton, Stack, Typography } from "@mui/material";
import ServiceCard from "../components/ServiceCard.component";
import Container from "@mui/system/Container";
import UserService from "../services/User.service";

export default function CategoryProduct() {
  const [cookie] = useCookies(["token"]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const { categoryId } = useParams();
  const productService: ProductService = new ProductService();
  const userService: UserService = new UserService();
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line
  useEffect(() => {
    let mounted: boolean = true;
    setLoading(true);

    productService.getProductsInCategory(categoryId).then((response) => {
      if (mounted) {
        setProducts(response);
        setLoading(false);

        productService
          .getProductCategory(Number(categoryId))
          .then((response) => {
            setCategoryName(response?.title!);
          });
      }
    });

    userService.getCurrentUser(cookie.token).then((response) => {
      // console.log(response);
    });

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
              {products.map(function (name, index) {
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
              })}
            </Grid>
          </div>
        )}
      </Container>
    </>
  );
}
