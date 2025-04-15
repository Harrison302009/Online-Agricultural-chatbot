"use client";

import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { DeleteOutline, EmojiEmotionsRounded, Send } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import { GetAllChatMessagesResponse } from "@/app/api/chat/route";
import { MenuBar } from "@/components/menubar/menubar";

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
                  },
                );
              });
            }
          }
        }
      },
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
      chatContainerRef.current.scrollHeight,
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
    setOpen(true);
  };

  const handleTyping = async () => {
    const APIContact = await fetch("/api/typing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session?.user?.name,
        email: session?.user?.email,
      }),
    });
    if (APIContact.ok) {
      alert(typingUser);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Stack sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Stack
          sx={{ display: "flex", position: "absolute", top: "2%", right: "3%" }}
        >
          {session ? (
            <Avatar
              sx={{
                height: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                width: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              <Typography variant="h6">
                {session.user.name?.substring(0, 1).toUpperCase() ||
                  session.user.email?.substring(0, 1).toUpperCase()}
              </Typography>
            </Avatar>
          ) : (
            <Typography></Typography>
          )}
        </Stack>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          anchor="right"
          PaperProps={{
            sx: { width: { xs: 75, sm: 100, md: 150, lg: 250, xl: 350 } },
          }}
        >
          <MenuBar />
        </Drawer>
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
                  msg.ownerId === session?.user?.id ? "#e3f2fd" : "#fff",
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
              setInput(e.target.value);
              handleTyping();
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
              onEmojiClick={(emoji) => {
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
