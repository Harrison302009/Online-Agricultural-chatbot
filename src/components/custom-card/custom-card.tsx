"use client";
import { Card, CssVarsProvider, Stack, Typography } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import "../../app/globalicons.css";
import { useEffect, useState } from "react";

export default function CustomCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: number;
  icon: string;
}) {
  const [count, setCount] = useState(0);
  const target = description;
  const speed = 1;
  useEffect(() => {
    if (count < target) {
      const timer = setInterval(() => {
        setCount((previousCount) => previousCount + 1);
      }, speed);
      return () => clearInterval(timer);
    }
  }, [count, target]);
  return (
    <CssVarsProvider>
      <Card
        sx={{
          maxWidth: 255,
          minWidth: 250,
          height: 120,
          backgroundColor: "#fff",
          display: "flex",
          position: "relative",
          alignItems: "start",
          justifyContent: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "--Card-radius": "20px",
        }}
        variant="soft"
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Avatar size="lg" variant="soft">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 30 }}
            >
              {icon}
            </span>
          </Avatar>
          <Stack>
            <Typography level="title-lg" sx={{ color: "#bfcacc" }}>
              {title}
            </Typography>
            <Typography
              level="title-md"
              sx={{ color: "#000000", fontWeight: "bold" }}
            >
              {count}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </CssVarsProvider>
  );
}
