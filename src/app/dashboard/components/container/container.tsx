"use client";
import { CardHeader } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useAtom } from "jotai";
import {
  AdminCapacity,
  Specifics,
  TotalUsersHandle,
  currencySymbol,
  pricer,
  userCount,
} from "@/app/prices/prices";
import { useEffect, useState } from "react";
import { UserCounter } from "@/modules/user-count/actions";
import { useSession } from "next-auth/react";
import {
  CssVarsProvider,
  ModalDialog,
  Modal,
  CircularProgress,
  Avatar,
  Box,
  Stack,
  Skeleton,
  Card,
  Typography,
  ListItemButton,
  List,
  ListItem,
  ModalClose,
  Badge,
  Button,
} from "@mui/joy";
import { CldImage } from "next-cloudinary";
import { TotalUsers } from "@/modules/users/actions";
import { data } from "../countries/countries";
import { TargetFetcher } from "@/modules/users/fetch-target/actions";
import { RoleHandler } from "@/modules/role/actions";

// Register required components for Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

export default function AgriculturalDashboard() {
  const [userNumber, setUserNumber] = useAtom(userCount);
  const [price, setPrice] = useAtom(pricer);
  const [users, setUsers] = useAtom(TotalUsersHandle);
  const [targetSuccess, setTargetSuccess] = useState(false);
  const [currency, setCurrency] = useAtom(currencySymbol);
  const [temperature, setTemperature] = useState("");
  const [targetUserInformation, setTargetUserInformation] = useState<Specifics>(
    {
      id: "",
      role: "",
      email: "",
      password: "",
      name: "",
      image: "",
      receivedMessage: false,
      ApplicationStatus: "",
      hasPendingApplications: false,
      isBanned: false,
      status: "",
      plan: "",
      lastLogin: new Date(),
      emailVerified: new Date(),
      phoneNumber: "",
      bio: "",
      age: 0,
      gender: "",
      occupation: "",
      education: "",
      country: "",
      address: "",
    },
  );
  const [drop, setDrop] = useState(false);
  const session = useSession();
  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await UserCounter();
      setUserNumber(count);
    };
    fetchUserCount();
  }, [setUserNumber]);
  const targetUserFetch = async (id: string) => {
    const response: Specifics = await TargetFetcher(id);
    setTargetUserInformation(response);
    setTargetSuccess(true);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await TotalUsers();
      const userCountry = data.find(
        (country) => country.country === session.data?.user.country,
      );
      if (userCountry && userCountry.price) {
        setPrice(userCountry.price);
        setCurrency(userCountry.symbol);
      } else {
        setPrice([]);
      }
      setUsers(response);
    };
    fetchUsers();
  }, [setUsers, session.data?.user.country, setPrice, setCurrency]);
  useEffect(() => {
    const fetchTemp = async () => {
      const APIContact = await fetch(
        "https://aiculture-app-api.onrender.com/get_temperature",
        {
          method: "GET",
        },
      );
      const data = await APIContact.json();
      if (APIContact.ok) {
        setTemperature(data);
      }
    };
    fetchTemp();
  }, []);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const graph = {
    labels: months.slice(0, currentMonth + 1),
    datasets: [
      {
        label: "Wheat",
        data: price.find((item) => item.name === "Wheat")?.price,
        borderColor: "#81c784",
        backgroundColor: "rgba(129, 199, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Rice",
        data: price.find((item) => item.name === "Rice")?.price,
        borderColor: "#64b5f6",
        backgroundColor: "rgba(100, 181, 246, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Sugar",
        data: price.find((item) => item.name === "Sugar")?.price,
        borderColor: "#fdd835",
        backgroundColor: "rgba(253, 216, 53, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Soybeans",
        data: price.find((item) => item.name === "Soybeans")?.price,
        borderColor: "#ef6c00",
        backgroundColor: "rgba(239, 108, 0, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Cotton",
        data: price.find((item) => item.name === "Cotton")?.price,
        borderColor: "rgb(97, 255, 181)",
        backgroundColor: "rgba(97, 255, 181, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Maize",
        data: price.find((item) => item.name === "Maize")?.price,
        borderColor: "rgb(25, 5, 51)",
        backgroundColor: "rgba(25, 5, 51, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Potato",
        data: price.find((item) => item.name === "Potato")?.price,
        borderColor: "rgb(17, 5, 88)",
        backgroundColor: "rgba(17, 5, 88, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    tooltip: {
      enabled: true,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: `Months`,
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        title: {
          display: true,
          text: `${currency}/bushel`,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return session.status === "loading" ? (
    <CssVarsProvider>
      <Modal open>
        <ModalDialog
          sx={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            visibility: "hidden",
          }}
        >
          <Avatar
            size="lg"
            variant="soft"
            color="warning"
            sx={{ width: 250, height: 250, visibility: "visible" }}
          >
            <CldImage
              alt="logo"
              src="aiculture/profile-pictures/pfp_eumgzq"
              width={250}
              height={250}
            />
          </Avatar>
          <Typography
            variant="plain"
            color="success"
            sx={{ visibility: "visible" }}
            level="h1"
          >
            AICulture
          </Typography>
          <CircularProgress
            variant="soft"
            color="success"
            sx={{ visibility: "visible" }}
          />
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  ) : (
    <CssVarsProvider>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f5f5, #e8f5e9)",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Modal open={targetSuccess} onClose={() => setTargetSuccess(false)}>
          <ModalDialog>
            <ModalClose />
            <Stack>
              <Stack>
                {targetUserInformation.image ? (
                  <CldImage
                    alt="pfp"
                    src={targetUserInformation.image}
                    height={150}
                    width={150}
                  />
                ) : (
                  <Avatar variant="soft" sx={{ height: 150, width: 150 }}>
                    <Typography level="h1">
                      {targetUserInformation.name
                        ?.substring(0, 2)
                        .toUpperCase()}
                    </Typography>
                  </Avatar>
                )}
                <Skeleton variant="text" loading={!targetUserInformation.name}>
                  <Typography
                    level="h1"
                    textAlign="center"
                    sx={{
                      display: "flex",
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    {targetUserInformation.name}
                  </Typography>
                </Skeleton>
                <Skeleton loading={!targetUserInformation.email} variant="text">
                  <Typography level="title-lg">
                    {targetUserInformation.phoneNumber} -{" "}
                    {targetUserInformation.email}
                  </Typography>
                </Skeleton>
                <Stack
                  sx={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "row",
                    gap: 1.2,
                  }}
                >
                  <Skeleton
                    loading={!targetUserInformation.country}
                    variant="text"
                  >
                    <Typography level="title-md">
                      {targetUserInformation.country}
                    </Typography>
                  </Skeleton>
                  <br />
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      display:
                        targetUserInformation.country ===
                          session.data?.user.country &&
                        targetUserInformation.id !== session.data?.user.id
                          ? "flex"
                          : "none",
                    }}
                    loading={!targetUserInformation.name}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        display:
                          targetUserInformation.country ===
                            session.data?.user.country &&
                          targetUserInformation.id !== session.data?.user.id
                            ? "flex"
                            : "none",
                      }}
                    >
                      Contact {targetUserInformation.name}
                    </Button>
                  </Skeleton>
                </Stack>
              </Stack>
            </Stack>
          </ModalDialog>
        </Modal>
        <Typography
          level="h1"
          sx={{
            fontFamily: "monospace",
            fontWeight: "bold",
            textAlign: "center",
            color: "#2e7d32",
          }}
        >
          Agricultural Dashboard
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              flex: 1,
              minWidth: "250px",
              backgroundColor: "#e3f2fd",
              borderRadius: "16px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                paddingBottom: 11,
                transition: "all 0.3s ease-in-out",
              },
            }}
            onMouseOver={() => setDrop(true)}
            onMouseLeave={() => setDrop(false)}
          >
            <CardHeader
              avatar={
                <Avatar size="lg" sx={{ bgcolor: "#64b5f6" }}>
                  U
                </Avatar>
              }
              title="Total Users"
              subheader={
                userNumber && userNumber >= 0 ? userNumber : "Fetching..."
              }
            />
            <Stack
              sx={{
                display: drop ? "flex" : "none",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <List>
                <ListItem
                  sx={{
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {users.map((user) => (
                    <ListItemButton
                      sx={{ borderRadius: 5 }}
                      key={user.id}
                      onClick={() => targetUserFetch(user.id)}
                      variant="soft"
                    >
                      {user.image ? (
                        <CldImage
                          alt="pfp"
                          src={user.image}
                          height={45}
                          width={45}
                          style={{ borderRadius: "50%" }}
                        />
                      ) : (
                        <Avatar
                          size="lg"
                          sx={{ bgcolor: "#988f8a" }}
                          variant="soft"
                        >
                          {user.name?.substring(0, 2).toUpperCase()}
                        </Avatar>
                      )}
                      <Typography level="h4">{user.name}</Typography>
                    </ListItemButton>
                  ))}
                </ListItem>
              </List>
            </Stack>
          </Card>
          <Card
            sx={{
              flex: 1,
              minWidth: "250px",
              maxHeight: "fit-content",
              backgroundColor: "#e8f5e9",
              borderRadius: "16px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              avatar={
                <Avatar size="lg" sx={{ bgcolor: "#81c784" }}>
                  A
                </Avatar>
              }
              title="Active Users"
              subheader="75%"
            />
          </Card>
          <Card
            sx={{
              flex: 1,
              minWidth: "250px",
              maxHeight: "fit-content",
              backgroundColor: "#fff3e0",
              borderRadius: "16px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "#ffb74d" }}>S</Avatar>}
              title="Satisfaction"
              subheader="4.5/5"
            />
          </Card>
        </Stack>
        <Box
          sx={{
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            level="h2"
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
              color: "#2e7d32",
            }}
          >
            Crop Price Trends - {new Date().getFullYear()}
          </Typography>
          <Line data={graph} options={options} />
        </Box>
        <Box
          sx={{
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            level="h2"
            sx={{
              fontFamily: "monospace",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
              color: "#2e7d32",
            }}
          >
            Weather Updates
          </Typography>
          <Typography
            level="title-md"
            sx={{
              fontFamily: "monospace",
              textAlign: "center",
              color: "#37474f",
            }}
          >
            Current temperature: {temperature}
          </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
