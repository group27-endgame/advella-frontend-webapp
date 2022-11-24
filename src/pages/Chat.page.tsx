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
import { useRecoilValue, useRecoilState } from "recoil";
import { chatMessages, chatActiveContact, userList } from "../index";
import { red } from "@mui/material/colors";

import ChatMessage from "../models/ChatMessage.model";
import User from "../models/User.model";

const Chat = () => {
  const [cookie] = useCookies(["token"]);
  const [currentUserInChat, setCurrentUserInChat] = useState<User | undefined>(
    undefined
  );

  const chatService: ChatService = new ChatService();
  const userService: UserService = new UserService();
  const { id } = useParams();
  const [currentUser, setCurrentuser] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [user, setUser] = useState("");

  useEffect(() => {
    userService.getUserById(id?.toString()!).then((user) => {
      setCurrentUserInChat(user);
    });
  }, []);

  return (
    <div style={{}}>
      {/* <SendingMessages /> */}
      {/* left sidebar */}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
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
        onChangeState={(e) => {
          console.log(e);
        }}

        //All options supported by @stomp/stompjs can be used here
      >
        <Grid container component={Paper} sx={{ width: "100%" }}>
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
                  <Avatar alt="Remy Sharp" sx={{ bgcolor: red[500] }}>
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
          <Grid item xs={12} sm={9}>
            <List sx={{ overflowY: "auto", height: "calc(100vh - 116px )" }}>
              {/* my message */}
              <ListItem key="1">
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{ textAlign: "right", fontSize: "10px" }}
                  >
                    <Typography sx={{ fontSize: 12 }}>Pato</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <ListItemText primary="Hey man, What's up ?"></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      sx={{ textAlign: "right" }}
                      secondary="09:30"
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              {/*  receipient message */}
              <ListItem key="2">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      sx={{ textAlign: "left" }}
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
            <Divider />

            {/* bottom for sending message */}
            <Grid container style={{ padding: "20px" }} className="chat-bar">
              <Grid item>
                <Typography variant={"body1"}>
                  Last Message received: {}
                </Typography>
              </Grid>
              <SendingMessages />
              {/* <Subscribing /> */}
            </Grid>
          </Grid>
        </Grid>
      </StompSessionProvider>
    </div>
  );
};

export default Chat;

export function SendingMessages() {
  const { id } = useParams();
  const [cookie] = useCookies(["token"]);

  const [lastMessage, setLastMessage] = useState("No message received yet");
  const [input, setInput] = useState("");
  const chatService: ChatService = new ChatService();
  const userService: UserService = new UserService();
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [users, setUsers] = useRecoilState(userList);
  const [contacts, setContacts] = useState([]);
  const [sender, setSender] = useState<User | undefined>(undefined);

  const user: User = new User(
    102,
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

  //Get Instance of StompClient
  //This is the StompCLient from @stomp/stompjs
  //Note: This will be undefined if the client is currently not connected
  const stompClient = useStompClient();

  // const loadContacts = userService.then((users) =>
  // users.map((contact) =>
  //   countNewMessages(contact.id, currentUser.id).then((count) => {
  //     contact.newMessages = count;
  //     return contact;
  //   })
  // )

  useEffect(() => {
    if (id === undefined) {
      return;
    }

    userService.getCurrentUser(cookie.token).then((resp) => {
      setSender(user);
      chatService.findChatMessages(user?.userId!, Number(id)).then((msgs) => {
        setMessages(msgs);
      });
    });
  }, [id]);

  useSubscription(`/user/${user.userId}/queue/messages`, (message) => {
    const notification = JSON.parse(message.body);
    const active = user.userId;

    if (active === notification.senderId) {
      chatService.findMessage(notification.id).then((response) => {
        const newMessages = JSON.parse(
          sessionStorage.getItem("recoil-persist")!
        ).chatMessages;

        console.log(response);

        newMessages.push(response);
        setMessages(newMessages);
      });
    } else {
      console.log(" you have a new message from: " + notification.senderName);
    }
  });

  const sendMessage = () => {
    const message: ChatMessage = new ChatMessage(
      input,
      "",
      sender,
      sender,
      "DELIVERED",
      ""
    );
    if (stompClient && input !== "") {
      //Send Message

      stompClient.publish({
        destination: "/app/chat",
        headers: {},
        body: JSON.stringify(message),
      });

      setInput("");
    } else {
      console.log("error");
      //Handle error
    }
  };

  return (
    <>
      <Grid item xs={10} sm={11}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </Grid>
      <Grid xs={2} sm={1} sx={{ textAlign: "right" }}>
        <Fab color="primary" aria-label="add" onClick={sendMessage}>
          <SendIcon />
        </Fab>
      </Grid>
      <Grid> {lastMessage}</Grid>
    </>
  );
}
