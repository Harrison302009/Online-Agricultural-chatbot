"use client";
import { styles } from "@/app/atom-data/atom-data";
import SideBar from "@/components/sidebar/sidebar";
import { Box, Card, CssVarsProvider, Input, Stack, Typography } from "@mui/joy";
import "../../../globalicons.css";
import { GlobalCard } from "@/app/dashboard/components/cards/cards";
import CustomCard from "@/components/custom-card/custom-card";
import { useSession } from "next-auth/react";

export default function AdminContainer() {
  const session = useSession();
  if (session.status === "loading") {
    return (
      <Box>
        <Stack
          sx={{
            position: "absolute",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <video
            style={{
              position: "absolute",
              minHeight: "100%",
              minWidth: "100%",
              right: 0,
              bottom: 0,
            }}
            autoPlay
            muted
            loop
          >
            <source src="/loader.mp4"></source>
          </video>
        </Stack>
      </Box>
    );
  }
  return (
    <CssVarsProvider>
      <div style={styles.container}>
        {/* Sidebar */}
        <SideBar />
        {/* Main Content */}
        <main style={styles.main}>
          <Stack style={styles.header}>
            <Typography style={styles.headerTitle}>Welcome, Admin</Typography>
          </Stack>
          <Stack style={styles.section}>
            <Card>
              <Typography level="h3">Overview</Typography>
              <Typography level="title-lg">
                This is your admin dashboard. Use the sidebar to navigate.
              </Typography>
            </Card>
            <Input
              placeholder="Search"
              startDecorator={
                <span
                  className="material-symbols-outlined"
                  color="#d79f81"
                  style={{ color: "#d79f81" }}
                >
                  search
                </span>
              }
              sx={{ width: 300, borderRadius: 50 }}
            />
            <br />
            <Stack className="dashboard">
              <Typography level="h3">Dashboard</Typography>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <CustomCard
                  title="Donations"
                  description={2000}
                  icon="credit_card_heart"
                />
                <CustomCard
                  title="Savings"
                  description={2000}
                  icon="attach_money"
                />
                <CustomCard
                  title="API Usage Stats"
                  description={2000}
                  icon="data_usage"
                />
              </Stack>
            </Stack>
          </Stack>
        </main>
      </div>
    </CssVarsProvider>
  );
}
