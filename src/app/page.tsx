"use client";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import { DM_Serif_Text, Train_One } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import background from "public/Sample.png";
import logo from "public/Samp.png";
import ReactPlayer from "react-player";
import "./globalicons.css";
import { NavBar } from "@/components/navbar/navbar";
import MouseHandle, { Mouse } from "@/components/mouse/mouse";
import { MenuBar } from "@/components/menubar/menubar";
import { Mice } from "@/components/mice/mouse";
import { PointBack, PointOut } from "@/components/mousecontrols/mousecontrol";

export default function Home() {
  useEffect(() => {
    const imageElement = document.getElementById("mouse");
    if (imageElement) {
      console.log("Image element found:", imageElement);
    } else {
      console.log("Image element not found");
    }
  }, []);
  const mesh = () => {
    var aiculture = document.getElementById("aiculture") as HTMLHeadingElement;
    aiculture.style.transition = "1s ease-in-out";
    aiculture.style.backgroundImage =
      "linear-gradient(-173deg, red 0%, aqua 15%, silver 50%, indigo 75%, blue 100%)";
    aiculture.style.backgroundSize = "200% auto";
    aiculture.style.color = "transparent";
    aiculture.style.animation = "meshColors 1s infinite linear";
  };
  const doneSpectatingMesh = () => {
    var aiculture = document.getElementById("aiculture") as HTMLHeadingElement;
    aiculture.style.backgroundImage =
      "linear-gradient(to bottom right, red, aqua, silver, indigo, blue)";
    aiculture.style.backgroundClip = "text";
    aiculture.style.color = "transparent";
    aiculture.style.animation = "done 1s";
    aiculture.style.transition = "1s ease-in-out";
  };
  const router = useRouter();
  return (
    <Box>
      <Stack
        style={{
          backgroundImage: "url('/ai.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          WebkitBackdropFilter: "blur(1px)",
          backdropFilter: "blur(1px)",
          cursor: "none",
        }}
        onMouseOver={(e) => {
          var mouse = document.getElementById("mouse") as HTMLElement;
          var pointer = document.getElementById("pointer") as HTMLElement;
          var check = window.localStorage.getItem("gotAUsername");
          console.log(check);
          window.addEventListener("mousemove", (t) => {
            mouse!.style.top = `${t.clientY}px`;
            mouse!.style.left = `${t.clientX}px`;
            pointer!.style.top = `${t.clientY}px`;
            pointer!.style.left = `${t.clientX}px`;
          });
          if (check === "true") {
            console.log(`No need for a username`);
          } else {
            console.log(`Need a username`);
            window.localStorage.setItem(
              "uname",
              `user${Math.floor(Math.random())}`,
            );
          }
        }}
      >
        <Stack>
          <video
            style={{
              display: "flex",
              position: "absolute",
              right: 0,
              bottom: 0,
              minHeight: "100%",
              minWidth: "100%",
            }}
            autoPlay
            muted
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <source src="/AICulture-dream-of-the-future.mp4" type="video/mp4" />
          </video>
        </Stack>
        <Stack style={{ position: "relative", display: "flex" }}>
          <Mice />
          <nav
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              wordSpacing: 2,
              gap: 5,
              cursor: "none",
            }}
          >
            <span className="material-symbols-outlined">home</span>
            <p
              style={{
                color: "gray",
                fontFamily: "'Indie Flower', cursive",
                cursor: "none",
              }}
              id="home"
              onClick={(v) => {
                v.preventDefault();
                router.push("/");
              }}
              onMouseOver={(r) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "block";
                cursor!.style.display = "none";
              }}
              onMouseOut={(f) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "none";
                cursor!.style.display = "block";
              }}
            >
              Home
            </p>
            <span
              className="material-symbols-outlined"
              id="contacts"
              style={{ marginLeft: 40 }}
            >
              contacts_product
            </span>
            <p
              style={{
                color: "gray",
                fontFamily: "'Indie Flower', cursive",
                cursor: "none",
              }}
              onClick={(y) => {
                y.preventDefault();
                router.push("/contact");
              }}
              onMouseOver={(r) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "block";
                cursor!.style.display = "none";
              }}
              onMouseOut={(f) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "none";
                cursor!.style.display = "block";
              }}
            >
              Contact us
            </p>
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: 30 }}
            >
              local_library
            </span>
            <p
              style={{
                color: "gray",
                fontFamily: "'Indie Flower', cursive",
                cursor: "none",
              }}
              onClick={(u) => {
                u.preventDefault();
                router.push("/about");
              }}
              onMouseOver={(r) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "block";
                cursor!.style.display = "none";
              }}
              onMouseOut={(f) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "none";
                cursor!.style.display = "block";
              }}
            >
              About us
            </p>
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: 50 }}
            >
              chat
            </span>
            <p
              id="chats"
              style={{
                color: "gray",
                fontFamily: "'Indie Flower', cursive",
                cursor: "none",
              }}
              onClick={(l) => {
                router.push("/chat");
              }}
              onMouseOver={(r) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "block";
                cursor!.style.display = "none";
              }}
              onMouseOut={(f) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "none";
                cursor!.style.display = "block";
              }}
            >
              P2P Chat
            </p>
            <span
              className="material-symbols-outlined"
              style={{ marginLeft: 50 }}
            >
              forum
            </span>
            <p
              id="p2b"
              style={{
                color: "gray",
                fontFamily: "'Indie Flower', cursive",
                cursor: "none",
              }}
              onClick={(i) => {
                router.push("/dashboard");
              }}
              onMouseOver={(r) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "block";
                cursor!.style.display = "none";
              }}
              onMouseOut={(f) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "none";
                cursor!.style.display = "block";
              }}
            >
              Chats & Privacy
            </p>
          </nav>

          <Stack>
            <Button
              variant="contained"
              style={{
                backgroundColor: "purple",
                width: 110,
                display: "flex",
                position: "absolute",
                right: 0,
                top: 4,
                cursor: "none",
              }}
              onClick={(a) => {
                a.preventDefault();
                router.push("/auth/login");
              }}
              onMouseOver={(r) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "block";
                cursor!.style.display = "none";
              }}
              onMouseOut={(f) => {
                var cursor = document.getElementById("mouse") as HTMLElement;
                var pointer = document.getElementById("pointer") as HTMLElement;
                pointer!.style.display = "none";
                cursor!.style.display = "block";
              }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
        <MenuBar />
        <Typography
          variant="h1"
          id="aiculture"
          onMouseOver={mesh}
          onMouseOut={doneSpectatingMesh}
        >
          AICulture
        </Typography>
        <Stack
          style={{
            display: "flex",
            position: "relative",
            top: 170,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              WebkitBackdropFilter: "blur(1px)",
              backdropFilter: "blur(1px)",
              fontFamily: "'Italiana', sans-serif",
              color: "rebeccapurple",
            }}
          >
            Grand Update
          </Typography>
          <Stack display={"flex"} flexDirection={"row"} gap={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px transparent",
                padding: "10px",
                width: 170,
                boxSizing: "border-box",
                boxShadow: "0 15px 30px 0 #888888",
                margin: "8px",
              }}
            >
              <Image
                alt="Update"
                src={"/plant-detector.jpg"}
                width={150}
                height={170}
                draggable="false"
                style={{ position: "relative", top: -15 }}
              ></Image>
              <Typography
                variant="h6"
                style={{
                  color: "lightpink",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                }}
              >
                A plant-detection API
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 170,
                color: "gray",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px transparent",
                padding: "10px",
                boxSizing: "border-box",
                boxShadow: "0 15px 30px 0 #888888",
                margin: "8px",
              }}
              onMouseOver={PointOut}
              onMouseOut={PointBack}
            >
              <Image
                alt="upd2"
                src={"/cursor.png"}
                width={150}
                height={150}
                draggable={"false"}
                style={{ position: "relative", top: -35 }}
              ></Image>
              <Typography
                variant="h6"
                style={{
                  color: "lightpink",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                }}
              >
                A new cursor
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 170,
                color: "gray",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px transparent",
                padding: "10px",
                boxSizing: "border-box",
                boxShadow: "0 15px 30px 0 #888888",
                margin: "8px",
              }}
            >
              <Image
                alt="upd3"
                src={"/UI.jpg"}
                width={150}
                height={170}
                draggable={"false"}
                style={{ position: "relative", top: -30 }}
              ></Image>
              <Typography
                variant="h6"
                style={{
                  color: "lightpink",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                }}
              >
                New UIs
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 170,
                height: 300,
                color: "gray",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px transparent",
                padding: "10px",
                boxSizing: "border-box",
                boxShadow: "0 15px 30px 0 #888888",
                margin: "8px",
              }}
            >
              <Image
                alt="upd4"
                src={"/botanical.jpg"}
                width={150}
                height={170}
                draggable={"false"}
                style={{ position: "relative", top: -22 }}
              ></Image>
              <Typography
                variant="h6"
                style={{
                  color: "lightpink",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontStyle: "normal",
                }}
              >
                A new Botanical translator
              </Typography>
            </div>
          </Stack>
        </Stack>
        <footer
          style={{
            marginTop: "auto",
            marginLeft: "auto",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            float: "right",
          }}
        >
          <p
            style={{
              color: "gold",
              fontFamily: "'Indie Flower', cursive",
              fontStyle: "italic",
              float: "right",
            }}
          >
            Powered by{" "}
            <a
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, red, indigo, gold, silver, blue, aqua)",
                MozBackgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "normal",
              }}
            >
              CrownAI
            </a>
            <sup style={{ color: "black" }}>&reg;</sup>
          </p>
        </footer>
      </Stack>
    </Box>
  );
}
