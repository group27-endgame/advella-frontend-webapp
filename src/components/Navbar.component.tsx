import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

function Navbar() {
  const isLoggedIn = false;

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
        <Grid item xs={1}>
          <Link href="/">
            <img
              src={require("../assets/images/logo.png")}
              width="80"
              style={{ objectFit: "cover" }}
            />
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            gap: "1rem",
            textAlign: "right",
            alignItems: " center",
          }}
          justifyContent={"flex-end"}
          xs={11}
        >
          {/* Sign in and out buttons */}
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                href="#"
                width={"100%"}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  marginRight: "1rem",
                  width: "auto",
                }}
              >
                {"Sign Out"}
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

          {isLoggedIn ? (
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

          {isLoggedIn ? (
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
              New listing
            </Button>
          ) : (
            " "
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Navbar;
