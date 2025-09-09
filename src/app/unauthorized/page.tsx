"use client";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  });
  return (
    <Stack
      sx={{
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3)),url('/403.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
      }}
    ></Stack>
  );
}
