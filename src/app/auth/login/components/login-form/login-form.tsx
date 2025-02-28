"use client";

import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import email from "next-auth/providers/email";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import AICulture from "/public/Samp.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/navbar/navbar";
import "../../../../globalicons.css";
import { useRouter } from "next/navigation";

type register = {
  id: string;
  email: string;
  password: string;
};

export function LoginForm() {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState<register[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [register, setRegister] = useState<register[]>([]);
  const router = useRouter();
  const inputStyle = {
    backgroundImage:
      "linear-gradient(to bottom right, red, aqua, silver, indigo, blue)",
    WebkitBackgroundClip: "text",
    MozBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontFamily: "'Indie Flower', cursive",
  };
  useEffect(() => {
    const APIfetch = async () => {
      const fetcher = await fetch("/api/register", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (fetcher.ok) {
        const data: register[] = await fetcher.json();
        setUserList(data);
      }
    };
    APIfetch();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            const request = async () => {
              const pair = userList.find((user) => user.email === email);
              if (pair) {
                if (pair.password === password) {
                  signIn("email", { email: (e.target as any).email.value });
                } else {
                  alert("Incorrect Password");
                }
              }
            };
            request();
          }}
        >
          <Stack
            sx={{
              backgroundColor: "rgba(255,0,0,0.4)",
              width: { xs: 300, sm: 345, md: 412, lg: 450, xl: 500 },
              borderRadius: 9,
              alignItems: "center",
              justifyContent: "center",
            }}
            spacing={2}
          >
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "fantasy",
                fontSize: { xs: 26, sm: 31, md: 35, lg: 38, xl: 42 },
              }}
            >
              Login
            </Typography>
            <TextField
              label="Email"
              type="email"
              value={email}
              sx={{ width: "70%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
              sx={{ width: "70%" }}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
