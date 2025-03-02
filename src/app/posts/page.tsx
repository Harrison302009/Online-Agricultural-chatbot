"use client";

import { Metadata } from "next";
import { Box, Stack, Typography, Drawer, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { MessageInput } from "../api/messages/route";
import "../globalicons.css";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { MenuBar } from "@/components/menubar/menubar";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";

export default function Chat() {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [open, setOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const session = useSession();
  useEffect(() => {
    if (session.data?.user.image) {
      setImageLoaded(false);
    }
  }, [session.data?.user.image]);
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
          <MenuBar />
        </Drawer>
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            top: "5%",
            right: "4%",
            zIndex: 5,
          }}
        >
          {imageLoaded ? (
            <Avatar
              sx={{
                height: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                width: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
            >
              <Typography variant="h6">
                {session.data?.user?.name?.substring(0, 1).toUpperCase() ||
                  session.data?.user.email?.substring(0, 1).toUpperCase()}
              </Typography>
            </Avatar>
          ) : (
            <CldImage
              src={
                session.data?.user.image ||
                "aiculture/profile-pictures/pfp_eumgzq"
              }
              width={32}
              height={32}
              alt="Uploaded Image"
              style={{
                objectFit: "cover",
                borderRadius: 100,
                cursor: "pointer",
              }}
              draggable="false"
              onClick={() => setOpen(true)}
            />
          )}
        </Stack>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Baskervville SC', serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Search Anything...
        </Typography>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          {messages.map((message) => (
            <div key={message.id}>
              <p
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Oswald', sans-serif",
                  fontOpticalSizing: "auto",
                  fontStyle: "normal",
                }}
              >
                {message.role === "user" ? "User: " : "AI: "}
              </p>
              <Markdown>{message.content}</Markdown>
              <br /> <br />
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              id="search-bar"
              placeholder="Search for anything..."
              className="search-bar"
              value={input}
              onChange={handleInputChange}
            ></input>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
}
