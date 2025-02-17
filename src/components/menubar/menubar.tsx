"use client";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import "../../app/globalicons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCross, faX } from "@fortawesome/free-solid-svg-icons";
import { PointBack, PointOut } from "../mousecontrols/mousecontrol";
import { Mice } from "../mice/mouse";
import { Controller } from "../mouse-movement-controls/mouse-movement-controls";
import { useEffect, useState } from "react";
import router from "next/router";
import { useSession } from "next-auth/react";
import MenuButton from "./components/menu-buttons/menu-buttons";
import { CldImage } from "next-cloudinary";

export function MenuBar() {
  const session = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    if (!session.data?.user.image) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
  }, [session.data?.user.image]);
  return (
    <>
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
          <Avatar style={{ height: 100, width: 100 }}>
            <Typography variant="h1">
              {session.data?.user?.name?.substring(0, 1).toUpperCase() ||
                session.data?.user.email?.substring(0, 1).toUpperCase()}
            </Typography>
          </Avatar>
        ) : (
          <CldImage
            src={session.data?.user.image || ""}
            width={100}
            height={100}
            alt="Uploaded Image"
            style={{ objectFit: "cover", borderRadius: 100 }}
            draggable="false"
          />
        )}
      </Stack>
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
        <Typography variant="h6" sx={{ fontFamily: "'Oswald', sans-serif" }}>
          {session.data?.user?.name || "No name registered"}
        </Typography>
      </Stack>
      <br />
      <MenuButton
        link="/settings"
        color="blue"
        text="Your Profile"
        icon="person"
      />
      <hr />
      <MenuButton link="/plans" color="red" text="Your plans" icon="paid" />
      <hr />
      <MenuButton link="/chat" color="green" text="User Chat" icon="p2p" />
      <hr />
      <MenuButton link="/ai" color="indigo" text="AI Chat" icon="chat" />
      <hr />
      <MenuButton link="/support" color="orange" text="Support" icon="help" />
      <hr />
      <MenuButton
        link="/auth/logout"
        color="black"
        text="Logout"
        icon="logout"
      />
    </>
  );
}
