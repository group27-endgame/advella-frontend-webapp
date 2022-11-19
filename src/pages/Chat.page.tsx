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
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

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

  function SubscribingComponent() {
    const [lastMessage, setLastMessage] = useState("No message received yet");

    //Subscribe to /topic/test, and use handler for all received messages
    //Note that all subscriptions made through the library are automatically removed when their owning component gets unmounted.
    //If the STOMP connection itself is lost they are however restored on reconnect.
    //You can also supply an array as the first parameter, which will subscribe to all destinations in the array
    useSubscription(`/user/${id}/queue/messages`, (message: any) =>
      setLastMessage(message.body)
    );

    return <div>Last Message: {lastMessage}</div>;
  }

  return (
    <div style={{}}>
      <StompSessionProvider
        url={"https://api.advella.popal.dev/ws"}
        debug={(str) => {
          console.log(str);
        }}
        //All options supported by @stomp/stompjs can be used here
      >
        <SubscribingComponent />
      </StompSessionProvider>{" "}
      {/* left sidebar */}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
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
            <Grid item xs={10} sm={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={2} sm={1} sx={{ textAlign: "right" }}>
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
