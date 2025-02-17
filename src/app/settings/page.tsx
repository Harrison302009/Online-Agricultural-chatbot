"use client";
import { Mice } from "@/components/mice/mouse";
import { NavBar } from "@/components/navbar/navbar";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../app/globalicons.css";
import { faUserAlt, faX } from "@fortawesome/free-solid-svg-icons";
import {
  PointBack,
  PointOut,
  TextBack,
  TextOut,
} from "@/components/mousecontrols/mousecontrol";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { GetAllChatMessagesResponse } from "../api/chat/route";
import { useEffect, useState } from "react";
import { DefaultUser } from "next-auth";

export default function Settings() {
  const router = useRouter();
  const session = useSession();
  const [nameLoaded, setNameLoaded] = useState(false);
  const [emailLoaded, setEmailLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [user, setUser] = useState({
    image: "",
  });
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [messages, setMessages] = useState<
    GetAllChatMessagesResponse["messages"]
  >([]);
  const { data: databaseChatMessages } = useAllChatMessages();
  const uniqueUsernames = Array.from(
    new Set(
      [...(databaseChatMessages || []), ...messages].map(
        (message) => message.owner?.username,
      ),
    ),
  ).join("");
  const doneCustomizing = () => {
    window.location.href = "/dashboard";
  };
  if (session.data?.user.isBanned) {
    redirect("/banned");
  }
  useEffect(() => {
    if (!session.data?.user.image) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [session.data?.user.image]);
  return (
    <Box>
      <Stack
        style={{
          backgroundImage: "url('/settings.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          cursor: "none",
        }}
        onMouseOver={(e) => {
          var mouse = document.getElementById("mouse") as HTMLElement;
          var pointer = document.getElementById("pointer") as HTMLElement;
          window.addEventListener("mousemove", (t) => {
            mouse!.style.top = `${t.clientY}px`;
            mouse!.style.left = `${t.clientX}px`;
            pointer!.style.top = `${t.clientY}px`;
            pointer!.style.left = `${t.clientX}px`;
          });
        }}
      >
        <Mice />
        <Stack id="entpage">
          <Stack id="leftPage">
            <Typography variant="h3" sx={{ fontStyle: "italic" }}>
              Settings
            </Typography>
            <br />
            <ListItem>
              <ListItemButton
                sx={{
                  color: "black",
                  cursor: "none",
                  ":hover": {
                    transform: "translateY(-2px) scale(1.1)",
                  },
                }}
                onMouseOver={PointOut}
                onMouseOut={PointBack}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUserAlt} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6">User Profile</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Stack>
          <Stack id="rightPage">
            <FontAwesomeIcon
              icon={faX}
              id="exit"
              onMouseOver={PointOut}
              onMouseOut={PointBack}
              onClick={doneCustomizing}
            />
            <Stack id="profileDisplay">
              <Typography variant="h2" id="userDisplay">
                User profile
              </Typography>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {imageLoaded ? (
                  <Avatar
                    style={{ height: 175, width: 175 }}
                    onMouseOver={PointOut}
                    onMouseOut={PointBack}
                    onClick={() => {
                      const image = document.getElementsByClassName(
                        "uploadButton",
                      )[0] as HTMLButtonElement;
                      image.click();
                    }}
                  >
                    <Typography variant="h1">
                      {session.data?.user?.name
                        ?.substring(0, 1)
                        .toUpperCase() ||
                        session.data?.user.email?.substring(0, 1).toUpperCase()}
                    </Typography>
                  </Avatar>
                ) : (
                  <CldImage
                    src={session.data?.user.image || ""}
                    onMouseOver={PointOut}
                    onMouseOut={PointBack}
                    onClick={() => {
                      const image = document.getElementsByClassName(
                        "uploadButton",
                      )[0] as HTMLButtonElement;
                      image.click();
                    }}
                    width={200}
                    height={200}
                    alt="Uploaded Image"
                    style={{ objectFit: "cover", borderRadius: 100 }}
                    draggable="false"
                  />
                )}
                <CldUploadButton
                  className="uploadButton"
                  options={{
                    maxFiles: 1,
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    cropping: true,
                    croppingAspectRatio: 1,
                  }}
                  onSuccess={async (results) => {
                    const request = await fetch("/api/image", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        image: (results.info as any).public_id,
                      }),
                    });
                    if (request.status === 200) {
                      alert("Profile image updated successfully");
                      window.location.reload();
                    }
                  }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                />
              </Stack>
              <br />
              <Typography
                variant="h5"
                id="userName"
                className="userComponents"
                onMouseOver={TextOut}
                onMouseOut={TextBack}
              >
                Name: {session.data?.user?.name}
              </Typography>
              <br />
              <Typography
                variant="h5"
                id="userEmail"
                className="userComponents"
                onMouseOver={TextOut}
                onMouseOut={TextBack}
              >
                Email: {session.data?.user?.email}
              </Typography>
              <br />
              <Typography
                variant="h5"
                className="userComponents"
                id="userStreet"
                onMouseOver={TextOut}
                onMouseOut={TextBack}
              >
                Address: {session.data?.user.address}
              </Typography>
              <br />
              <Button
                variant="outlined"
                id="editProfile"
                onMouseOver={PointOut}
                onMouseOut={PointBack}
                onClick={() => {
                  router.push("/settings/edit-user-profile");
                }}
              >
                Edit User Profile
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
