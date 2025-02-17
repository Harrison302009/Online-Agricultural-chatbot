"use client";
import { Mice } from "@/components/mice/mouse";
import { NavBar } from "@/components/navbar/navbar";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../../app/globalicons.css";
import { faCheck, faUserAlt, faX } from "@fortawesome/free-solid-svg-icons";
import {
  PointBack,
  PointOut,
  TextBack,
  TextOut,
} from "@/components/mousecontrols/mousecontrol";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { GetAllChatMessagesResponse } from "../../api/chat/route";
import { useState } from "react";

export default function EditUserProfile() {
  const router = useRouter();
  const session = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const [messages, setMessages] = useState<
    GetAllChatMessagesResponse["messages"]
  >([]);
  const { data: databaseChatMessages } = useAllChatMessages();
  const uniqueEmails = session.data?.user?.email;
  const doneCustomizing = () => {
    router.back();
  };
  function LoadingIndicator({ timer }: { timer: number }) {
    return (
      <Backdrop
        sx={(theme) => ({ color: "warning", zIndex: theme.zIndex.drawer + 1 })}
        open={submitting}
      >
        <CircularProgress color="warning" />
      </Backdrop>
    );
  }
  function Submitted() {
    return (
      <Backdrop
        sx={(theme) => ({ color: "success", zIndex: theme.zIndex.drawer + 1 })}
        open={submitted}
      >
        <FontAwesomeIcon
          icon={faCheck}
          color="green"
          style={{ fontSize: 100 }}
        />
        <Typography
          variant="h3"
          sx={{ fontFamily: "'Oswald', sans-serif", fontStyle: "italic" }}
        >
          User Profile Updated!
        </Typography>
      </Backdrop>
    );
  }
  return (
    <Box>
      <Stack
        style={{
          backgroundImage: "url('/settings.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          cursor: "none",
        }}
        onMouseOver={(e) => {
          var mouse = document.getElementById("mouse") as HTMLElement;
          var pointer = document.getElementById("pointer") as HTMLElement;
          window.addEventListener("mousemove", (t) => {
            mouse!.style.top = `${t.clientY}px`;
            mouse!.style.left = `${t.clientX}px`;
            pointer!.style.top = `${t.clientY}px`;
            pointer!.style.left = `${t.clientX}px`;
          });
        }}
      >
        <Mice />
        <Stack id="entpage">
          <LoadingIndicator timer={5} />
          <Submitted />
          <Stack id="leftPage">
            <Typography variant="h3" sx={{ fontStyle: "italic" }}>
              Settings
            </Typography>
            <br />
            <ListItem>
              <ListItemButton
                sx={{
                  color: "black",
                  cursor: "none",
                  ":hover": {
                    transform: "translateY(-2px) scale(1.1)",
                  },
                }}
                onMouseOver={PointOut}
                onMouseOut={PointBack}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUserAlt} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">User Profile</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Stack>
          <Stack id="rightPage">
            <Stack id="profileDisplay">
              <Typography variant="h2" id="userDisplay">
                User profile
              </Typography>
              <br />
              <form
                onSubmit={async (l) => {
                  l.preventDefault();
                  const response = await fetch("/api/settings", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false);
                    setSubmitted(true);
                  }, 6400);
                  setTimeout(() => {
                    setSubmitted(false);
                    window.location.href = "/settings";
                  }, 8000);
                }}
                style={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <TextField
                  label="Name"
                  id="name"
                  sx={{ cursor: "none" }}
                  fullWidth
                  onMouseOver={(l) => {
                    var fname = document.getElementById(
                      "name",
                    ) as HTMLInputElement;
                    var cursor = document.getElementById(
                      "mouse",
                    ) as HTMLImageElement;
                    cursor.srcset = "/text-cursor.png";
                    fname.style.cursor = "none";
                  }}
                  onMouseOut={TextBack}
                  value={values.name}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                />
                <br />
                <TextField
                  id="email"
                  fullWidth
                  aria-readonly
                  onMouseOver={(l) => {
                    var fname = document.getElementById(
                      "email",
                    ) as HTMLInputElement;
                    var cursor = document.getElementById(
                      "mouse",
                    ) as HTMLImageElement;
                    cursor.srcset = "/text-cursor.png";
                    fname.style.cursor = "none";
                  }}
                  onMouseOut={TextBack}
                  value={uniqueEmails}
                />
                <br />
                <TextField
                  id="address"
                  fullWidth
                  aria-readonly
                  onMouseOver={(l) => {
                    var fname = document.getElementById(
                      "address",
                    ) as HTMLInputElement;
                    var cursor = document.getElementById(
                      "mouse",
                    ) as HTMLImageElement;
                    cursor.srcset = "/text-cursor.png";
                    fname.style.cursor = "none";
                  }}
                  onMouseOut={TextBack}
                  value={session.data?.user.address}
                />
                <Button
                  variant="outlined"
                  type="submit"
                  fullWidth
                  id="editProfile"
                  sx={{ borderColor: "bisque" }}
                  onMouseOver={PointOut}
                  onMouseOut={PointBack}
                >
                  Update Profile
                </Button>
              </form>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
