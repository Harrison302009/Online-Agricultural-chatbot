"use client";
import { styles } from "@/app/prices/prices";
import SideBar from "@/components/sidebar/sidebar";
import { Box, Card, CssVarsProvider, Stack, Typography } from "@mui/joy";

export default function AdminContainer() {
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
          </Stack>
        </main>
      </div>
    </CssVarsProvider>
  );
}
