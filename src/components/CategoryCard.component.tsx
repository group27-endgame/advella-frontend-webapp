import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

type CardProps = {
  image: string;
  title: string | null | undefined;
  categoryId: number | null | undefined;
  type: string;
};
function CategoryCard(this: any, props: CardProps) {
  return (
    <>
      <Link
        href={
          props.type === "service"
            ? "categoryService/" + props.categoryId
            : "categoryProduct/" + props.categoryId
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
          src={props.image}
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
