"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await signOut({
        callbackUrl: "/",
      });
    })();
  }, [router]);

  return (
    <Stack
      height="100vh"
      style={{
        backgroundImage: "url('/D108.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        height: "100vh",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
      }}
      onMouseOver={(e) => {
        var mouse = document.getElementById("mouse") as HTMLElement;
        var pointer = document.getElementById("pointer") as HTMLElement;
        console.log(mouse);
        window.addEventListener("mousemove", (t) => {
          mouse!.style.top = `${t.clientY}px`;
          mouse!.style.left = `${t.clientX}px`;
          pointer!.style.top = `${t.clientY}px`;
          pointer!.style.left = `${t.clientX}px`;
        });
      }}
    >
      <Image
        src={"/cursor.png"}
        alt="cursor"
        id="mouse"
        width={30}
        height={30}
        style={{
          display: "block",
          zIndex: 9999,
          position: "absolute",
          pointerEvents: "none",
        }}
        onClick={(l) => {
          return true;
        }}
      ></Image>
      <Image
        src={"/pointer.png"}
        alt="cursor"
        id="pointer"
        width={20}
        height={30}
        style={{
          display: "none",
          zIndex: 9999,
          position: "absolute",
          pointerEvents: "none",
        }}
        onClick={(l) => {
          return true;
        }}
      ></Image>
      <Typography
        variant="h2"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, red, gold, silver, aqua, purple)",
          WebkitBackgroundClip: "text",
          MozBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          fontFamily: "'Reddit Mono', monospace",
        }}
        onMouseOver={(r) => {
          var cursor = document.getElementById("mouse") as HTMLImageElement;
          cursor.srcset = "/text-cursor.png";
        }}
        onMouseOut={(i) => {
          var cursor = document.getElementById("mouse") as HTMLImageElement;
          cursor.srcset = "/cursor.png";
        }}
      >
        Logging you out...
      </Typography>
    </Stack>
  );
}
