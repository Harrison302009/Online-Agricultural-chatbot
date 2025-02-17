import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Holder({
  primaryColor,
  secondaryColor,
  borderColor,
  image,
  imageHeight,
  imageWidth,
  topic,
  topicColor,
  children,
  width,
  height,
  classname,
}: {
  classname?: string;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
  image?: string;
  imageHeight?: string;
  imageWidth?: string;
  topic: string;
  width?: string;
  height?: string;
  topicColor: string;
  children: React.ReactNode | any;
}) {
  return (
    <Stack
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "row",
        gap: 2,
        width: width || "80%",
        height: height || "auto",
        borderRadius: 4,
        border: `2px solid #${borderColor}`,
        background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
      }}
      className={classname}
    >
      {image && (
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "60%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`/${image}.jpg`}
            alt=""
            height={"80%" || imageHeight}
            width={"65%" || imageWidth}
            style={{ borderRadius: 9 }}
          />
        </Stack>
      )}
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          flexDirection: "column",
          padding: "0 30px",
        }}
      >
        <Stack sx={{ display: "flex", position: "relative", width: "90%" }}>
          <Typography variant="h4" sx={{ color: `#${topicColor}` }}>
            {topic}
          </Typography>
        </Stack>
        <br />
        {children}
      </Stack>
    </Stack>
  );
}
