"use client";
import Drawer from "@mui/material/Drawer";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { data } from "../countries/countries";
import Marquee from "react-fast-marquee";
import { useSession } from "next-auth/react";
import { MenuBar } from "@/components/menubar/menubar";

export default function MobileDisplay() {
  const [loaded, setLoaded] = useState(false);
  const [userCountry, setUserCountry] = useState();
  const [userState, setUserState] = useState();
  const [weatherData, setWeatherData] = useState(null);
  const [countryLoaded, setCountryLoaded] = useState(false);
  const [miniWeather, setMiniWeather] = useState(Number);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [weatherMessage, setWeatherMessage] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [altOpen, setAltOpen] = useState(false);
  const [subText, setSubText] = useState("");
  const session = useSession();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const weather = await fetchWeather(latitude, longitude);
      setWeatherData(weather);
    });
  }, []);
  useEffect(() => {
    if (userCountry) {
      setCountryLoaded(true);
    }
  }, [userCountry]);
  useEffect(() => {
    const countryData = data.find((item) => item.country === userCountry);
    if (countryData) {
      setText(`Recently, there was a ${countryData.percentage}%`);
      setSubText(`${countryData.content} in`);
    } else {
      setText(`We don't support your country`);
      setSubText("");
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
  useEffect(() => {
    if (weatherMessage) {
      setWeatherLoaded(true);
    }
  }, [weatherMessage]);
  useEffect(() => {
    if (miniWeather <= 27 && miniWeather >= 0) {
      setWeatherMessage("Expect frequent rain showers ");
    } else if (miniWeather <= 30 && miniWeather >= 25) {
      setWeatherMessage("Expect partly cloudy skies");
    } else if (miniWeather <= 20 && miniWeather >= 10) {
      setWeatherMessage("Expect mostly cloudy skies");
    } else if (miniWeather >= 28) {
      setWeatherMessage("Expect clear skies and sunshine");
    } else if (miniWeather >= 41) {
      setWeatherMessage("Expect intense, blazing sunshine");
    } else {
      setWeatherMessage(`Unable to detect weather in ${userCountry}`);
    }
  }, [miniWeather, userCountry]);
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
          display: "flex",
          position: "absolute",
          width: "fit-content",
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
  return (
    <Stack
      sx={{
        display: { xs: "flex", sm: "none", md: "none", lg: "none", xl: "none" },
        position: "absolute",
        width: "100%",
      }}
    >
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <MenuBar />
      </SwipeableDrawer>
      <Drawer anchor="right" open={altOpen} onClose={() => setAltOpen(false)}>
        <MenuBar />
      </Drawer>
      <Stack
        sx={{
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
            lg: "none",
            xl: "none",
          },
          position: "relative",
          width: { xs: "100%", sm: "100%", md: "100%" },
          backgroundColor: "black",
          color: "#fff",
          zIndex: 10,
        }}
      >
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
            onClick={() => setAltOpen(true)}
          >
            <Avatar
              sx={{
                height: { xs: 25, md: 29, lg: 32, xl: 150 },
                width: { xs: 25, md: 29, lg: 32, xl: 150 },
              }}
              onClick={() => setAltOpen(true)}
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
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
            lg: "none",
            xl: "none",
          },
          position: "relative",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Image
          src={"/profile.png"}
          alt="ig"
          height={20}
          width={20}
          onLoad={() => setLoaded(true)}
          style={{
            display: "block",
            visibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></Image>
        {loaded ? (
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Caveat', cursive",
              fontOpticalSizing: "auto",
              fontWeight: 300,
              fontStyle: "normal",
            }}
          >
            Latest News
          </Typography>
        ) : (
          <Skeleton variant="text" height={30} width={150}></Skeleton>
        )}
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "90vh",
          }}
        >
          {countryLoaded ? (
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                position: "absolute",
                top: "5%",
                left: "1%",
                fontFamily: "'Nerko One', cursive",
                fontWeight: 300,
                fontStyle: "normal",
                width: "100%",
                textWrap: "nowrap",
              }}
            >
              {text}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              height={30}
              width={250}
              sx={{
                display: "flex",
                position: "absolute",
                top: "5%",
                left: "1%",
              }}
            ></Skeleton>
          )}
          {countryLoaded ? (
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                position: "absolute",
                top: { xs: "8%", sm: "5%" },
                left: { xs: "1%", sm: "30%" },
                fontFamily: "'Nerko One', cursive",
                fontWeight: 300,
                fontStyle: "normal",
                width: "100%",
                textWrap: "nowrap",
              }}
            >
              {subText}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              height={30}
              width={250}
              sx={{
                display: "flex",
                position: "absolute",
                top: { xs: "10%", sm: "5%" },
                left: { xs: "1%", sm: "33%" },
              }}
            ></Skeleton>
          )}
          {countryLoaded ? (
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                position: "absolute",
                top: { xs: "11%", sm: "5%" },
                left: { xs: "1%", sm: "67%" },
                fontFamily: "'Nerko One', cursive",
                fontWeight: 300,
                fontStyle: "normal",
                width: "100%",
                textWrap: "nowrap",
              }}
            >
              {userCountry}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              height={30}
              width={100}
              sx={{
                display: "flex",
                position: "absolute",
                top: "15%",
                left: "1%",
              }}
            ></Skeleton>
          )}
          <br />
          {loaded ? (
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                position: "absolute",
                width: "100%",
                textWrap: "nowrap",
                top: "19%",
                left: "1%",
                fontFamily: "'Caveat', cursive",
                fontOpticalSizing: "auto",
                fontWeight: 300,
                fontStyle: "normal",
              }}
            >
              Weather Information
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              height={30}
              width={200}
              sx={{
                display: "flex",
                position: "absolute",
                top: "19%",
                left: "1%",
              }}
            ></Skeleton>
          )}
          {weatherLoaded ? (
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                position: "absolute",
                top: "23%",
                left: "1%",
                fontFamily: "'Nerko One', cursive",
                fontWeight: 300,
                fontStyle: "normal",
                width: "100%",
                textWrap: "nowrap",
              }}
            >
              {weatherMessage}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              height={30}
              width={200}
              sx={{
                display: "flex",
                position: "absolute",
                top: "23%",
                left: "1%",
              }}
            ></Skeleton>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
