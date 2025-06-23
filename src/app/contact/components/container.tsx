"use client";
import {
  Button,
  CssVarsProvider,
  FormLabel,
  Grid,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

export default function Container() {
  const [userinfo, setUserInfo] = useState({
    name: "",
    email: "",
    message: "",
    id: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user", {
        method: "GET",
      });
      const data = await response.json();
      console.log(
        `firstName: ${data.name.split(" ")[1]}, lastName: ${
          data.name.split(" ")[2]
        }, `,
      );
      setUserInfo(data);
    };
    fetchUserData();
  });
  return (
    <CssVarsProvider>
      <Stack sx={{ height: "100vh", width: "100%" }}>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            height: "35%",
            width: "100%",
            background:
              "linear-gradient(to right, rgba(134, 91, 164, 0.55), rgba(57, 115, 185, 0.55)),url('/contact-us.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "40%",
            }}
          >
            <Typography level="h1" sx={{ color: "#fff", fontSize: 40 }}>
              Contact us
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Typography
            level="h1"
            sx={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Lay your complaints
          </Typography>
          <br />
          <form action="">
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={6} md={6} lg={6}>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="First Name"
                  variant="soft"
                  value={userinfo.name.split(" ")[1]}
                />
              </Grid>
              <Grid xs={6} md={6} lg={6}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="Last Name"
                  variant="soft"
                  value={userinfo.name.split(" ")[2]}
                />
              </Grid>
              <Grid xs={6} md={6} lg={12}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  variant="soft"
                  value={userinfo.email}
                />
              </Grid>
              <Grid xs={6} md={6} lg={12}>
                <Textarea placeholder="Message" variant="soft" minRows={3} />
              </Grid>
            </Grid>
            <br />
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button variant="soft" color="danger">
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
}
