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
import { userCount } from "@/app/prices/prices";
import { useEffect } from "react";
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
} from "@mui/joy";
import { CldImage } from "next-cloudinary";

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
  const [users, setUsers] = useAtom(userCount);
  const session = useSession();
  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await UserCounter();
      setUsers(count);
      alert(count);
    };
    fetchUserCount();
  }, [setUsers]);
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
        data: [10, 20, 15, 30, 25, 35],
        borderColor: "#81c784",
        backgroundColor: "rgba(129, 199, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "Rice",
        data: [15, 25, 20, 35, 30, 40],
        borderColor: "#64b5f6",
        backgroundColor: "rgba(100, 181, 246, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
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
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
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
            }}
          >
            <CardHeader
              avatar={
                <Avatar size="lg" sx={{ bgcolor: "#64b5f6" }}>
                  U
                </Avatar>
              }
              title="Total Users"
              subheader={users && users >= 0 ? users : "Fetching..."}
            />
          </Card>
          <Card
            sx={{
              flex: 1,
              minWidth: "250px",
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
            Crop Price Trends
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
            Current temperature: 25°C
          </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
