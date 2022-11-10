import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

type CardProps = {
  image?: string;
  title: string | undefined | null;
  description?: string;
  price?: number;
  id?: number | undefined | null;
  type?: string;
};
function CategoryCard(this: any, props: CardProps) {
  return (
    <>
      <Link
        href={
          props.type === "service"
            ? "/categoryService/" + props.id
            : "/categoryProduct/" + props.id
        }
        underline="none"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: " column",
          alignItems: " center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={
            props.title === "Books"
              ? require("../assets/images/books.jpeg")
              : props.title === "Technology"
              ? require("../assets/images/technology.jpeg")
              : props.title === "Laptops"
              ? require("../assets/images/laptop.jpeg")
              : props.title === "Phones"
              ? require("../assets/images/phone.jpeg")
              : props.title === "Lifestyle"
              ? require("../assets/images/lifestyle.jpeg")
              : props.title === "Marketing"
              ? require("../assets/images/marketing.jpg")
              : ""
          }
          sx={{
            width: { xs: 150, sm: 300 },
            height: { xs: 150, sm: 300 },
            gap: "2rem",
          }}
        />
        <Typography
          gutterBottom
          sx={{
            fontWeight: "900",
            color: " black",
            lineHeight: "5rem",
          }}
        >
          {props.title}
        </Typography>
      </Link>
    </>
  );
}

export default CategoryCard;
