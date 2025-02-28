"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import "./globalicons.css";
import Holder from "@/components/big-component/big-component";
import { useState, useEffect } from "react";
import { LatestNews } from "@/components/big-component/country-news";
import { useSession } from "next-auth/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import mixpanel from "mixpanel-browser";
import usePusher from "@/modules/hooks/pusher/pusher";

export default function Home() {
  usePusher();
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }
  }, []);
  useEffect(() => {
    mixpanel.init(`${process.env.MIXPANEL_TOKEN}`, {
      debug: true,
      track_pageview: true,
      ignore_dnt: true,
    });
    mixpanel.track("Page View");
  });
  useEffect(() => {
    console.log(mixpanel.track("Page View"));
    console.log("What's wrong");
    gsap.to(".project", {
      rotation: 360,
      duration: 2,
      ease: "elastic.inOut(1, 0.3)",
      scrollTrigger: {
        trigger: ".project",
        toggleActions: "restart none none none",
        start: "2% 32%",
        end: "bottom 9%",
        markers: false,
        scrub: true,
      },
    });
    gsap.to(".overview", {
      text: {
        value: "Overview",
      },
      scale: 1.5,
      duration: 2,
      ease: "elastic.inOut(1, 0.3)",
      scrollTrigger: {
        trigger: ".project",
        toggleActions: "restart none none none",
        start: "2% 32%",
        end: "bottom 9%",
        markers: false,
        scrub: true,
      },
    });
    gsap.to(".goals", {
      opacity: 1,
      transition: "1s",
      duration: 2,
      ease: "elastic.inOut(1, 0.3)",
      scrollTrigger: {
        trigger: ".project",
        toggleActions: "restart none none none",
        start: "380 32%",
        end: "bottom 9%",
        markers: false,
        scrub: true,
      },
    });
    gsap.to("#aiculture", {
      color: "green",
      ease: "elastic.inOut(1, 0.3)",
      scrollTrigger: {
        trigger: "#aiculture",
        toggleActions: "restart none none none",
        start: "7% 0%",
        end: "bottom 9%",
        markers: false,
        scrub: true,
      },
    });
  }, []);
  gsap.registerPlugin(
    useGSAP,
    Flip,
    ScrollTrigger,
    Observer,
    ScrollToPlugin,
    Draggable,
    MotionPathPlugin,
    EaselPlugin,
    PixiPlugin,
    TextPlugin,
    CustomEase,
  );
  const [location, setLocation] = useState({
    country: "",
    country_name: null,
    region: "",
    ip: null,
    city: "",
    latitude: null,
    longitude: null,
    postal_code: null,
    timezone: null,
    continent: null,
    start_ip: null,
    end_ip: null,
    join_key: null,
  });
  const [news, setNews] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const session = useSession();
  useEffect(() => {
    async function fetchLocation() {
      const res = await fetch("/api/ip");
      const data = await res.json();
      setLocation(data);
    }

    fetchLocation();
  }, []);
  useEffect(() => {
    if (location) {
      const gist = LatestNews.find((item) => item.country === location.country);
      if (gist) {
        setNews(gist.news);
        setCountry(gist.full);
      } else {
        setNews(["Fetching news from your country..."]);
        setCountry("Unrecognized");
      }
    }
  }, [location]);
  useEffect(() => {
    setUpdate(true);
  }, []);
  return (
    <Box>
      <Stack id="boundary">
        <Dialog open={update}>
          <Card
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              maxWidth: 375,
              height: 375,
              overflowY: "auto",
            }}
          >
            <CardHeader title="Update In Progress" />
            <CardMedia
              component="img"
              height={190}
              image="/update.jpg"
              alt="Update in progress"
              draggable="false"
            />
            <CardContent>
              <Typography
                variant="body2"
                fontFamily={"monospace"}
                className="weatherHolder"
                fontWeight={400}
              >
                Dear Users,
                <br />
                <br />
                We are excited to inform you that AICulture is currently
                undergoing updates to enhance your overall experience. Our team
                is diligently working on reworking the home/landing page and the
                login page, ensuring no layout issues, and integrating new
                features to better serve your needs.
                <br />
                <br />
                During this update period, you may experience some temporary
                disruptions in functionality. Additionally, please note that
                logging in to the site will not be possible for now. We
                apologize for any inconvenience this may cause and appreciate
                your understanding and patience as we strive to improve our
                platform.
                <br />
                <br />
                We are committed to providing you with the best possible
                service, and these updates are part of our ongoing efforts to
                make AICulture even more beneficial for you.
                <br />
                <br />
                Thank you for your continued support! AICulture Team
              </Typography>
            </CardContent>
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <Stack
                sx={{ display: "flex", position: "relative", width: "50%" }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid brown",
                    width: "67%",
                    display: "flex",
                    position: "relative",
                    float: "right",
                    alignContent: "end",
                  }}
                  onClick={() => setUpdate(!update)}
                >
                  Cancel
                </Button>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  width: "50%",
                  alignItems: "end",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid gold",
                    width: "67%",
                    display: "flex",
                    position: "relative",
                    float: "right",
                    alignContent: "end",
                  }}
                  href="https://github.com/Harrison302009/Online-Agricultural-chatbot/wiki/AI-Wiki#ongoing-updates"
                  target="_blank"
                >
                  Updates
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Dialog>
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            top: 4,
            right: 5,
            flexDirection: "row",
            gap: 1,
            zIndex: 5,
          }}
        >
          <Button variant="outlined" color="primary" href="/auth/login">
            Login
          </Button>
          <Button variant="outlined" color="warning" href="/auth/register">
            Create an account
          </Button>
        </Stack>
        <Typography
          variant="h1"
          id="aiculture"
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Tilt Warp', sans-serif",
            fontWeight: 400,
            color: "#1d3131",
            fontSize: { xs: 49, sm: 68, md: 74, lg: 79, xl: 90 },
          }}
        >
          AICulture
        </Typography>
        <br />
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 400,
            color: "#1d3131",
            fontSize: { xs: 18, sm: 20, md: 26, lg: 32 },
          }}
        >
          Unlocking the future of farmers with AI ingenuity
        </Typography>
        <br />
        <hr />
        <br />
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            gap: 2,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              position: "relative",
              width: "fit-content",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Tilt Warp', sans-serif",
              fontWeight: 400,
              wordSpacing: 100,
              color: "#1d3131",
              fontSize: { xs: 39, sm: 48, md: 52, lg: 67 },
            }}
            className="project"
          >
            Project
          </Typography>
          <Typography
            variant="h2"
            className="overview"
            sx={{
              display: "flex",
              position: "relative",
              width: "fit-content",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Tilt Warp', sans-serif",
              fontWeight: 400,
              wordSpacing: 100,
              color: "#6ad248",
              fontSize: { xs: 39, sm: 48, md: 52, lg: 67 },
            }}
          >
            Overview
          </Typography>
        </Stack>
        <br />
        <hr />
        <br />
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            position: "relative",
            width: { xs: "100%", sm: "100%", md: "40%", lg: "40%", xl: "40%" },
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Quicksand', sans-serif",
            color: "#873fff",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          About the Project
        </Typography>
        <br />
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: { xs: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" },
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Quicksand', sans-serif",
            color: "#873fff",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          <Typography
            variant="h6"
            className="AIdescription"
            sx={{
              display: "flex",
              position: "relative",
              width: {
                xs: "100%",
                sm: "100%",
                md: "72%",
                lg: "72%",
                xl: "72%",
              },
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Quicksand', sans-serif",
              color: "#747d7f",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            AICulture is a cutting-edge technology project dedicated to
            unlocking the future of farmers with AI ingenuity. Our mission is to
            create innovative solutions that empower small-scale farmers to
            thrive.
          </Typography>
        </Stack>
        <br />
        <Stack
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Holder
            primaryColor="rgb(242,251,255)"
            secondaryColor="rgb(255, 255, 255)"
            borderColor="5ab1ff"
            image="farmer"
            topic="Project Goal"
            topicColor="5bb4fd"
          >
            <ul
              className="goals"
              style={{
                display: "flex",
                color: "#667272",
                fontSize: 20,
                flexDirection: "column",
                gap: 13,
                opacity: 0,
              }}
            >
              <li>
                AICulture trims the knowledge gap by providing information
              </li>
              <br />
              <li>
                AICulture provides up-to-date agricultural data worldwide and in
                users&apos; countries to inform decision-making and strategy
              </li>
              <br />
              <li>
                AICulture offers precise weather forecasts to help farmers plan
                and optimize their activities based on weather conditions
              </li>
              <br />
              <li>
                AICulture uses chatbots and decentralized chat to provide
                real-time support and advice to farmers and stakeholders,
                enabling quick and efficient communication
              </li>
            </ul>
          </Holder>
        </Stack>
        <br />
        <Stack
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Holder
            primaryColor="rgb(253,247,245)"
            secondaryColor="rgb(255, 255, 255)"
            borderColor="e63431"
            image="suffering"
            topic={`Problem Statement (${location.city})`}
            topicColor="e53a30"
          >
            <ul
              style={{
                display: "flex",
                color: "#667272",
                fontSize: 20,
                flexDirection: "column",
                gap: 13,
              }}
            >
              {news.map((gist) => (
                <li key={session.data?.user.id}>{gist}</li>
              ))}
            </ul>
          </Holder>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            gap: 2,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              position: "relative",
              width: "fit-content",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Tilt Warp', sans-serif",
              fontWeight: 400,
              wordSpacing: 100,
              color: "#1d3131",
              fontSize: { xs: 39, sm: 48, md: 52, lg: 67 },
            }}
          >
            User
          </Typography>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              position: "relative",
              width: "fit-content",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Tilt Warp', sans-serif",
              fontWeight: 400,
              wordSpacing: 100,
              color: "#6ad248",
              fontSize: { xs: 39, sm: 48, md: 52, lg: 67 },
            }}
          >
            Research
          </Typography>
        </Stack>
        <br />
        <Stack
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            position: "relative",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Holder
            primaryColor="rgb(225,248,222)"
            secondaryColor="rgb(255,255,255)"
            borderColor="65cf34"
            topic="Research Objective"
            topicColor="65cf34"
            classname="research"
            width={"40%"}
          >
            <Typography variant="body1" sx={{ color: "#787f82" }}>
              To understand user backgrounds, interests, needs and sore spots.
              Attitudes and behaviors of users who sell products online
            </Typography>
          </Holder>
          <Holder
            primaryColor="rgb(233,217,255)"
            secondaryColor="rgb(255,255,255)"
            borderColor="7a1aff"
            topic="Qualitative Research"
            classname="qualitative"
            topicColor="7a1aff"
            width={"40%"}
            height="60%"
          >
            <Typography variant="body1" sx={{ color: "#787f82", height: 50 }}>
              To explore and analyze the motivations, challenges, and
              aspirations of individuals participating in community farming.
            </Typography>
          </Holder>
        </Stack>
        <br />
        <Stack
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            position: "relative",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Holder
            classname="quanitative"
            primaryColor="rgb(248,220,213)"
            secondaryColor="rgb(255,255,255)"
            borderColor="e63530"
            topic="Quantitative Research"
            topicColor="e63530"
            width={"40%"}
          >
            <Typography variant="body1" sx={{ color: "#787f82" }}>
              To measure the efficiency and impact of an agricultural platform
              on farmers&apos; productivity and profitability.
            </Typography>
          </Holder>
          <Holder
            classname="timeline"
            primaryColor="rgb(252,242,201)"
            secondaryColor="rgb(255,255,255)"
            borderColor="ee9c23"
            topic="Timeline"
            topicColor="ee9c23"
            width={"40%"}
            height="60%"
          >
            <Typography variant="body1" sx={{ color: "#787f82" }}>
              To measure the efficiency and impact of an agricultural platform
              on farmers&apos; productivity and profitability.
            </Typography>
          </Holder>
        </Stack>
        <Stack
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none",
              lg: "none",
              xl: "none",
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              position: "relative",
              color: "#65cf34",
            }}
          >
            Research Objective
          </Typography>
          <Typography variant="body1" sx={{ color: "#787f82" }}>
            To understand user backgrounds, interests, needs and sore spots.
            Attitudes and behaviors of users who sell products online
          </Typography>
          <br />
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              position: "relative",
              color: "#7a1aff",
            }}
          >
            Qualitative Research
          </Typography>
          <Typography variant="body1" sx={{ color: "#787f82", height: 50 }}>
            To explore and analyze the motivations, challenges, and aspirations
            of individuals participating in community farming initiatives.
          </Typography>
          <br />
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              position: "relative",
              color: "#e63530",
            }}
          >
            Quantitative Research
          </Typography>
          <Typography variant="body1" sx={{ color: "#787f82" }}>
            To measure the efficiency and impact of an agricultural platform on
            farmers&apos; productivity and profitability.
          </Typography>
          <br />
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              position: "relative",
              color: "#ee9c23",
            }}
          >
            Timeline
          </Typography>
          <Typography variant="body1" sx={{ color: "#787f82" }}>
            To measure the efficiency and impact of an agricultural platform on
            farmers&apos; productivity and profitability.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
