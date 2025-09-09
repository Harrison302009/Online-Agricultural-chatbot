"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../globalicons.css";
import { NavBar } from "@/components/navbar/navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { PointBack, PointOut } from "@/components/mousecontrols/mousecontrol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function About() {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router, session.status]);
  const buttonChangeUp = () => {
    var contact = document.getElementById("contact") as HTMLButtonElement;
    contact.style.backgroundColor = "red";
    contact.style.color = "black";
    contact.style.transition = "1s ease-in-out";
  };
  const buttonChangeDown = () => {
    var contact = document.getElementById("contact") as HTMLButtonElement;
    contact.style.backgroundColor = "black";
    contact.style.color = "white";
    contact.style.transition = "1s ease-in-out";
  };

  const AlmightyContactForm = () => {
    var contact = document.getElementById(
      "contactOptionsBack",
    ) as HTMLDivElement;
    var innerMain = document.getElementById("contactOptions") as HTMLDivElement;
    contact.style.display = "flex";
    innerMain.style.animation = "comeOut 1s";
  };

  const discreteChanger = () => {
    var discord = document.getElementById("discordSection") as HTMLDivElement;
    discord.style.border = "2px solid #000";
    discord.style.transition = "0.5s ease-in-out";
  };

  const indescreteExit = () => {
    var discord = document.getElementById("discordSection") as HTMLDivElement;
    discord.style.border = "2px solid transparent";
    discord.style.transition = "0.5s ease-in-out";
  };

  const TwitterChanger = () => {
    var twitter = document.getElementById("twitterSection") as HTMLDivElement;
    twitter.style.border = "2px solid #000";
    twitter.style.transition = "0.5s ease-in-out";
  };
  const TwitterExit = () => {
    var twitter = document.getElementById("twitterSection") as HTMLDivElement;
    twitter.style.border = "2px solid transparent";
    twitter.style.transition = "0.5s ease-in-out";
  };
  const LinkedInCome = () => {
    var linkedin = document.getElementById("linkedinSection") as HTMLDivElement;
    linkedin.style.border = "2px solid #000";
    linkedin.style.transition = "0.5s ease-in-out";
  };
  const LinkedInExit = () => {
    var linkedin = document.getElementById("linkedinSection") as HTMLDivElement;
    linkedin.style.border = "2px solid transparent";
    linkedin.style.transition = "0.5s ease-in-out";
  };
  const ProfileSee = () => {
    var ppfp = document.getElementById("ppfpSection") as HTMLDivElement;
    var ppfpInsider = document.getElementById(
      "ppfpContact",
    ) as HTMLImageElement;
    ppfp.style.border = "2px solid #000";
    ppfp.style.transition = "0.5s ease-in-out";
    ppfpInsider.style.animation = "rotateS 0.5s infinite linear";
  };
  const AlreadySeen = () => {
    var ppfp = document.getElementById("ppfpSection") as HTMLDivElement;
    var ppfpInsider = document.getElementById(
      "ppfpContact",
    ) as HTMLImageElement;
    ppfp.style.border = "2px solid transparent";
    ppfp.style.transition = "0.5s ease-in-out";
    ppfpInsider.style.animation = "overDone 0.5s linear";
  };

  const checkLinkedin = () => {
    window.location.href =
      "https://www.linkedin.com/in/harrison-john-anozie-6766a7298?jobid=1234&lipi=urn%3Ali%3Apage%3Ad_jobs_easyapply_pdfgenresume%3BH88xVqqmR52WtSe7%2FkA6sA%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_jobs_easyapply_pdfgenresume-v02_profile";
  };

  const GoBack = () => {
    var contact = document.getElementById(
      "contactOptionsBack",
    ) as HTMLDivElement;
    var innerMain = document.getElementById("contactOptions") as HTMLDivElement;
    innerMain.style.animation = "glint 0.3s";
    setTimeout(() => {
      contact.style.display = "none";
    }, 280);
  };
  function ContributorList() {
    return (
      <Stack className="demo">
        <Stack className="container">
          <Stack className="row">
            <Stack className="col-md-4 col-sm-6">
              <Stack className="our-team">
                <Stack className="team_img">
                  <Image
                    alt="hja"
                    height={250}
                    width={250}
                    src={"/profile.png"}
                  ></Image>
                  <ul className="social">
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faDiscord}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                  </ul>
                </Stack>
                <Stack className="team-content">
                  <Typography variant="h4" className="title">
                    Harrison John-Anozie
                  </Typography>
                  <Typography variant="h6" className="post">
                    web designer & developer(frontend & backend)
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack className="col-md-4 col-sm-6">
              <Stack className="our-team">
                <Stack className="team_img">
                  <Image
                    alt="rtm"
                    height={250}
                    width={250}
                    src={"/rtm.jpg"}
                  ></Image>
                  <ul className="social">
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faXTwitter}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon
                          icon={faDiscord}
                          onMouseOver={PointOut}
                          onMouseOut={PointBack}
                        />
                      </a>
                    </li>
                  </ul>
                </Stack>
                <Stack className="team-content">
                  <Typography variant="h4" className="title">
                    Raphaël TM
                  </Typography>
                  <Typography variant="h6" className="post">
                    Web developer(backend)
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
  return (
    <Box>
      <Stack
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 0, 0, 0.3), rgba(255, 0, 255, 0.3), rgba(0, 0, 255, 0.3)),url('/ait.jpg')",
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
          <NavBar />
        </nav>
        <Stack
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            overflowX: "hidden",
            overflowY: "scroll",
            height: 500,
            width: 1100,
            top: 100,
            left: 100,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            style={{
              fontFamily: "'Indie Flower', cursive",
              color: "rgb(0, 245, 230)",
            }}
            onMouseOver={(e) => {
              var cursor = document.getElementById("mouse") as HTMLImageElement;
              cursor.srcset = "/text-cursor.png";
            }}
            onMouseOut={(d) => {
              var cursor = document.getElementById("mouse") as HTMLImageElement;
              cursor.srcset = "/cursor.png";
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h6"
            style={{
              fontFamily: "'Ojuju', sans-serif",
              color: "rgba(255, 0, 0, 1)",
            }}
            onMouseOver={(e) => {
              var cursor = document.getElementById("mouse") as HTMLImageElement;
              cursor.srcset = "/text-cursor.png";
            }}
            onMouseOut={(d) => {
              var cursor = document.getElementById("mouse") as HTMLImageElement;
              cursor.srcset = "/cursor.png";
            }}
          >
            In the heart of the digital agricultural revolution, our AI
            agricultural website stands as a pioneer in merging cutting-edge
            technology with age-old farming practices. With a passion for
            innovation and a commitment to sustainability, we have been at the
            forefront of harnessing the power of artificial intelligence to
            transform the way we cultivate the land and feed the world. Our
            journey began with a vision to bridge the gap between traditional
            farming methods and modern technological advancements, paving the
            way for a more efficient, productive, and environmentally conscious
            agricultural sector.{" "}
            <p>
              {" "}
              At our core, we are a team of dedicated experts in agriculture,
              data science, and artificial intelligence, united by a common goal
              to revolutionize the way food is grown and distributed. Through
              years of research, development, and hands-on experience in the
              field, we have honed our AI algorithms to optimize crop
              management, resource allocation, and decision-making processes for
              farmers of all scales. By leveraging the power of data analytics,
              predictive modeling, and machine learning, we empower farmers to
              make informed decisions that drive profitability while minimizing
              environmental impact.
            </p>
            <p>
              Our AI agricultural website serves as a digital hub where farmers
              can access cutting-edge tools, resources, and insights to enhance
              their farming practices. From precision agriculture techniques to
              smart irrigation systems, we offer a comprehensive suite of
              solutions tailored to meet the unique needs of modern agriculture.
              Through our platform, farmers can connect with industry experts,
              share best practices, and stay informed about the latest trends in
              AI technology for agriculture. Join us on this transformative
              journey as we continue to shape the future of farming through
              innovation, sustainability, and collaboration.
            </p>
            <p>
              With a deep-rooted commitment to sustainability and a relentless
              pursuit of excellence, our AI agricultural website is dedicated to
              empowering farmers with the tools they need to thrive in an
              ever-evolving industry. Together, we are reimagining agriculture
              for a brighter tomorrow – one where technology and tradition
              harmoniously coexist to feed a growing population while preserving
              our planet for future generations. Welcome to our community where
              innovation meets cultivation, and together, we sow the seeds of
              progress in the fields of tomorrow.
            </p>
          </Typography>
          <Stack
            style={{
              display: "flex",
              position: "relative",
              gap: 12,
              left: "20%",
            }}
          >
            <Typography
              variant="h1"
              style={{
                display: "flex",
                position: "relative",
                width: "65%",
                alignItems: "center",
                justifyContent: "center",
                color: "palevioletred",
              }}
            >
              Contributors
            </Typography>
            <ContributorList />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
