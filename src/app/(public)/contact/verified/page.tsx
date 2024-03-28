"use client";
import { Box, Stack, Typography } from "@mui/material";
import "../../globalicons.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        }}
      >
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
            }}
          >
            You will be redirected in a few seconds. If you are not redirected{" "}
            <Link href={"/contact"} style={{ color: "rebeccapurple" }}>
              Click here
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
