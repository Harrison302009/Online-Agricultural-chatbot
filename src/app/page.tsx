"use client";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import { DM_Serif_Text, Train_One } from "next/font/google";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import background from "public/Sample.png";
import logo from "public/Samp.png";
import ReactPlayer from "react-player";
import "./globalicons.css";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { NavBar } from "@/components/navbar/navbar";

export default function Home() {
  const router = useRouter();
  return (
    <Box>
      <Stack
        style={{
          backgroundImage:
            "url('https://suntrics.com/wp-content/uploads/2023/05/Drones-Help-Farmers.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          WebkitBackdropFilter: "blur(1px)",
          backdropFilter: "blur(1px)",
        }}
      >
        <Stack>
          <video
            style={{
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
          <NavBar />
        </Stack>
        <span
          className="material-symbols-outlined"
          style={{
            display: "flex",
            position: "absolute",
            WebkitBackdropFilter: "blur(1px)",
            backdropFilter: "blur(1px)",
            cursor: "pointer",
          }}
          id="menu"
          onMouseEnter={(m) => {
            m.preventDefault();
            var menu = document.getElementById("menu") as HTMLElement;
            menu.style.backgroundColor = "black";
            menu.style.color = "white";
            menu.style.borderRadius = "20px";
          }}
          onMouseOut={(u) => {
            u.preventDefault();
            var menu = document.getElementById("menu") as HTMLElement;
            menu.style.backgroundColor = "transparent";
            menu.style.color = "black";
            menu.style.borderRadius = "10px";
          }}
          onClick={(m) => {
            m.preventDefault();
            var health = document.getElementById("health") as HTMLElement;
            var safety = document.getElementById("safety") as HTMLElement;
            var end = document.getElementById("back") as HTMLElement;
            var times = document.getElementById("x") as HTMLElement;
            var menu = document.getElementById("menu") as HTMLElement;
            var support = document.getElementById("support") as HTMLElement;
            var help = document.getElementById("help") as HTMLElement;
            health.style.color = "red";
            health.style.transition = "2s ease-in-out";
            safety.style.color = "red";
            safety.style.transition = "2s ease-in-out";
            end.style.width = "230px";
            end.style.transition = "2s ease-in-out";
            support.style.color = "red";
            support.style.transition = "2s ease-in-out";
            help.style.color = "red";
            help.style.transition = "2s ease-in-out";
            times.style.display = "flex";
            times.style.color = "gray";
            times.style.fontSize = "20px";
            times.style.transition = "3s ease-in-out";
            menu.style.display = "none";
          }}
        >
          menu
        </span>
        <div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              top: 0,
              height: "100vh",
              backgroundColor: "black",
              width: 0,
            }}
            id="back"
          >
            <span
              className="material-symbols-outlined"
              style={{
                display: "flex",
                position: "relative",
                fontSize: 0,
                top: -330,
                left: 173,
                cursor: "pointer",
                color: "transparent",
              }}
              id="x"
              onMouseEnter={(r) => {
                r.preventDefault();
                var times = document.getElementById("x") as HTMLElement;
                times.style.color = "red";
                times.style.transition = "0s";
              }}
              onMouseOut={(b) => {
                b.preventDefault();
                var times = document.getElementById("x") as HTMLElement;
                times.style.color = "grey";
                times.style.transition = "0s";
              }}
              onClick={(h) => {
                h.preventDefault();
                var health = document.getElementById("health") as HTMLElement;
                var safety = document.getElementById("safety") as HTMLElement;
                var end = document.getElementById("back") as HTMLElement;
                var support = document.getElementById("support") as HTMLElement;
                var help = document.getElementById("help") as HTMLElement;
                var times = document.getElementById("x") as HTMLElement;
                var menu = document.getElementById("menu") as HTMLElement;
                health.style.color = "transparent";
                health.style.transition = "1s ease-in-out";
                safety.style.color = "transparent";
                safety.style.transition = "1s ease-in-out";
                end.style.width = "0";
                end.style.transition = "2s ease-in-out";
                support.style.color = "transparent";
                support.style.transition = "1s ease-in-out";
                help.style.color = "transparent";
                help.style.transition = "1s ease-in-out";
                times.style.fontSize = "0";
                times.style.color = "transparent";
                times.style.transition = "1s ease-in-out";
                menu.style.display = "flex";
              }}
            >
              close
            </span>
            <span
              className="material-symbols-outlined"
              id="health"
              style={{ color: "transparent", position: "relative", top: -220 }}
            >
              health_and_safety
            </span>
            <h5
              style={{
                color: "transparent",
                position: "relative",
                top: -220,
                cursor: "pointer",
              }}
              id="safety"
            >
              Safety
            </h5>
            <span
              className="material-symbols-outlined"
              id="support"
              style={{
                color: "transparent",
                position: "relative",
                top: -160,
                left: -65,
              }}
            >
              help
            </span>
            <h5
              style={{
                color: "transparent",
                position: "relative",
                top: -160,
                left: -63,
                cursor: "pointer",
              }}
              id="help"
            >
              Support
            </h5>
          </div>
        </div>
        <Typography
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, red, aqua, silver, indigo, blue)",
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "'Tilt Prism', sans-serif",
          }}
          variant="h1"
          position={"absolute"}
          top={110}
          left={500}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color={"silver"}
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
            Latest Updates
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
                src={"/Agri-drone.jpg"}
                width={150}
                height={150}
                draggable="false"
                style={{ position: "relative", top: -2 }}
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
                Improved the Chatbot to respond to &quot;hi&quot; and
                &quot;hello&quot;
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                WebkitBackdropFilter: "blur(5px)",
                backdropFilter: "blur(5px)",
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
                alt="upd2"
                src={"/aic.jpg"}
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
                Added a slideable menu bar
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                WebkitBackdropFilter: "blur(5px)",
                backdropFilter: "blur(5px)",
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
                src={logo}
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
                Fixed the scroll on the chat page
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                WebkitBackdropFilter: "blur(5px)",
                backdropFilter: "blur(5px)",
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
                src={logo}
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
                Gave the homepage a new look
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
              Prime Cobra
            </a>
            <sup style={{ color: "black" }}>&reg;</sup>
          </p>
        </footer>
      </Stack>
    </Box>
  );
}
