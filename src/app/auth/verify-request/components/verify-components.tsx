"use client";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import "../../../globalicons.css";

export default function Container() {
  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      style={{
        backgroundImage: "url('/email.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        borderTop={300}
        style={{ borderColor: "transparent" }}
      >
        <Typography
          style={{
            backgroundImage:
              "linear-gradient(to left, red, indigo, violet, blue, yellow, red)",
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "'Reddit Mono', monospace",
          }}
          variant="h2"
        >
          Email Incoming
        </Typography>
      </Stack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="h4"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, gold, indigo, red, blue, violet, silver)",
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "'Reddit Mono', monospace",
          }}
        >
          Check your email
        </Typography>
      </Stack>
    </Stack>
  );
}
