"use client";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Drawer,
  ListItem,
  ListItemButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GlobalCard } from "../../components/cards/cards";
import { redirect, useRouter } from "next/navigation";
import { data } from "../../components/countries/countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MenuBar } from "@/components/menubar/menubar";
import MobileDisplay from "../../components/mobile-display/mobile-display";
import TabletDisplay from "../../components/tablet-display/tablet-display";

export default function Container() {
  const [loaded, setLoaded] = useState(false);
  const [icon, setIcon] = useState("");
  const [warningMessage, setWarningMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [miniWeather, setMiniWeather] = useState(Number);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherMessage, setWeatherMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [admin, setAdmin] = useState(false);
  const [content, setContent] = useState("");
  const [countryLoaded, setCountryLoaded] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [userCountry, setUserCountry] = useState();
  const [userState, setUserState] = useState();
  const session = useSession();
  const router = useRouter();
  console.log(`Username: ${session.status}`);
  const handleOpen = () => {
    setOpen(true);
    updateCountry();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkRole = async () => {
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };
  const updateCountry = async () => {
    const response = await fetch("/api/country", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ userCountry }),
    });
    if (response.ok) {
      console.log(
        `Data collected successfully. Your country is ${session.data?.user.country}`,
      );
    } else {
      console.error("Failed to gather user's country");
    }
  };
  useEffect(() => {
    const findUserCountryData = data.find(
      (item) => item.country === userCountry,
    );

    if (findUserCountryData) {
      console.log(`Your country is ${findUserCountryData.percentage}`);
      console.log(typeof weatherData);
      setIcon("agriculture");
      setSubject(`${findUserCountryData.percentage}%`);
      setContent(`${findUserCountryData.content}`);
      const updateCountry = async () => {
        const response = await fetch("/api/country", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ userCountry }),
        });
        if (response.ok) {
          console.log(
            `Data collected successfully. Your country is ${session.data?.user.country}`,
          );
        } else {
          console.error("Failed to gather user's country");
        }
      };
      updateCountry();
    } else {
      setIcon("error");
      setSubject(`Error`);
      setContent("We don't support your country");
    }
  }, [userCountry, weatherData, session.data?.user]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [session.status]);
  useEffect(() => {
    if (miniWeather <= 27 && miniWeather >= 0) {
      setWeatherIcon("rainy");
      setWeatherMessage("Expect frequent rain showers ");
    } else if (miniWeather <= 30 && miniWeather >= 25) {
      setWeatherIcon("partly_cloudy_day");
      setWeatherMessage("Expect partly cloudy skies");
    } else if (miniWeather <= 20 && miniWeather >= 10) {
      setWeatherIcon("filter_drama");
      setWeatherMessage("Expect mostly cloudy skies");
    } else if (miniWeather >= 28) {
      setWeatherIcon("sunny");
      setWeatherMessage("Expect clear skies and sunshine");
    } else if (miniWeather >= 41) {
      setWeatherIcon("sunny");
      setWeatherMessage("Expect intense, blazing sunshine");
    } else {
      setWeatherIcon("cloud");
    }
  }, [miniWeather]);
  useEffect(() => {
    if (session.status === "authenticated" && !session.data?.user?.name) {
      setWarningMessage(true);
      console.log("New User Detected");
    }
  }, [session.data?.user?.name, session.status]);
  useEffect(() => {
    if (session.status === "authenticated") {
      checkRole();
    }
  }, [session.status]);
  interface WeatherData {
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  }

  interface WeatherSidebarProps {
    weatherData: WeatherData | null;
  }

  const fetchWeather = async (latitude: number, longitude: number) => {
    const apiKey = "681a847ebddfec8c90bc96ae7e0af34e";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const WeatherSidebar: React.FC<WeatherSidebarProps> = ({ weatherData }) => {
    if (!weatherData) return null;
    const currentWeather = weatherData.main.temp - 273.15;
    setMiniWeather(currentWeather);
    return (
      <Typography
        variant="h6"
        sx={{
          color: "#fff",
          display: {
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
          width: "fit-content",
          position: "absolute",
          top: "39%",
          left: "4%",
          fontFamily: "cursive",
          fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 21 },
        }}
      >
        It&apos;s currently {currentWeather.toFixed(1)}
        <sup>o</sup>C in {userState}
      </Typography>
    );
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const weather = await fetchWeather(latitude, longitude);
      setWeatherData(weather);
    });
  }, []);
  useEffect(() => {
    if (weatherData) {
      setWeatherLoaded(true);
    }
  }, [weatherData]);

  useEffect(() => {
    if (userCountry) {
      setCountryLoaded(true);
    }
  }, [userCountry]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;

      fetchUserCountry(latitude, longitude);
    });
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;

      fetchUserState(latitude, longitude);
    });
  }, []);
  const fetchUserState = async (latitude: number, longitude: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "570ee4b49ecf4bf786052677c5f4a082";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&pretty=1`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results.length > 0) {
            setUserState(data.results[0].components.state);
          }
        } catch (error) {
          console.error("Error fetching user country:", error);
        }
      });
    }
  };
  const fetchUserCountry = async (latitude: number, longitude: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "570ee4b49ecf4bf786052677c5f4a082";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&pretty=1`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results.length > 0) {
            setUserCountry(data.results[0].components.country);
          }
        } catch (error) {
          console.error("Error fetching user country:", error);
        }
      });
    }
  };

  return (
    <Box>
      <MobileDisplay />
      <TabletDisplay />
      <Stack
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "none",
          },
          position: "relative",
          width: "100%",
          backgroundColor: "black",
          color: "#fff",
        }}
      >
        <Drawer
          open={open}
          onClose={handleClose}
          anchor="right"
          PaperProps={{
            sx: { width: { xs: 75, sm: 100, md: 150, lg: 250, xl: 350 } },
          }}
        >
          <MenuBar />
        </Drawer>
        <Dialog open={warningMessage}>
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
            <CardHeader title="New User Detected" />
            <CardMedia
              component="img"
              height={190}
              image="/new-user-model.png"
              alt="New User Detcted"
              draggable="false"
            />
            <CardContent>
              <Typography
                variant="body2"
                fontFamily={"monospace"}
                className="weatherHolder"
              >
                It appears you don&apos;t have a name yet. Try adding a name to
                your account to help other users recognize who you are
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
                  onClick={() => setWarningMessage(!warningMessage)}
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
                    border: "1px solid brown",
                    width: "67%",
                    display: "flex",
                    position: "relative",
                    float: "right",
                    alignContent: "end",
                  }}
                  onClick={() => router.push("/settings")}
                >
                  Add name
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Dialog>
        <Stack
          sx={{ display: "flex", position: "relative", flexDirection: "row" }}
        >
          <Image
            src={"/ai.jpg"}
            alt="ai"
            height={100}
            width={100}
            style={{ display: "block", visibility: "hidden" }}
            onLoad={() => setLoaded(true)}
          ></Image>
          <Skeleton
            variant="text"
            sx={{
              display: loaded ? "none" : "block",
              position: "absolute",
              top: "4%",
              left: "4%",
              bgcolor: "grey.900",
              fontsize: "5rem",
            }}
            height={50}
            width={150}
          ></Skeleton>
          <Typography
            variant="h6"
            sx={{
              display: "block",
              visibility: loaded ? "visible" : "hidden",
              position: "absolute",
              top: "4%",
              left: "4%",
            }}
          >
            Hi{" "}
            {session.data?.user?.name ||
              `${session.data?.user?.email?.substring(0, 4)}`}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              position: "absolute",
              right: "4%",
              top: "25%",
            }}
          >
            <Avatar
              sx={{
                height: { xs: 25, md: 29, lg: 32, xl: 150 },
                width: { xs: 25, md: 29, lg: 32, xl: 150 },
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              <Typography variant="h6">
                {session.data?.user?.name?.toUpperCase().substring(0, 1) ||
                  session.data?.user?.email?.toUpperCase().substring(0, 1)}
              </Typography>
            </Avatar>
          </Stack>
        </Stack>
        {loaded ? (
          <WeatherSidebar weatherData={weatherData} />
        ) : (
          <Skeleton
            variant="text"
            width={250}
            height={50}
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
                xl: "none",
              },
              bgcolor: "grey.900",
              position: "absolute",
              top: "43%",
              left: "4%",
            }}
          ></Skeleton>
        )}
      </Stack>
      <Stack
        sx={{
          display: "Flex",
          position: "relative",
          flexDirection: "column",
          gap: 9,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <GlobalCard
            icon={"grid_view"}
            subject="5+"
            content="Users have connected"
          ></GlobalCard>
          <GlobalCard
            icon={"commit"}
            subject="5.7%"
            content="Active users on the site"
          ></GlobalCard>
          <GlobalCard
            icon={"sentiment_satisfied"}
            subject="2.5/5"
            content="User satisfaction rating"
          ></GlobalCard>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {countryLoaded ? (
            <GlobalCard icon={icon} subject={subject} content={content} />
          ) : (
            <Skeleton
              variant="text"
              width={"25%"}
              height={300}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            ></Skeleton>
          )}
          <GlobalCard
            icon="grass"
            subject="56%"
            content="Increase in global crop production"
          />
          {weatherLoaded ? (
            <GlobalCard
              icon={weatherIcon}
              subject={`${miniWeather.toFixed(1)}°C`}
              content={weatherMessage}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              height={200}
              width={300}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            ></Skeleton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}