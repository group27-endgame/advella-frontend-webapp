import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { ListItemIcon } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type CardProps = {
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  serviceId?: number;
  posted?: string | null | undefined;

  image?: string;
  title?: string | undefined | null;
  description?: string;
  price?: number;
  id?: number;
  type?: string;
  categoryId?: number | undefined | null;
  username?: string | null | undefined;
};

export default function ServiceCard(this: any, props: CardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          className="title-line-clamp"
          avatar={
            <Avatar
              sx={{ bgcolor: red[500], textTransform: "uppercase" }}
              aria-label="recipe"
            >
              {props.posted !== undefined
                ? props.posted?.charAt(0).toUpperCase()
                : props.username?.charAt(0).toUpperCase()
                ? props.username?.charAt(0).toUpperCase()
                : ""}
            </Avatar>
          }
          title={props.type === "product" ? props.title : props.serviceTitle}
          subheader={
            "Price: " +
            `${props.type === "product" ? props.price : props.servicePrice}` +
            " dkk"
          }
        />
        <Link
          href={
            props.type === "service"
              ? "/service/" + props.id
              : "/product/" + props.id
          }
        >
          <CardMedia
            component="img"
            height="194"
            image={
              props.image
                ? `https://api.advella.popal.dev/content${props.image}`
                : props.type === "service"
                ? require("../assets/images/service-placeholder.jpg")
                : require("../assets/images/product-placeholder.jpeg")
            }
            alt="Paella dish"
            sx={{ objectFit: "cover" }}
          />
        </Link>
        <div>{props.image}</div>

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineClamp: 3 }}
            className="line-clamp"
          >
            {props.type === "product"
              ? props.description
              : props.serviceDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ mt: "auto" }}>
          <ExpandMore aria-label="show more" expand={false}>
            <Link
              sx={{ textDecoration: "none", fontSize: "18px" }}
              href={
                props.type === "service"
                  ? "/service/" + props.id
                  : "/product/" + props.id
              }
            >
              Read more &gt;
            </Link>
          </ExpandMore>
        </CardActions>
      </Card>
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
    </React.Fragment>
  );
}
