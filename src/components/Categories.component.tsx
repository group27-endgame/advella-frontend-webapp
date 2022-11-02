import CategoryCard from "./CategoryCard.component";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ProductService from "../services/Product.service";
import ServiceService from "../services/Service.service";
import { useCookies } from "react-cookie";
import CategoryProduct from "../models/CategoryProduct.model";
import { useEffect, useState } from "react";
import CategoryService from "../models/CategoryService.model";

function Categories() {
  const [cookie] = useCookies(["token"]);
  const [product, setProduct] = useState<CategoryProduct[]>([]);
  const [service, setService] = useState<CategoryService[]>([]);

  useEffect(() => {
    const productService: ProductService = new ProductService();
    const serviceService: ServiceService = new ServiceService();
    let mounted: boolean = true;
    productService.getProductCategories(cookie.token).then((response) => {
      if (mounted) {
        setProduct(response);
      }
    });

    serviceService.getServiceCategories(cookie.token).then((response) => {
      if (mounted) {
        console.log(response);
        setService(response);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ textAlign: " left", mb: 10 }}>
        <Typography
          gutterBottom
          sx={{
            fontWeight: "900",
            fontSize: { xs: "3rem", md: "5rem" },
            lineHeight: { xs: "3rem", md: "5rem" },
            marginBottom: "4rem",
          }}
        >
          Categories
        </Typography>
        <Grid container spacing={2}>
          {product.map(function (name, index) {
            return (
              <Grid item xs={6} md={4} lg={3} key={index}>
                <CategoryCard
                  categoryId={name.productCategoryId}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={name.title}
                  type="product"
                />
              </Grid>
            );
          })}

          {service.map(function (name, index) {
            return (
              <Grid item xs={6} md={4} lg={3} key={index}>
                <CategoryCard
                  categoryId={name.serviceCategoryId}
                  image={"https://www.fillmurray.com/g/200/300"}
                  title={name.title}
                  type="service"
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default Categories;
