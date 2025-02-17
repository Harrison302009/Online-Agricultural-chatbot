"use client";

import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { Avatar, Box, Drawer, Stack, Typography } from "@mui/material";
import "../../../globalicons.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { GetAllChatMessagesResponse } from "../../../api/chat/route";
import { MenuBar } from "@/components/menubar/menubar";
import { CldImage } from "next-cloudinary";
import { registerServiceWorker } from "@/utils/register-service-worker";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: "mt1",
});

export default function Container() {
  const session = useSession();
  const [messages, setMessages] = useState<
    GetAllChatMessagesResponse["messages"]
  >([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState("left");

  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { data: databaseChatMessages } = useAllChatMessages();

  console.log("@@ databaseChatMessages", databaseChatMessages);
  console.log(
    `message owner: ${databaseChatMessages?.map(
      (data) => data.ownerId,
    )}, real owner: ${session.data?.user.id}`,
  );
  useEffect(() => {
    registerServiceWorker();
  }, []);
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Notifications not granted by the user.");
        }
      });
    }
  }, []);
  useEffect(() => {
    if (!session.data?.user.image) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [session.data?.user.image]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const channel = pusher.subscribe("chat");

    channel.bind(
      "message",
      (data: GetAllChatMessagesResponse["messages"][number]) => {
        console.log("@@ New message received: ", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        if (data.ownerId !== session.data?.user.id) {
          if (Notification.permission === "granted") {
            if (navigator.serviceWorker && navigator.serviceWorker.ready) {
              navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(
                  `${data.owner?.name} sent you a message`,
                  {
                    body: `${data.message}`,
                    icon: "/chat-user.jpg",
                    data: { url: "/chat" },
                    vibrate: [200, 100, 100],
                    badge: "/Samp.png",
                    timestamp: new Date().getTime(),
                    requireInteraction: true,
                    actions: [
                      {
                        action: "reply",
                        title: "Reply",
                        icon: "/reply.png",
                      },
                      {
                        action: "dismiss",
                        title: "Dismiss",
                        icon: "/dismiss.png",
                      },
                    ],
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
  }, [router, session.data?.user.id, session.data?.user.image]);
  useEffect(() => {
    async function Update() {
      if (!session.data?.user) {
        return;
      }
      const response = await fetch("/api/user");
      const user = await response.json();
      console.log("@@ user: ", user);
    }
    Update();
  }, [session.data?.user]);
  const isUserMessage = databaseChatMessages?.map(
    (message) => message.ownerId === session.data?.user.id,
  );
  useEffect(() => {
    const holder = databaseChatMessages?.find(
      (user) => user.ownerId === session.data?.user.id,
    );
    if (holder) {
      setPosition("right");
      console.log("These are your messages");
    }
  }, [databaseChatMessages, session.data?.user.id]);

  return (
    <Box>
      <Stack
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "100%",
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            right: "4%",
            top: "5%",
          }}
        >
          {imageLoaded ? (
            <Avatar
              sx={{
                height: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                width: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                cursor: "pointer",
                zIndex: 50,
              }}
              onClick={handleOpen}
            >
              <Typography variant="h6">
                {session.data?.user?.name?.substring(0, 1).toUpperCase() ||
                  session.data?.user.email?.substring(0, 1).toUpperCase()}
              </Typography>
            </Avatar>
          ) : (
            <CldImage
              src={session.data?.user.image || ""}
              width={32}
              height={32}
              alt="Uploaded Image"
              style={{
                objectFit: "cover",
                borderRadius: 100,
                cursor: "pointer",
                zIndex: 50,
              }}
              draggable="false"
              onClick={handleOpen}
            />
          )}
        </Stack>
        <Stack>
          <Drawer
            open={open}
            onClose={handleClose}
            anchor="right"
            PaperProps={{
              sx: { width: { xs: 75, sm: 100, md: 150, lg: 250, xl: 350 } },
            }}
          >
            <MenuBar />
          </Drawer>
        </Stack>
        <Stack>
          <div
            ref={chatContainerRef}
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              position: "absolute",
              height: 500,
              width: "100%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              overflowY: "scroll",
            }}
          >
            {[...(databaseChatMessages || []), ...messages].map(
              (message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <CldImage
                    src={message.image || "new-user_enkjde"}
                    width={50}
                    height={50}
                    alt="Uploaded Image"
                    style={{ objectFit: "cover", borderRadius: 100 }}
                    draggable="false"
                  />
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      height: 100,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        position: "relative",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          display: "flex",
                          position: "relative",
                          fontWeight: "bold",
                          backgroundColor: "transparent",
                        }}
                      >
                        {message.owner?.name ||
                          `New User(${message.owner?.id.substring(0, 5)})`}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          display: "flex",
                          position: "relative",
                          color: "rgba(50.2, 50.2, 50.2, 0.5)",
                        }}
                      >
                        {new Date(message.createdAt).toLocaleString()}
                      </Typography>
                    </div>
                    <h4
                      style={{
                        backgroundColor: "transparent",
                        display: "flex",
                        position: "relative",
                        borderRadius: 50,
                        height: "fit-content",
                        fontFamily: "'Indie Flower', cursive",
                      }}
                    >
                      {message.message}
                    </h4>
                  </div>
                </div>
              ),
            )}
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              flexDirection: "row",
              top: 500,
            }}
          >
            <form
              onSubmit={(r) => {
                r.preventDefault();
                fetch("/api/chat", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: input,
                    email: session.data?.user?.email || "harrisjohnu@gmail.com",
                  }),
                });
                setInput("");
              }}
            >
              <input
                placeholder="Message"
                id="message"
                style={{
                  display: "flex",
                  position: "fixed",
                  bottom: 0,
                  marginTop: "auto",
                  alignItems: "bottom",
                  justifyContent: "bottom",
                  borderBottom: 0,
                  flexGrow: 1,
                  marginRight: 10,
                  backgroundColor: "rgba(128, 128, 128, 0.3)",
                  height: 50,
                  width: 1250,
                  outline: "none",
                  border: "none",
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                style={{
                  display: "flex",
                  position: "fixed",
                  right: 0,
                  background: "transparent",
                  border: "transparent",
                  bottom: "1%",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  id="text"
                  onClick={() => {
                    fetch("/api/chat", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        message: input,
                        email:
                          session.data?.user?.email || "harrisjohnu@gmail.com",
                      }),
                    });
                    setInput("");
                  }}
                  onMouseEnter={(u) => {
                    u.preventDefault();
                    var button = document.getElementById(
                      "text",
                    ) as HTMLSpanElement;
                    button.style.backgroundColor = "aqua";
                    button.style.color = "white";
                    button.style.transition = "1s ease-in-out";
                  }}
                  onMouseOut={(j) => {
                    j.preventDefault();
                    var button = document.getElementById(
                      "text",
                    ) as HTMLSpanElement;
                    var mouse = document.getElementById(
                      "mouse",
                    ) as HTMLImageElement;
                    button.style.backgroundColor = "green";
                    button.style.color = "black";
                    button.style.transition = "1s ease-in-out";
                  }}
                >
                  send
                </span>
              </button>
            </form>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
}
