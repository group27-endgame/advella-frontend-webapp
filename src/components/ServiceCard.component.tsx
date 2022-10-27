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

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
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
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  id?: number;
  type?: string;
};

export default function ServiceCard(this: any, props: CardProps) {
  const isLoggedIn = true;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Card >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <div>
              {isLoggedIn ? (
                <Tooltip title="Listing settings">
                  <IconButton
                    onClick={handleOptionsClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    aria-label="settings"
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                " "
              )}
            </div>
          }
          title={props.title}
          subheader={"Price " + props.price}
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
            image={props.image}
            alt="Paella dish"
            sx={{objectFit:'cover'}}
          />
        </Link>

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineClamp: 3 }}
            className="line-clamp"
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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
