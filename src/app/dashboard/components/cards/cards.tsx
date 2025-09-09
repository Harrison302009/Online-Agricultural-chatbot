"use client";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import "../../../globalicons.css";
import { useState } from "react";
import Image from "next/image";

export function GlobalCard({
  icon,
  subject,
  content,
  handle,
  cursorformation,
}: {
  icon: string;
  subject: string;
  content: string;
  handle?: () => void;
  cursorformation?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Image
        src={"/ai.jpg"}
        height={100}
        width={100}
        alt="AI"
        onLoad={() => setLoaded(true)}
        style={{ display: "block", visibility: "hidden" }}
      ></Image>
      <Paper
        elevation={5}
        onClick={handle}
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "25%",
          height: 200,
          cursor: cursorformation || "auto",
          transition: "0.2s ease-in-out",
          ":hover": {
            bgcolor: "#DEDEDE",
          },
        }}
      >
        {loaded ? (
          <Avatar
            sx={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              height: { xs: 27, sm: 36, md: 49, lg: 60, xl: 90, xxl: 150 },
              width: { xs: 27, sm: 36, md: 49, lg: 60, xl: 90, xxl: 150 },
              bgcolor: "grey.900",
            }}
          >
            <Stack
              component={"span"}
              className="material-symbols-outlined"
              sx={{
                fontSize: { xs: 7, sm: 14, md: 21, lg: 35, xl: 41, xxl: 48 },
              }}
            >
              {icon}
            </Stack>
          </Avatar>
        ) : (
          <Skeleton variant="circular" height={60} width={60}></Skeleton>
        )}
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loaded ? (
            <Typography variant="h3">{subject}</Typography>
          ) : (
            <Skeleton variant="text" height={50} width={100}></Skeleton>
          )}
          {loaded ? (
            <Typography variant="h6" sx={{ color: "gray", fontSize: 13 }}>
              {content}
            </Typography>
          ) : (
            <Skeleton variant="text" height={30} width={145}></Skeleton>
          )}
        </div>
      </Paper>
    </>
  );
}
