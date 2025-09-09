"use client";
import Stack from "@mui/material/Stack";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
  useEffect(() => {
    setTimeout(() => {
      redirect("/auth/logout");
    }, 5000);
  }, []);
  return (
    <Stack
      sx={{
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3)),url('/unauthorized.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
      }}
    ></Stack>
  );
}
