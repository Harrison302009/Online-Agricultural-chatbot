"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  Drawer,
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
import { MenuBar } from "@/components/menubar/menubar";
import MobileDisplay from "../../components/mobile-display/mobile-display";
import usePusher from "@/modules/hooks/pusher/pusher";
import TabletDisplay from "../../components/tablet-display/tablet-display";
import { CldImage } from "next-cloudinary";
import {Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import mixpanel from "mixpanel-browser";
import {
  CssVarsProvider,
  Modal,
  ModalClose,
  ModalDialog,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
} from "@mui/joy";
import { UpdateStatus } from "@/modules/status/actions";
import LoadingSequence from "@/components/loading/sequence";
import { useAtom } from "jotai";
import { currencySymbol, pricer } from "@/app/prices/prices";

type User = {
  id: string;
  email: string;
  name: string;
  country: string;
  image: string;
};

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)
export default function Container() {
  usePusher();
  const [loaded, setLoaded] = useState(false);
  const [icon, setIcon] = useState("");
  const [warningMessage, setWarningMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [miniWeather, setMiniWeather] = useState(Number);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherMessage, setWeatherMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [percentage, setPercentage] = useState("");
  const [user, setUser] = useState(0);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState({
    street: null,
    city: null,
    state: null,
    country: null,
  });
  const [userDisplay, setUserDisplay] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [countryLoaded, setCountryLoaded] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersAvailable, setUsersAvailable] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [userState, setUserState] = useState();
  const [currency, setCurrency] = useAtom(currencySymbol)
  const session = useSession();
  const router = useRouter();
  const [prices, setPrices] = useAtom(pricer);
  const [count, setCount] = useState(0);
  const [percount, setPercount] = useState(0.0);
  const perstep = 0.1;
  const targetValue = user;
  const percentValue = parseInt(percentage);
  const incrementSpeed = 50;
  const perspeed = 50;
  const step = 1;
  useEffect(() => {
    const userPlace = data.find((country) => country.country === session.data?.user.country);
    if (userPlace && userPlace.price) {
      setPrices(userPlace.price);
      setCurrency(userPlace.symbol);
    } else {
      setPrices([]); // Fallback to an empty array if no price is found
    }
  }, [session.data?.user.country])
  const GetUsers = async () => {
    const APIContact = await fetch("/api/user/fetch-users", {
      method: "GET",
    });
    if (APIContact.ok) {
      const data: User[] = await APIContact.json();
      setUsers(data);
    }
  };
  const GetOnlineUsers = async () => {
    const APIContact = await fetch("/api/user/fetch-online-users", {
      method: "GET",
    });
    if (APIContact.ok) {
      const data: User[] = await APIContact.json();
      setOnlineUsers(data);
      if (data.length > 0) {
        setUsersAvailable(true);
      }
    }
  };
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
    if (user) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount >= targetValue) {
            clearInterval(interval);
            return prevCount;
          }
          return prevCount + step;
        });
      }, incrementSpeed);

      return () => clearInterval(interval);
    }
  }, [targetValue, incrementSpeed, step, user]);
  useEffect(() => {
    if (!session.data?.user.image) {
      setImageLoaded(true);
    } else {
      setImageLoaded(false);
    }
    GetUsers();
    const OnlineInterval = setInterval(() => {
      GetOnlineUsers();
    }, 2000);
    return () => clearInterval(OnlineInterval);
  }, [session.data?.user.image]);
  useEffect(() => {
    window.addEventListener("focus", () => {
      UpdateStatus("online");
    });
    return () =>
      window.removeEventListener("focus", () => {
        UpdateStatus("online");
      });
  }, []);
  useEffect(() => {
    window.addEventListener("blur", () => {
      UpdateStatus("offline");
    });
    return () =>
      window.removeEventListener("blur", () => {
        UpdateStatus("offline");
      });
  }, []);
  useEffect(() => {
    if (percentage) {
      const interval = setInterval(() => {
        setPercount((prevCount) => {
          if (prevCount >= percentValue) {
            clearInterval(interval);
            return prevCount;
          }
          return Math.min(prevCount + perstep, percentValue);
        });
      }, perspeed);

      return () => clearInterval(interval);
    }
  }, [percentValue, perspeed, perstep, user, percentage]);
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
      body: JSON.stringify(location),
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
    const getNumbers = async () => {
      const count = await fetch("/api/admin/users/count");
      const apiPercent = await fetch("/api/admin/users/percent");
      const data = await count.json();
      const value = await apiPercent.json();
      console.log(data);
      setUser(data);
      setPercentage(value);
      if (value !== 0.0) {
        console.log(typeof percentage);
      }
    };
    getNumbers();
  }, [percentage]);
  useEffect(() => {
    const findUserCountryData = data.find(
      (item) => item.country === location.country,
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
          body: JSON.stringify(location),
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
  }, [location, weatherData, session.data?.user]);

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
    mixpanel.init(`${process.env.MIXPANEL_TOKEN}`, {
      debug: true,
      ignore_dnt: true,
      track_pageview: true,
    });
    mixpanel.track("Sign Up");
    mixpanel.register({
      name: session.data?.user.name || "User",
      email:
        session.data?.user.email || `${session.data?.user.name}@aiculture.uk`,
      plan: session.data?.user.plan || "new",
      country: session.data?.user.country || "Unknow",
      role: session.data?.user.role || "user",
    });
  }, [
    session.data?.user.country,
    session.data?.user.email,
    session.data?.user.id,
    session.data?.user.name,
    session.data?.user.plan,
    session.data?.user.role,
  ]);
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
    if (location.country) {
      setCountryLoaded(true);
    }
  }, [location]);
  useEffect(() => {
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
              setLocation({
                ...location,
                country: data.results[0].components.country,
                street: data.results[0].formatted,
              });
            }
          } catch (error) {
            console.error("Error fetching user country:", error);
          }
        });
      }
    };
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;

      fetchUserCountry(latitude, longitude);
    });
  }, [location]);
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
            setLocation({
              ...location,
              country: data.results[0].components.country,
              street: data.results[0].components.road,
            });
            console.log(`Your street is this: ${data.results[0].formatted}`);
          }
        } catch (error) {
          console.error("Error fetching user country:", error);
        }
      });
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems: any) => {
            const datasetIndex = tooltipItems[0].datasetIndex;
            const dataIndex = tooltipItems[0].dataIndex;
            const dataset = graph.datasets[datasetIndex];
            return dataset.title[dataIndex];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Months",
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(195, 245, 179, 0.4)",
        },
        title: {
          display: true,
          text: `Price (${currency}/bushel)`,
          font: {
            size: 14,
          },
        },
      },
    },
  };
  
  const currentMonth = new Date().getMonth();
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const graph = {
    labels: monthLabels.slice(0, currentMonth + 1),
    datasets: [
      {
        label: "Wheat",
        data: prices.find((item) => item.name === "Wheat")?.price,
        borderColor: "rgb(245, 222, 179)",
        backgroundColor: "rgba(245, 222, 179, 0.64)",
        borderWidth: 2,
        pointRadius: 4,
        title: [
          "Stable due to stable global supply",
          "Increased due to lower production forecasts",
          "Marginal decline observed following improved crop conditions among key exporting nations.",
          "Further decline attributed to trade tensions",
        ],
        pointBackgroundColor: "rgb(245, 222, 179)",
      },
      {
        label: "Rice",
        data: prices.find((item) => item.name === "Rice")?.price,
        borderColor: "rgb(114, 39, 39)",
        backgroundColor: "rgba(114, 39, 39, 0.64)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(114, 39, 39)",
        title: [
          "Abundant exportable supplies suppressed prices.",
          "A modest decline, as early market adjustments began to take effect.",
          "Continued drop reflecting evolving global supply data and trading sentiment.",
          "By early April, prices have fallen by about USD 0.95 from January—an overall 6.77% decline.",
        ],
      },
      {
        label: "Soybeans",
        data: prices.find((item) => item.name === "Soybeans")?.price,
        borderColor: "rgb(104, 77, 179)",
        backgroundColor: "rgba(104, 77, 179, 0.64)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(104, 77, 179)",
        title: [
          "Improved weather conditions resulted in lower prices.",
          "Recovered as a result of constrained global supply.",
          "Decline observed due to decreased demand.",
          "Further decline attributed to enhanced production forecasts.",
        ],
      },
      {
        label: "Sugar",
        data: prices.find((item) => item.name === "Sugar")?.price,
        borderColor: "rgb(35, 9, 68)",
        backgroundColor: "rgba(35, 9, 68, 0.64)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(35, 9, 68)",
        title: [
          "Prices remained stable, reflecting a balance between supply and demand.",
          "A marginal uptick reflecting minor shifts in supply/demand and early market adjustments.",
          "Reports suggest an overall increase of about 0.08 c/lb (≈0.41% rise) from January levels.",
          "Prices have remained relatively stable into early April, with little additional movement observed.",
        ],
      },
      {
        label: "Cotton",
        data: prices.find((item) => item.name === "Cotton")?.price,
        borderColor: "rgb(190, 86, 147)",
        backgroundColor: "rgba(190, 86, 147, 0.64)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(190, 86, 147)",
        title: [
          "A sudden decrease marking its lowest value since November 2020.",
          "Prices remained relatively stable, with the A Index easing slightly downward",
          "The A Index held steady.",
          "A slight downward trend.",
        ]
      }
    ],
  };
  return (
    <Box>
      <MobileDisplay />
      <TabletDisplay />
      <LoadingSequence />
      <CssVarsProvider>
        <Modal open={userDisplay} onClose={() => setUserDisplay(false)}>
          <ModalDialog sx={{ overflowY: "auto" }}>
            <ModalClose />
            <Typography variant="h4">Users</Typography>
            <Tabs defaultValue={0}>
              <TabList>
                <Tab>All</Tab>
                <Tab>Online</Tab>
              </TabList>
              <TabPanel value={0}>
                <Table stripe="even" sx={{ minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td width={150}>
                          <CssVarsProvider>
                            <CldImage
                              style={{ borderRadius: 50, cursor: "pointer" }}
                              onClick={() =>
                                (window.location.href = `/users/${user.id}`)
                              }
                              draggable="false"
                              alt="pfp"
                              src={
                                user.image ||
                                "aiculture/profile-pictures/Designer_efr3yq"
                              }
                              width={45}
                              height={45}
                            />
                          </CssVarsProvider>
                        </td>
                        <td width={300}>
                          {user.name || user.email.split("@")[0]}
                        </td>
                        <td width={400}>{user.email}</td>
                        <td width={150}>{user.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TabPanel>
              <TabPanel value={1}>
                <Table stripe="even" sx={{ minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  {usersAvailable ? (
                    <tbody>
                      {onlineUsers.map((user) => (
                        <tr key={user.id}>
                          <td width={150}>
                            <CssVarsProvider>
                              <CldImage
                                style={{ borderRadius: 50 }}
                                alt="pfp"
                                src={
                                  user.image ||
                                  "aiculture/profile-pictures/pfp_eumgzq"
                                }
                                width={45}
                                height={45}
                              />
                            </CssVarsProvider>
                          </td>
                          <td width={300}>
                            {user.name || user.email.split("@")[0]}
                          </td>
                          <td width={400}>{user.email}</td>
                          <td width={150}>{user.country}</td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <Typography variant="h5">
                      No online users available.
                    </Typography>
                  )}
                </Table>
              </TabPanel>
            </Tabs>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
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
            {imageLoaded ? (
              <Avatar
                sx={{
                  height: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                  width: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              >
                <Typography variant="h6">
                  {session.data?.user?.name?.substring(0, 1).toUpperCase() ||
                    session.data?.user.email?.substring(0, 1).toUpperCase()}
                </Typography>
              </Avatar>
            ) : (
              <CldImage
                src={session.data?.user.image || ""}
                width={32}
                height={32}
                alt="Uploaded Image"
                style={{
                  objectFit: "cover",
                  borderRadius: 100,
                  cursor: "pointer",
                }}
                draggable="false"
                onClick={handleOpen}
              />
            )}
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
            subject={`${count}+`}
            content="Users have connected"
            cursorformation="pointer"
            handle={() => setUserDisplay(true)}
          ></GlobalCard>
          <GlobalCard
            icon={"commit"}
            subject={`${percount.toFixed(1)}%`}
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
        <Typography variant="h4" sx={{ fontFamily: "monospace" }}>Crop Price Trends</Typography>
        <Line data={graph} options={options} />
      </Stack>
    </Box>
  );
}
