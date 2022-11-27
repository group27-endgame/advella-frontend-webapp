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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatService from "../services/Chat.service";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/User.service";
import { useCookies } from "react-cookie";
import {
  StompSessionProvider,
  useSubscription,
  useStompClient,
} from "react-stomp-hooks";
import { useRecoilState } from "recoil";
import { chatMessages, chatActiveContact, userList } from "../index";
import { red } from "@mui/material/colors";

import ChatMessage from "../models/ChatMessage.model";
import User from "../models/User.model";

const Chat = () => {
  const [currentUserInChat, setCurrentUserInChat] = useState<User | undefined>(
    undefined
  );

  const userService: UserService = new UserService();
  const { id } = useParams();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    userService.getUserById(id?.toString()!).then((user) => {
      setCurrentUserInChat(user);
    });
  }, []);

  return (
    <div style={{ marginTop: "1rem", height: "calc(100vh - 90px)" }}>
      {/* <SendingMessages /> */}
      {/* left sidebar */}

      {/* right sidebar */}
      <StompSessionProvider
        url={"https://api.advella.popal.dev/ws"}
        debug={(str) => {
          console.log(str);
        }}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}

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
  const [lastMessage, setLastMessage] = useState("No message received yet");
  const [input, setInput] = useState("");
  const chatService: ChatService = new ChatService();
  const userService: UserService = new UserService();
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [users, setUsers] = useRecoilState(userList);
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  // const user: User = new User(
  //   102,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined,
  //   undefined
  // );

  const stompClient = useStompClient();

  useEffect(() => {
    userService.getUserById(id?.toString()!).then((user) => {
      setCurrentUserInChat(user);
    });
  }, []);

  useEffect(() => {
    if (id === undefined) {
      return;
    }

    userService.getCurrentUser(cookie.token).then((resp) => {
      setCurrentUser(resp);
      chatService.findChatMessages(resp?.userId!, Number(id)).then((msgs) => {
        setMessages(msgs);
      });
    });
  }, [id]);

  useSubscription(
    `/user/${currentUserInChat?.userId}/queue/messages`,
    (message) => {
      const notification = JSON.parse(message.body);
      const active = currentUser?.userId;

      console.log(message);

      if (active === notification.senderId) {
        console.log(notification.senderId);
        chatService.findMessage(notification.id).then((response) => {
          const newMessages = JSON.parse(
            sessionStorage.getItem("recoil-persist")!
          ).chatMessages;

          newMessages.push(response);
          setMessages(newMessages);
        });
      } else {
        console.log(" you have a new message from: " + notification.senderName);
      }
    }
  );

  const sendMessage = () => {
    const message: ChatMessage = new ChatMessage(
      input,
      "",
      currentUser,
      currentUserInChat,
      "DELIVERED",
      ""
    );
    if (stompClient && input !== "") {
      //Send Message
      const objDiv = document.querySelector(".chat");
      objDiv!.scrollTop = objDiv!.scrollHeight;
      stompClient.publish({
        destination: "/app/chat",
        headers: {},
        body: JSON.stringify(message),
      });

      // const newMessages = [...messages];
      // newMessages.push(message);
      // setMessages(newMessages);

      setInput("");
    } else {
      console.log("error");
      //Handle error
    }
  };

  const messagesEnd = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Grid container component={Paper} sx={{ width: "100%", height: "100%" }}>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #e0e0e0",
            display: { xs: "none", sm: "block" },
          }}
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
                sx={{ textTransform: "capitalize" }}
                primary={currentUserInChat?.username}
              ></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText
                secondary="online"
                sx={{ textAlign: "right" }}
              ></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={9} sx={{ maxHeight: "80%" }}>
          <List sx={{ overflowY: "auto", height: "100%" }} className="chat">
            {/* my message */}

            {messages.map((msg: any, index: number) => {
              return (
                <ListItem key={index}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "right", fontSize: "10px" }}
                    >
                      <Typography
                        sx={{ fontSize: 12, textTransform: "capitalize" }}
                      >
                        {currentUser?.username}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: "right" }}>
                      <ListItemText
                        className="right-text"
                        primary={msg.chatContent}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{ textAlign: "right" }}
                        secondary="09:30"
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}

            {/*  receipient message */}
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12} sx={{ textAlign: "left", fontSize: "10px" }}>
                  <Typography sx={{ fontSize: 12 }}>Pato</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    sx={{ textAlign: "left" }}
                    className="left-text"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    sx={{ textAlign: "left" }}
                    secondary="09:31"
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>

          {/* bottom for sending message className="chat-bar" */}
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
              <Fab color="primary" aria-label="add" onClick={sendMessage}>
                <SendIcon />
              </Fab>
            </Grid>{" "}
            {/* <Subscribing /> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
