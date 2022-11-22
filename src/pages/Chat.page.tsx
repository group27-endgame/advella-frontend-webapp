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

const Chat = () => {
  const [cookie] = useCookies(["token"]);

  const chatService: ChatService = new ChatService();
  const userService: UserService = new UserService();
  const { id } = useParams();
  const [currentUser, setCurrentuser] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [user, setUser] = useState("");

  // useEffect(() => {
  //   userService.getCurrentUser(cookie.token).then((user) => {
  //     setCurrentuser(user?.userId!);
  //     chatService.findChatMessages(user?.userId!, Number(id)).then((chat) => {
  //       // console.log(chat);
  //     });
  //   });
  // }, []);

  let clientRef = useRef(null);

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
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="John Wick"></ListItemText>
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
              <Subscribing />
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

  const [lastMessage, setLastMessage] = useState("No message received yet");
  const [input, setInput] = useState("");

  //Get Instance of StompClient
  //This is the StompCLient from @stomp/stompjs
  //Note: This will be undefined if the client is currently not connected
  const stompClient = useStompClient();

  useSubscription(`/user/${id}/queue/messages`, (message) =>
    setLastMessage(message.body)
  );

  const sendMessage = () => {
    if (stompClient && input !== "") {
      //Send Message

      stompClient.publish({
        destination: "/app/chat",
        body: "Echo " + JSON.stringify(input),
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

export function Subscribing() {
  const [lastMessage, setLastMessage] = useState("No message received yet");
  const { id } = useParams();

  //Subscribe to /topic/test, and use handler for all received messages
  //Note that all subscriptions made through the library are automatically removed when their owning component gets unmounted.
  //If the STOMP connection itself is lost they are however restored on reconnect.
  //You can also supply an array as the first parameter, which will subscribe to all destinations in the array
  useSubscription(
    `/user/${id}/queue/messages`,
    (message) => console.log(message.body)
    //setLastMessage(message.body)
  );

  return <Box>Last Message: {lastMessage}</Box>;
}
