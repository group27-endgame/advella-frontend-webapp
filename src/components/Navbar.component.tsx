import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import React, { useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import UserService from "../services/User.service";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoginIcon from "@mui/icons-material/Login";
import ChatIcon from "@mui/icons-material/Chat";
type Anchor = "right";
function Navbar() {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["token"]);
  const [state, setState] = React.useState({
    right: false,
  });
  const [id, setId] = useState<number | null>(null);

  const userService: UserService = new UserService();

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
    removeCookie("token", { path: "/" });

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
              href={`user/${id}`}
              width={"100%"}
              sx={{
                textDecoration: "none",
                color: "black",
                marginRight: "1rem",
                width: "auto",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccountBoxIcon />
              {"My profile"}
            </Link>
          ) : (
            ""
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
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ListAltIcon />
              {"My listings"}
            </Link>
          ) : (
            ""
          )}

          {cookie.token !== undefined && chat !== undefined ? (
            <Link
              href={`/chat/${chat}`}
              sx={{
                textDecoration: "none",
                color: "black",
                alignItems: "center",
                gap: 1,
                display: chat !== undefined ? "flex" : "none",
              }}
            >
              <ChatIcon />
              Chat
            </Link>
          ) : (
            ""
          )}

          {cookie.token !== undefined ? (
            <div style={{ width: "100%" }}>
              <Divider sx={{ width: "100%", my: 2 }} />
              <Link
                href="/"
                width={"100%"}
                sx={{
                  textDecoration: "none",
                  color: "black",
                  marginRight: "1rem",
                  width: "auto",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
                component="button"
                onClick={signOut}
              >
                {"Sign Out"}
              </Link>
            </div>
          ) : (
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                paddingY: ".9rem",
                textTransform: "none",
              }}
            >
              <Link
                href="/signin"
                width={"100%"}
                sx={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <LoginIcon />
                {"Sign In"}
              </Link>
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const [chat, setChat] = useState("");

  const [easterEgg, setEasterEgg] = useState(true);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (easterEgg) {
      setEasterEgg(false);
      console.log(`
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⢉⠉⠉⢉⣉⣩⣉⢉⡉⠉⡉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⡟⣿⣿⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣸⣿⣇⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣻⣿⡄⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⡿⠍⠙⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⣱⣾⠟⠀⢠⠉⠉⠉⠻⣿⣿⡇⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⣿⣿⣿⣿⣿⡿⠛⣡⣶⣿⣧⣤⠸⡟⠂⠀⠀⠀⢹⣿⡇⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⠇⠀⢈⣥⣿⣿⣿⣿⣿⣷⣆⢰⣆⠀⢸⡏⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣏⣿⡏⠀⣾⣾⣿⣿⣿⣿⣿⣿⣿⣿⢻⣿⣷⣾⡃⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣷⡄⠘⠹⢿⣿⣍⠉⢛⣿⣿⣿⠸⣿⣿⠿⠁⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⢿⣿⣿⣿⣿⣦⣀⣿⣿⣿⣶⣾⣿⣿⣿⡇⠁⠈⡄⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⢺⣿⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⡺⠁⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⢸⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣏⣻⡶⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠀⣿⡏⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣬⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⣀⣀⣤⣤⣤⣤⣀⣀⣠⣤⣤⣶⣶⣿⣿⡛⠻⠿⣿⡿⠛⠁⢰⣿⣿⠃⢘⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⣩⣿⣿⡿⠿⣻⣿⣿⣿⣿⣿⣿⣅⠄⢉⣙⣿⣿⡟⠀⠀⠀⠘⣿⡇⠀⠀⣿⣦⣿⣿⣿⣿⣿⣿⣿⣟⣻⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠟⠋⢱⣦⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⣸⠀⡇⢠⣿⣧⠀⢠⣿⡿⢿⠿⠋⠙⠛⠛⠛⠛⠋⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⣶⠶⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⠏⣸⣿⣿⣿⣧⠀⠀⠀⣷⠸⣿⠃⣴⣿⡟⠙⠁⠀⠀⠀⠀⠀⣾⣄⣀⡀⠉⠢⣀⠀⠀⠀⠀⠀⠀⠀⠀
      ⡇⠀⢉⣹⣾⣿⣿⣿⣿⣿⣿⣿⣶⣬⣿⣿⣿⣿⣦⡄⣀⡿⠀⣿⣿⣇⠹⣷⣤⣾⠇⠀⠀⠀⣰⣿⣿⣿⣿⣆⠀⠈⠳⡀⠀⠀⠀⠀⠀⠀
      ⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢰⣿⣿⡿⢶⣿⣿⡟⢀⣤⠀⣰⣿⣿⣿⣿⡿⣭⣷⣄⡀⠘⢄⠀⠀⠀⠀⠀
      ⣠⣾⣿⣿⢋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⣼⣿⣿⣧⣾⣿⢿⡷⠟⠉⠀⠹⠟⠛⢉⠁⡀⠈⠉⠉⠑⢦⡈⠳⡀⠀⠀⠀
      ⡏⠀⠘⣳⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠙⢿⣿⣿⣿⣿⠉⠀⢀⡉⡦⠄⠀⠀⠀⠀⣿⠀⠠⠄⠀⠀⠀⠀⠑⠠⠉⠒⢄⡀
      ⣷⡆⢸⡯⠤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢘⣿⣿⢋⠍⢿⣶⣽⣿⡿⢿⡄⠀⠀⣸⡯⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙
      ⣿⣿⣄⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣾⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣷⣶⣾⣿⣤⣷⣶⣄⣰⣤⣀⣀⣀⣀⣀⣀⣀⣀

      If you found this you're a true CHAD                                        
     `);
    }
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    userService.getCurrentUser(cookie.token).then((response) => {
      if (response !== undefined) {
        setId(response?.userId!);
      }

      if (response?.receivedChatRoom !== undefined) {
        const firstItem = response.receivedChatRoom;
        if (Array.isArray(firstItem)) {
          let chat = firstItem.filter((res) => res.chatId);
          // console.log(chat?.[0]?.chatId.length);
          const item =
            chat?.[0]?.chatId.length >= 7
              ? chat?.[0]?.chatId?.slice(0, 3)
              : chat?.[0]?.chatId?.slice(0, 2);

          setChat(item);
        }
        // firstItem.filter(element => element!==undefined).shift();
      }
    });

    prevOpen.current = open;
  }, [open]);

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
        paddingX={2}
        position={"sticky"}
        sx={{
          top: 0,
          zIndex: 999,
          backgroundColor: "white",
          paddingY: { xs: 1, sm: 2 },
        }}
      >
        <Grid item xs={2}>
          <Link href="/">
            <img
              src={require("../assets/images/logo.png")}
              width="60"
              style={{ objectFit: "cover" }}
              alt="logo"
            />
          </Link>
          {/* <Link href="/chat/1" sx={{ fontSize: "4rem" }}>
            chat
          </Link> */}
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
            ""
          ) : (
            <Link
              href="/signin"
              width={"100%"}
              sx={{
                textDecoration: "none",
                color: "black",
                marginRight: "1rem",
                width: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <LoginIcon />
              {"Sign In"}
            </Link>
          )}

          {/* My listings */}

          {cookie.token !== undefined ? (
            <div>
              <Button
                startIcon={<DashboardIcon />}
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                sx={{ color: "black" }}
              >
                Dashboard
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem>
                            <Link
                              href={`/user/${id}`}
                              sx={{
                                textDecoration: "none",
                                color: "black",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <AccountBoxIcon /> My profile
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <Link
                              href="/mylistings"
                              sx={{
                                textDecoration: "none",
                                color: "black",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <ListAltIcon />
                              My listings
                            </Link>
                          </MenuItem>

                          {chat !== undefined ? (
                            <MenuItem>
                              <Link
                                href={`/chat/${chat}`}
                                sx={{
                                  textDecoration: "none",
                                  color: "black",
                                  alignItems: "center",
                                  gap: 1,
                                  display: "flex",
                                }}
                              >
                                <ChatIcon />
                                Chat
                              </Link>
                            </MenuItem>
                          ) : (
                            ""
                          )}

                          <MenuItem>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                            </div>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
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
