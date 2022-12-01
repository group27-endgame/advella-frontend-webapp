import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
  TextField,
  Fab,
  Button,
  Box,
  Drawer,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatService from "../services/Chat.service";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/User.service";
import { useCookies } from "react-cookie";
import CloseIcon from "@mui/icons-material/Close";
import {
  StompSessionProvider,
  useSubscription,
  useStompClient,
} from "react-stomp-hooks";
import { useRecoilState } from "recoil";
import { chatMessages } from "../index";
import { red } from "@mui/material/colors";

import ChatMessage from "../models/ChatMessage.model";
import User from "../models/User.model";
import ChatRoom from "../models/ChatRoom.model";
import Link from "@mui/material/Link";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";

const Chat = () => {
  const [currentUserInChat, setCurrentUserInChat] = useState<User | undefined>(
    undefined
  );

  const userService: UserService = new UserService();
  const { id } = useParams();

  useEffect(() => {
    userService.getUserById(id?.toString()!).then((user) => {
      setCurrentUserInChat(user);
      document.title = "Advella - chat with " + user?.username;
    });
  }, []);
  return (
    <div>
      <StompSessionProvider
        url={"https://api.advella.popal.dev/ws"}

        //All options supported by @stomp/stompjs can be used here
      >
        <SendingMessages />
      </StompSessionProvider>
    </div>
  );
};

export default Chat;

