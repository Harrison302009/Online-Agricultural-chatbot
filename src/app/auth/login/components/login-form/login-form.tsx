"use client";
import { Box, Stack } from "@mui/material";
import Button from "@mui/joy/Button";
import "../../../../globalicons.css";
import { Checkbox, Input, Link, Snackbar, Typography } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { extendTheme } from "@mui/joy/styles";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { WarningAmberOutlined } from "@mui/icons-material";

type RegisteredUsers = {
  email: string;
  password: string;
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("primary");
  const [register, setRegister] = useState<RegisteredUsers[]>([]);
  const [loading, setLoading] = useState(false);
  const [danger, setDanger] = useState(false);
  const [warning, setWarning] = useState(false);
  const [checked, setChecked] = useState(false);
  const session = useSession();
  useEffect(() => {
    const fetchEmails = async () => {
      const APIContact = await fetch("/api/register", {
        method: "GET",
      });
      if (APIContact.ok) {
        const data: RegisteredUsers[] = await APIContact.json();
        setRegister(data);
      }
    };
    fetchEmails();
  }, []);
  const ValidateLogin = (email: string) => {
    if (register) {
      const ValidEmail = register.find(
        (registeredEmail) => registeredEmail.email === email,
      );
      if (ValidEmail) {
        if (password === ValidEmail.password) {
          setLoading(false);
          signIn("email", { email });
        } else {
          setLoading(false);
          setDanger(true);
          setTimeout(() => {
            setDanger(false);
          }, 3000);
        }
      } else {
        setLoading(false);
        setDanger(true);
        setTimeout(() => {
          setDanger(false);
        }, 3000);
      }
    }
  };
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          background: {
            level1: "#080808",
            level2: "#1c1c1c",
            level3: "#3e3c3a",
            body: "#ffffff",
            backdrop: "#706e6d",
          },
        },
      },
    },
  });
  return (
    <CssVarsProvider>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage:
            "linear-gradient(to bottom right, rgba(166,88,49,0.4), rgba(39, 89, 128, 0.36)),url('/login-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Snackbar
            open={danger}
            size="lg"
            variant="soft"
            color="danger"
            startDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
          >
            Email not registered
          </Snackbar>
          <Snackbar
            open={warning}
            size="lg"
            variant="soft"
            color="danger"
            startDecorator={<WarningAmberOutlined />}
          >
            Wrong email or password
          </Snackbar>
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography
              variant="plain"
              level="h1"
              sx={{ fontFamily: "'Ga Maamli', serif", color: "#fff" }}
            >
              Welcome back
            </Typography>

            <Typography
              variant="plain"
              level="title-lg"
              sx={{ fontFamily: "'Englebert', serif", color: "#fff" }}
            >
              We&apos;re glad to see you again. Please log in to access your
              personalized dashboard, where you can stay updated with the latest
              weather information, explore the latest agricultural news, and
              navigate our real-world map to connect with resources and
              opportunities around you.
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              width: "30%",
              backgroundColor: "rgba(255, 255, 255, 0.33)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <form
              style={{
                display: "flex",
                position: "relative",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                ValidateLogin(email);
              }}
            >
              <Typography
                variant="plain"
                level="h1"
                sx={{ fontFamily: "'Irish Grover', serif" }}
              >
                Sign in
              </Typography>
              <br />

              <Input
                variant="soft"
                color="warning"
                type="email"
                required
                placeholder="Email"
                sx={{ width: "80%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <Input
                variant="soft"
                color="warning"
                type="password"
                required
                placeholder="Password"
                sx={{ width: "80%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  gap: 1,
                }}
              >
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <Typography>I ãgree to the Térms & Cönditíons</Typography>
              </Stack>
              <br />
              <Button
                disabled={!email || !password || !checked}
                loading={loading}
                type="submit"
              >
                Login
              </Button>
              <br />
              <Typography level="body-md">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register">Sign up</Link>
              </Typography>
            </form>
          </Stack>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}
