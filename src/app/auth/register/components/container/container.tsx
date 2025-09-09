"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to right, rgb(133,91,164), rgb(57,114,185))",
        height: "100vh",
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
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
            signIn("email", { email });
            setSubmitted(true);
          }}
        >
          <Stack
            sx={{
              backgroundColor: "rgb(96,180,219)",
              borderRadius: 9,
              width: { xs: 300, sm: 345, md: 412, lg: 450, xl: 500 },
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
              Create an Account
            </Typography>
            <br />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              sx={{ width: "70%" }}
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#000",
                ":hover": { backgroundColor: "#000" },
              }}
            >
              Validate Email
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
