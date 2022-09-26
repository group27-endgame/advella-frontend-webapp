import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

type CardProps = {
  image: string;
  title: string;
  id: number;
};
function CategoryCard(this: any, props: CardProps) {
  return (
    <>
      <Link
        href="#"
        underline="none"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: " column",
          alignItems: " center",
        }}
      >
        {" "}
        <Avatar
          alt="Remy Sharp"
          src={props.image}
          sx={{ width: 300, height: 300, gap: "2rem" }}
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
