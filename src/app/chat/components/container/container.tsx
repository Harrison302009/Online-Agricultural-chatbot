"use client";

import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { DeleteOutline, EmojiEmotionsRounded, Send } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import { GetAllChatMessagesResponse } from "@/app/api/chat/route";
import { MenuBar } from "@/components/menubar/menubar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { CssVarsProvider, ListItemButton } from "@mui/joy";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: "mt1",
});

export default function Container() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<
    GetAllChatMessagesResponse["messages"]
  >([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [emojipopup, setEmojipopup] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null); // Track who is typing
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { data: dbMessages, mutate: refetchMessages } = useAllChatMessages();

  useEffect(() => {
    const channel = pusher.subscribe("chat");
    channel.bind(
      "message",
      (data: GetAllChatMessagesResponse["messages"][number]) => {
        console.log("@@ New message received: ", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        if (session && data.ownerId !== session.user.id) {
          if (Notification.permission === "granted") {
            if (navigator.serviceWorker && navigator.serviceWorker.ready) {
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(
                  `${data.owner?.name} sent you a message`,
                  {
                    body: `${data.message}`,
                    icon: "/chat-user.jpg",
                    data: { url: "/chat" },
                    badge: "/Samp.png",
                    requireInteraction: true,
                  }
                );
              });
            }
          }
        }
      }
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session?.user?.email, session]);

  useEffect(() => {
    const alternate = pusher.subscribe("presence-channel");
    alternate.bind("typing", (data: any) => {
      // Access the 'name' and 'email' from the server-side trigger
      console.log("Name:", data.name);
      console.log("Email:", data.email);
    });
    return () => {
      alternate.unbind_all();
      alternate.unsubscribe();
    };
  }, [session?.user.email]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, email: session?.user?.email }),
    });
    setInput("");
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            top: "2%",
            left: "2%",
            justifyContent: "space-between",
          }}
        >
          <CssVarsProvider>
            <ListItemButton
              sx={{
                height: 30,
                width: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
              onClick={handleOpen}
            >
              <FontAwesomeIcon icon={faBars} style={{ fontSize: 20 }} />
            </ListItemButton>
          </CssVarsProvider>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <MenuBar />
          </Drawer>
        </Stack>
        <br />
        <hr />
        <br />
        <Box
          ref={chatContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[...(dbMessages || []), ...messages].map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf:
                  msg.ownerId === session?.user?.id ? "flex-end" : "flex-start",
                backgroundColor:
                  msg.ownerId === session?.user?.id ? "#e3f2fd" : "#94f787",
                borderRadius: 2,
                padding: 2,
                maxWidth: "70%",
                boxShadow: 1,
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  gap: 0.3,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {msg.owner?.name || "Anonymous"}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                  {new Date(msg.createdAt).toLocaleDateString() ===
                  new Date().toLocaleDateString()
                    ? new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                </Typography>
                {msg.ownerId === session?.user?.id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => refetchMessages()}
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                )}
              </Stack>
              <Typography variant="body1">{msg.message}</Typography>
            </Box>
          ))}
        </Box>
        {typingUser && (
          <Typography
            sx={{
              textAlign: "center",
              fontStyle: "italic",
              color: "gray",
              marginBottom: 1,
            }}
          >
            {typingUser} is typing...
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#fff",
            boxShadow: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={input}
            onChange={(e) => {
              setInput(
                e.target.value.replace(/:\)/g, "😀").replace(/:\(/g, "😟")
              );
            }}
            InputProps={{
              endAdornment: (
                <EmojiEmotionsRounded
                  sx={{ cursor: "pointer", marginRight: 1 }}
                  onClick={() => setEmojipopup(!emojipopup)}
                />
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            <Send />
          </Button>
        </Box>
        {emojipopup && (
          <Box
            sx={{
              position: "absolute",
              bottom: 70,
              right: 16,
              zIndex: 10,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <EmojiPicker
              onEmojiClick={(emoji: any) => {
                setInput((prev) => prev + emoji.emoji);
                setEmojipopup(false);
              }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
