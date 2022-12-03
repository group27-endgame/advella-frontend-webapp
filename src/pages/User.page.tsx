import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import UserService from "../services/User.service";
import UserModel from "../models/User.model";
import { useParams } from "react-router-dom";

export default function User() {
  let navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [userName, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<UserModel | undefined>();
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const { id } = useParams();

  useEffect(() => {
    userService.getUserById(id!).then((resp) => {
      setUser(resp);
      setDescription(resp?.description!);
    });

    userService.getCurrentUser(cookie.token).then((resp) => {
      setCurrentUser(resp);
    });
  }, []);

  const userService: UserService = new UserService();

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "5rem" }}>
        {user !== undefined ? (
          <div>
            <Paper
              elevation={3}
              sx={{ maxWidth: "700px", margin: "auto", padding: 5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: "0.5rem", sm: "0rem" },
                  justifyContent: "center",
                  maxWidth: "700px",
                  margin: "auto",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#E67A35",
                    color: "#fff",
                    textTransform: "upperCase",
                  }}
                >
                  {" "}
                  {user?.username!.charAt(0)}
                </Avatar>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: { sm: "1rem" },
                    fontSize: "1.5rem",
                    textAlign: { xs: "center", sm: "left" },
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Typography fontSize={20} className="userName">
                    {user?.username}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: { sm: "auto" },
                    gap: "1rem",
                  }}
                >
                  {cookie.token === undefined ||
                  user.userId == currentUser?.userId ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        marginLeft: { sm: "auto" },
                        textTransform: "capitalize",
                        color: "white",
                      }}
                    >
                      {}
                      <Link
                        href={`/chat/${id}`}
                        sx={{
                          marginLeft: { sm: "auto" },
                          textTransform: "capitalize",
                          color: "white",
                          textDecoration: "none",
                        }}
                      >
                        Message
                      </Link>
                    </Button>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: "0.5rem", sm: "0rem" },
                  maxWidth: "700px",
                  margin: "auto",
                  textAlign: "left",
                  mt: 4,
                }}
              >
                {" "}
                <Typography sx={{ ml: { sm: 7 } }}> {description}</Typography>
              </Box>
            </Paper>
          </div>
        ) : (
          <Container
            maxWidth="xl"
            sx={{ marginTop: "5rem", textAlign: "center" }}
          >
            User not found
          </Container>
        )}
      </Container>
    </>
  );
}
