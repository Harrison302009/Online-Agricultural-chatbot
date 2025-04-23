"use client";
import {
  Stack,
  Typography,
  Avatar,
  CssVarsProvider,
  Card,
  CardContent,
  CardOverflow,
  AspectRatio,
  Skeleton,
} from "@mui/joy";
import { CardHeader, CardMedia } from "@mui/material";
import { CldImage } from "next-cloudinary";

export default function SettingsContainer({
  name,
  email,
  joined,
  lastSeen,
  country,
  phone,
  image,
  role,
}: {
  name: string;
  email: string;
  joined: string;
  lastSeen: string;
  country: string;
  phone: string;
  image: string;
  role: string;
}) {
  return (
    <CssVarsProvider>
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100vh",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(27, 27, 27, 0.47), rgba(48, 33, 33, 0.52)),url('/settings-back.jpg')",
          backgroundPosition: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ display: "flex", position: "relative", width: "50%" }}>
          <Card
            sx={{
              resize: "horizontal",
              "--icon-size": "150px",
              overflow: "auto",
              bgcolor: "rgb(17, 15, 15)",
              borderColor: "silver",
            }}
          >
            <CardOverflow
              variant="soft"
              color="warning"
              sx={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(27, 27, 27, 0.47), rgba(48, 33, 33, 0.52)),url('/dark-banner.jpg')",
                backgroundSize: "cover",
              }}
            >
              <AspectRatio
                flex
                ratio={1}
                sx={{
                  left: "3%",
                  transform: "translateY(50%)",
                  borderRadius: "50%",
                  width: 130,
                  height: 200,
                  boxShadow: "sm",
                  bgcolor: "gold",
                  position: "relative",
                }}
              >
                <Stack>
                  <Avatar
                    size="lg"
                    sx={{ height: 150, width: 150, fontSize: "4rem" }}
                  >
                    <CldImage
                      src={image}
                      height={150}
                      width={150}
                      alt={`${name}'s pfp`}
                      draggable={false}
                    />
                  </Avatar>
                </Stack>
              </AspectRatio>
            </CardOverflow>
            <Skeleton level="h2" sx={{ width: 170 }} loading={!name}>
              <Typography
                level="h2"
                sx={{ mt: "calc(var(--icon-size) / 2)", color: "#e7e9eb" }}
              >
                {name}
              </Typography>
            </Skeleton>
            <Skeleton
              loading={!email}
              level="title-lg"
              variant="text"
              sx={{ bgcolor: "grey.900", width: 170 }}
            >
              <Typography level="title-lg" sx={{ color: "#8d8f93" }}>
                {email}
              </Typography>
            </Skeleton>
            <Skeleton
              level="title-md"
              loading={!role}
              variant="text"
              sx={{ width: 170 }}
            >
              <Typography level="title-md" sx={{ color: "#8d8f93" }}>
                {role}
              </Typography>
            </Skeleton>
            <br />
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "row",
              }}
            >
              <Stack>
                <Typography level="h4" sx={{ color: "#6b6d71" }}>
                  First Seen
                </Typography>
                <Typography level="body-md" sx={{ color: "#d0d1d2" }}>
                  {new Date(joined).toDateString()}
                </Typography>
              </Stack>
              <hr />
              <Stack>
                <Typography level="h4" sx={{ color: "#6b6d71" }}>
                  Last Seen
                </Typography>
                <Typography level="body-md" sx={{ color: "#d0d1d2" }}>
                  {new Date(lastSeen).toDateString()}
                </Typography>
              </Stack>
              <hr />
              <Stack>
                <Typography level="h4" sx={{ color: "#6b6d71" }}>
                  Country
                </Typography>
                <Typography level="body-md" sx={{ color: "#d0d1d2" }}>
                  {country}
                </Typography>
              </Stack>
              <hr />
              <Stack>
                <Typography level="h4" sx={{ color: "#6b6d71" }}>
                  Phone
                </Typography>
                <Typography level="body-md" sx={{ color: "#d0d1d2" }}>
                  {phone}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
}
