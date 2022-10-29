import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type Anchor = "right";

function Navbar() {
  const isLoggedIn = true;
  const [cookie, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const signOut = () => {
    console.log("click");

    removeCookie("token");
    navigate("/");
  };

  // mobile items in the drawer
  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid container>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            minWidth: "200px",
            textAlign: "right",
            alignItems: " flex-start",
            padding: "1rem",
          }}
          justifyContent={"flex-end"}
          xs={10}
        >
          {/* My listings */}
          {cookie.token !== undefined ? (
            <Link
              href="/newlisting"
              sx={{
                width: "100%",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  paddingY: ".9rem",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                {" "}
                Add listing
              </Button>
            </Link>
          ) : (
            " "
          )}

          {cookie.token !== undefined ? (
            <Link
              href="/myListings"
              width={"100%"}
              sx={{
                textDecoration: "none",
                color: "black",
                marginRight: "1rem",
                width: "auto",
              }}
            >
              {"My listings"}
            </Link>
          ) : (
            ""
          )}

          {cookie.token !== undefined ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                href="/"
                width={"100%"}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  marginRight: "1rem",
                  width: "auto",
                  fontSize: "16px",
                }}
                component="button"
                onClick={signOut}
              >
                {"Sign Out"}
              </Link>
            </div>
          ) : (
            <Link
              href="/signin"
              width={"100%"}
              sx={{
                textDecoration: "none",
                color: "black",
                marginRight: "1rem",
                width: "auto",
              }}
            >
              {"Sign In"}
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        paddingY={2}
        paddingX={2}
      >
        <Grid item xs={2}>
          <Link href="/">
            <img
              src={require("../assets/images/logo.png")}
              width="80"
              style={{ objectFit: "cover" }}
              alt="logo"
            />
          </Link>
          <Link href="/user/0" sx={{ fontSize: "3rem" }}>
            {" "}
            User
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: "1rem",
            textAlign: "right",
            alignItems: " center",
          }}
          justifyContent={"flex-end"}
          xs={10}
        >
          {/* Sign in and out buttons */}
          {cookie.token !== undefined ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "black",
                  marginRight: "1rem",
                  width: "auto",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                component="button"
                onClick={signOut}
              >
                Sign out
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "35px", margin: "0 1.5rem" }}
              />
            </div>
          ) : (
            <Link
              href="/signin"
              width={"100%"}
              sx={{
                textDecoration: "none",
                color: "black",
                marginRight: "1rem",
                width: "auto",
              }}
            >
              {"Sign In"}
            </Link>
          )}

          {/* My listings */}

          {cookie.token !== undefined ? (
            <Link
              href="/mylistings"
              width={"100%"}
              sx={{
                textDecoration: "none",
                color: "black",
                marginRight: "1rem",
                width: "auto",
              }}
            >
              {"My listings"}
            </Link>
          ) : (
            ""
          )}

          {cookie.token !== undefined ? (
            <Link href="/newlisting">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  paddingY: ".9rem",
                  textTransform: "none",
                  maxWidth: "130px",
                }}
              >
                {" "}
                Add listing
              </Button>
            </Link>
          ) : (
            " "
          )}
        </Grid>
        <Grid
          item
          xs={10}
          sx={{ textAlign: "right", display: { xs: "block", sm: "none" } }}
        >
          {(["right"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                {" "}
                <svg viewBox="0 0 100 80" width="30" height="30">
                  <rect width="100" height="5"></rect>
                  <rect y="30" width="100" height="5"></rect>
                  <rect y="60" width="100" height="5"></rect>
                </svg>
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Navbar;
