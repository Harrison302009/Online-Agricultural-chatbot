import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import router from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { rotarySwitch, rotaryUnit } from "../rotary-unit/rotary-unit";
import { PointBack, PointOut } from "../mousecontrols/mousecontrol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudShowersWater } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  const Home = () => {
    window.location.href = "/";
  };
  const Contact = () => {
    window.location.href = "/contact";
  };
  const About = () => {
    window.location.href = "/about";
  };
  const Chat = () => {
    window.location.href = "/chat";
  };
  const Bot = () => {
    window.location.href = "/dashboard";
  };
  const weather = () => {
    router.push("/weather");
  };
  const pStyling: React.CSSProperties = {
    color: "gray",
    fontFamily: "'Indie Flower', cursive",
    cursor: "none",
  };
  return (
    <Stack>
      <nav
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          wordSpacing: 2,
          gap: 5,
        }}
      >
        <span className="material-symbols-outlined">home</span>
        <p
          style={pStyling}
          id="home"
          onClick={Home}
          onMouseOver={PointOut}
          onMouseOut={PointBack}
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
          style={pStyling}
          onClick={Contact}
          onMouseOver={PointOut}
          onMouseOut={PointBack}
        >
          Contact us
        </p>
        <span className="material-symbols-outlined" style={{ marginLeft: 30 }}>
          local_library
        </span>
        <p
          style={pStyling}
          onClick={About}
          onMouseOver={PointOut}
          onMouseOut={PointBack}
        >
          About us
        </p>
        <span className="material-symbols-outlined" style={{ marginLeft: 50 }}>
          chat
        </span>
        <p
          id="chats"
          style={pStyling}
          onClick={Chat}
          onMouseOver={PointOut}
          onMouseOut={PointBack}
        >
          P2P Chat
        </p>
        <span className="material-symbols-outlined" style={{ marginLeft: 50 }}>
          forum
        </span>
        <p
          id="p2b"
          style={pStyling}
          onClick={Bot}
          onMouseOver={PointOut}
          onMouseOut={PointBack}
        >
          Chats & Privacy
        </p>
        <span>
          <FontAwesomeIcon
            icon={faCloudShowersWater}
            style={{ marginLeft: 40 }}
          />
        </span>
        <p
          style={pStyling}
          onClick={weather}
          onMouseOver={PointOut}
          onMouseOut={PointBack}
        >
          Weather Forecast
        </p>
        <Stack
          direction="row"
          justifyContent="flex-end"
          style={{ cursor: "none" }}
        >
          <Button
            variant="contained"
            id="button"
            style={{ backgroundColor: "black", left: 130, cursor: "none" }}
            onClick={(r) => {
              window.location.href = "/auth/logout";
            }}
            onMouseOver={(s) => {
              var mouse = document.getElementById("mouse") as HTMLImageElement;
              var button = document.getElementById(
                "button",
              ) as HTMLButtonElement;
              button.style.backgroundColor = "red";
              button.style.color = "black";
              button.style.transition = "1s ease-in-out";
              mouse.srcset = "/pointer.png";
              (mouse.height = 30), (mouse.width = 20);
            }}
            onMouseOut={(u) => {
              var mouse = document.getElementById("mouse") as HTMLImageElement;
              var button = document.getElementById(
                "button",
              ) as HTMLButtonElement;
              button.style.backgroundColor = "black";
              button.style.color = "white";
              button.style.transition = "1s ease-in-out";
              mouse.srcset = "/cursor.png";
              (mouse.height = 30), (mouse.width = 30);
            }}
          >
            Logout
          </Button>
        </Stack>
      </nav>
      <span
        id="settings"
        className="material-symbols-outlined"
        style={{ color: "white", position: "absolute", right: 7, top: 10 }}
        onClick={(j) => {
          window.location.href = "/settings";
        }}
        onMouseOver={PointOut}
        onMouseEnter={rotaryUnit}
        onMouseLeave={rotarySwitch}
        onMouseOut={PointBack}
      >
        settings
      </span>
    </Stack>
  );
}