export function SendingMessages() {
  const { id } = useParams();
  const [cookie] = useCookies(["token"]);
  const [currentUserInChat, setCurrentUserInChat] = useState<User | undefined>(
    undefined
  );
  const [input, setInput] = useState("");
  const chatService: ChatService = new ChatService();
  const userService: UserService = new UserService();
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [contacts, setContacts] = useState<ChatRoom[] | undefined>(undefined);
  const [contactsCopy, setContactsCopy] = useState<ChatRoom[] | undefined>(
    undefined
  );
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [active, setActive] = useState<User | undefined>(undefined);
  const [myName, setMyName] = useState("");

  const [newNotification, setNewNotification] = useState(false);
  const [senderName, setSenderName] = useState("");

  const stompClient = useStompClient();

  const createUser = (userId: number) => {
    const user: User = new User(
      userId,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );

    return user;
  };

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const height = window.innerHeight - 250;
    setHeight(height);

    const handleResize = () => {
      const resized = window.innerHeight - 250;

      setHeight(resized);
    };

    userService.getUserById(id?.toString()!).then((user) => {
      setCurrentUserInChat(user);
      setActive(createUser(user?.userId!));
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ROOT_CSS = css({
    height: height,
  });

  const arraySearch = (array: any, keyword: any) => {
    const searchTerm = keyword.toLowerCase();
    return array.filter((value: any) => {
      return value.chatRecipient.username
        .toLowerCase()
        .match(new RegExp(searchTerm, "g"));
    });
  };

  const handleOnChange = async (e: any) => {
    let value = e.target.value;
    if (value.length > 0) {
      let search = await arraySearch(contacts, value);
      setContacts(search);
    } else {
      setContacts(contactsCopy);
    }
  };

  const [search] = useState("");

  useEffect(() => {
    document!.querySelector("footer")!.style.display = "none";

    userService.getCurrentUser(cookie.token).then((resp) => {
      setCurrentUser(createUser(resp?.userId!));

      chatService.getUsersChatRoom(resp?.userId!).then((us) => {
        setContacts(us);
        setContactsCopy(us);
      });
      setMyName(resp?.username!);

      chatService.findChatMessages(resp?.userId!, Number(id)).then((first) => {
        const array1 = Array.from(first!);
        chatService
          .findChatMessages(Number(id), resp?.userId!)
          .then((second) => {
            const array2 = Array.from(second!);
            const temporary = [...array1, ...array2];
            temporary.sort((a, b) => {
              if (a?.sentTime! > b?.sentTime!) return 1;
              if (a?.sentTime! < b?.sentTime!) return -1;
              return 0;
            });

            setMessages(temporary);
          });
      });
    });
  }, [id, search]);

  useSubscription(`/user/${currentUser?.userId}/queue/messages`, (message) => {
    const notification = JSON.parse(message.body);
    if (active?.userId === notification.senderId) {
      chatService.findMessage(notification.id).then((response) => {
        const newMessages = JSON.parse(
          sessionStorage.getItem("recoil-persist")!
        ).chatMessages;

        newMessages.push(response);
        setMessages(newMessages);
      });
    } else {
      setNewNotification(true);
      setSenderName(notification.senderName);
      console.log(" you have a new message from: " + notification.senderName);
    }
  });

  const sendMessage = () => {
    const message: ChatMessage = new ChatMessage(
      input,
      "",
      currentUser,
      createUser(currentUserInChat?.userId!),
      "DELIVERED",
      "",
      Date.now().toString()
    );

    if (stompClient && input !== "") {
      //Send Message

      stompClient.publish({
        destination: "/app/chat",
        headers: {},
        body: JSON.stringify(message),
      });

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);

      setInput("");
    } else {
      console.log("error");
      //Handle error
    }
  };

  const convertTimestamp = (timestamp: number) => {
    let h = new Date(Number(timestamp)).getHours().toString();
    let m = new Date(Number(timestamp)).getMinutes().toString();

    return h + ":" + `${Number(m) < 10 ? "0" + m : m}`;
  };
  type Anchor = "left";

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState({
    left: false,
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
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

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      sx={{
        paddingTop: 5,
        paddingX: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CloseIcon
        sx={{ marginLeft: "auto", mb: 2 }}
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      />

      <Typography fontWeight={"bold"} fontSize={24} pb={2}>
        Chat
      </Typography>
      <TextField
        id="outlined-basic-email"
        label="Search contacts"
        variant="outlined"
        fullWidth
        onChange={handleOnChange}
        sx={{ paddingBottom: 2 }}
      />
      <div>
        {contacts?.map((item, index) => {
          return (
            <ListItem
              button
              key={item.chatId}
              sx={{
                display:
                  item.chatRecipient.userId === currentUserInChat?.userId
                    ? "none"
                    : "",

                paddingLeft: 0,
              }}
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <Link
                href={`/chat/${item.chatRecipient.userId}`}
                className="link"
              >
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    sx={{ bgcolor: red[500], textTransform: "capitalize" }}
                  >
                    {" "}
                    {item?.chatRecipient?.username?.charAt(0)}
                  </Avatar>
                </ListItemIcon>

                <ListItemText
                  primary={item?.chatRecipient?.username}
                ></ListItemText>
              </Link>
            </ListItem>
          );
        })}
      </div>
    </Box>
  );

  return (
    <>
      <Grid
        container
        component={Paper}
        sx={{ width: "100%", height: "100%", position: "relative" }}
      >
        {/* mobile bar */}
        <Grid
          xs={12}
          sm={0}
          sx={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            display: { xs: "block", sm: "none" },
          }}
        >
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft: 2,
              borderBottom: "1px solid #f9f9f9",
              zIndex: 20,
            }}
          >
            {(["left"] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  {" "}
                  <KeyboardBackspaceIcon sx={{ color: "black" }} />
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

            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ bgcolor: red[500], textTransform: "capitalize" }}
                >
                  {" "}
                  {currentUserInChat?.username?.charAt(0)}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={currentUserInChat?.username}
              ></ListItemText>
            </ListItem>
          </List>
        </Grid>
        {/* leftbar */}
        <Grid
          item
          xs={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          className="left-bar"
        >
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ bgcolor: red[500], textTransform: "capitalize" }}
                >
                  {" "}
                  {currentUserInChat?.username?.charAt(0)}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={currentUserInChat?.username}
              ></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search contacts"
              variant="outlined"
              fullWidth
              onChange={handleOnChange}
            />
          </Grid>
          <Divider />
          <div>
            {contacts?.map((item, index) => {
              return (
                <ListItem
                  button
                  key={item.chatId}
                  sx={{
                    display:
                      item.chatRecipient.userId === currentUserInChat?.userId
                        ? "none"
                        : "",
                  }}
                >
                  <Link
                    href={`/chat/${item.chatRecipient.userId}`}
                    className="link"
                    sx={{ display: "flex" }}
                  >
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ bgcolor: red[500], textTransform: "capitalize" }}
                      >
                        {" "}
                        {item?.chatRecipient?.username?.charAt(0)}
                      </Avatar>
                    </ListItemIcon>

                    <ListItemText
                      primary={item?.chatRecipient?.username}
                    ></ListItemText>
                    <ListItemIcon
                      sx={{
                        marginLeft: "auto",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "999px",
                          width: 10,
                          height: 10,
                          background: "#1876D2",

                          display:
                            newNotification &&
                            item.chatRecipient.username === senderName
                              ? "block"
                              : "none",
                        }}
                      ></Box>
                    </ListItemIcon>
                  </Link>
                </ListItem>
              );
            })}
          </div>
        </Grid>
        {/* chat */}
        <Grid
          item
          xs={12}
          sm={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid #e0e0e0",
            maxHeight: "100%",
            minHeight: {
              xs: "calc(100vh - 75px)",
              sm: "calc(100vh - 87px)",
            },
          }}
        >
          <List
            sx={{
              overflowY: "auto",
              height: "100%",
              paddingTop: { xs: "100px", sm: 0 },
            }}
            className="chat"
          >
            {/* my message */}
            <ScrollToBottom
              className={ROOT_CSS}
              initialScrollBehavior="auto"
              followButtonClassName="dont-display"
            >
              {messages.map((msg: any, index: number) => {
                return (
                  <ListItem key={index}>
                    {msg.chatId !==
                    `${currentUserInChat?.userId}_${currentUser?.userId}` ? (
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sx={{ textAlign: "right", fontSize: "10px" }}
                        >
                          <Typography sx={{ fontSize: 12 }}>
                            {" "}
                            {myName}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ marginLeft: "auto" }}>
                          <ListItemText
                            className="right-text"
                            primary={msg.chatContent}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            sx={{ textAlign: "right", fontSize: 12 }}
                            secondary={convertTimestamp(msg.sentTime)}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sx={{ textAlign: "left", fontSize: "10px" }}
                        >
                          <Typography sx={{ fontSize: 12 }}>
                            {" "}
                            {currentUserInChat?.username}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <ListItemText
                            sx={{ textAlign: "left" }}
                            className="left-text"
                            primary={msg.chatContent}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            sx={{ textAlign: "left" }}
                            secondary={convertTimestamp(msg.sentTime)}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    )}
                  </ListItem>
                );
              })}
            </ScrollToBottom>
          </List>
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={10} sm={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={input}
                onKeyDown={(e: any) =>
                  e.keyCode === 13 ? sendMessage() : null
                }
                onChange={(event) => setInput(event.target.value)}
              />
            </Grid>
            <Grid xs={2} sm={1} sx={{ textAlign: "right" }}>
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                  sendMessage();
                }}
              >
                <SendIcon />
              </Fab>
            </Grid>{" "}
          </Grid>

          {/* bottom for sending message className="chat-bar" */}
        </Grid>
      </Grid>
    </>
  );
}
