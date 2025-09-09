"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "../../globalicons.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Returned() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/contact");
  }, 5000);
  return (
    <Box>
      <Stack
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 0, 0, 0.3), rgba(255, 0, 255, 0.3), rgba(0, 0, 255, 0.3)),url('https://wallpapercave.com/wp/wp6944127.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
          cursor: "none",
          overflow: "hidden",
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
        <Stack
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            top: 260,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 100,
              backgroundColor: "green",
              width: 100,
              height: 100,
              textAlign: "center",
              borderRadius: 50,
              color: "white",
            }}
          >
            check
          </span>
          <Typography
            variant="h2"
            style={{
              backgroundImage:
                "linear-gradient(to left, red, aqua, gold, brown, indigo)",
              WebkitBackgroundClip: "text",
              MozBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              cursor: "none",
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
            Sent
          </Typography>
        </Stack>
        <Stack
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            top: 260,
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: "ivory",
              cursor: "none",
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
            You will be redirected in a few seconds. If you are not redirected{" "}
            <Link
              href={"/contact"}
              style={{ color: "rebeccapurple", cursor: "none" }}
              onMouseOver={(r) => {
                var cursor = document.getElementById(
                  "mouse",
                ) as HTMLImageElement;
                var pointer = document.getElementById(
                  "pointer",
                ) as HTMLImageElement;
                cursor.style.display = "none";
                pointer.style.display = "block";
              }}
              onMouseOut={(e) => {
                var cursor = document.getElementById(
                  "mouse",
                ) as HTMLImageElement;
                var pointer = document.getElementById(
                  "pointer",
                ) as HTMLImageElement;
                cursor.style.display = "block";
                pointer.style.display = "none";
              }}
            >
              Click here
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
