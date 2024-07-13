"use client";
import { Mice } from "@/components/mice/mouse";
import { NavBar } from "@/components/navbar/navbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../app/globalicons.css";
import { faUserAlt, faX } from "@fortawesome/free-solid-svg-icons";
import { PointBack, PointOut } from "@/components/mousecontrols/mousecontrol";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAllChatMessages } from "@/modules/chat/hooks/use-all-chat-messages/use-all-chat-messages";
import { GetAllChatMessagesResponse } from "../api/chat/route";
import { useState } from "react";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";

export default function Settings() {
  const router = useRouter();
  const session = useSession();
  const [messages, setMessages] = useState<
    GetAllChatMessagesResponse["messages"]
  >([]);
  const [profile, setProfile] = useState("");
  const { data: databaseChatMessages } = useAllChatMessages();
  const uniqueUsernames = Array.from(
    new Set(
      [...(databaseChatMessages || []), ...messages].map(
        (message) => message.owner?.username,
      ),
    ),
  ).join("");
  const doneCustomizing = () => {
    router.back();
  };
  function UserProfile({ session }: { session: any }) {
    return (
      <Image
        src={session.user.avatarUrl}
        height={200}
        width={200}
        alt="UploadedImage"
      ></Image>
    );
  }

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
            <Typography variant="h2">Settings</Typography>
            <br />
            <Stack id="userProfile">
              <FontAwesomeIcon icon={faUserAlt} id="userAlt" />
              <Typography variant="h5">User profile</Typography>
            </Stack>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch("/api/pfp", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      avatarUrl: profile,
                    }),
                  });
                }}
              >
                <input
                  type="file"
                  id="avatarInput"
                  name="avatar"
                  style={{ display: "none" }}
                  value={profile}
                  onChange={(t) => setProfile(t.target.value)}
                />
                <Image
                  src={"/profile.jpg"}
                  height={200}
                  width={200}
                  alt="Upload"
                  id="defaultAvatar"
                  style={{ borderRadius: 100 }}
                  onClick={(e) => {
                    let input = document.getElementById(
                      "avatarInput",
                    ) as HTMLInputElement;
                    input.click();
                  }}
                ></Image>
                <UserProfile session={session} />
              </form>
              <br />
              <Typography variant="h4" id="userName" className="userComponents">
                Name: Unknown 4 now
              </Typography>
              <br />
              <Typography
                variant="h4"
                id="userEmail"
                className="userComponents"
              >
                Email {session.data?.user?.email}
              </Typography>
              <br />
              <Typography
                variant="h4"
                id="usernameA"
                className="userComponents"
              >
                Username: {uniqueUsernames}
              </Typography>
              <br />
              <Button
                variant="outlined"
                id="editProfile"
                onMouseOver={PointOut}
                onMouseOut={PointBack}
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
