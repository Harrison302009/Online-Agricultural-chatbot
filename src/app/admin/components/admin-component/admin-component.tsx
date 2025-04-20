"use client";
import { styles } from "@/app/prices/prices";
import { Box, Card, CssVarsProvider, Stack, Typography } from "@mui/joy";

export default function AdminContainer() {
  return (
    <CssVarsProvider>
      <div style={styles.container}>
        {/* Sidebar */}
        <aside
          style={{
            width: "16rem",
            backgroundColor: "#ffffff",
            color: "#1f2937",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "0 0.5rem 0.5rem 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={styles.sidebarHeader}>Admin Panel</div>
          <nav
            style={{
              flex: 1,
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <a
              href="#"
              style={styles.navLink}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.navLinkHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.navLink.backgroundColor)
              }
            >
              Dashboard
            </a>
            <a
              href="#"
              style={styles.navLink}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.navLinkHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.navLink.backgroundColor)
              }
            >
              Users
            </a>
            <a
              href="#"
              style={styles.navLink}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.navLinkHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.navLink.backgroundColor)
              }
            >
              Settings
            </a>
          </nav>
          <div style={styles.footer}>
            <button
              style={styles.logoutButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.logoutButtonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.logoutButton.backgroundColor)
              }
            >
              Logout
            </button>
          </div>
        </aside>

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
