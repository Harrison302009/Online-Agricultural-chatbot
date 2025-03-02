"use client";
import {
  Box,
  Button,
  Icon,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Backdrop,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../globalicons.css";
import { CldImage } from "next-cloudinary";
import {
  Avatar,
  CssVarsProvider,
  CircularProgress,
  Modal,
  ModalDialog,
} from "@mui/joy";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  address: string;
  country?: string;
  plan: string;
  hasPendingApplications: boolean;
  ApplicationStatus?: string;
  lastLogin: string;
};

type Applications = {
  userId: string;
  examId: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
  Answer5: string;
  Answer6: string;
  Answer7: string;
  Answer8: string;
  Answer9: string;
  Answer10: string;
  user: string;
};
export default function AdminPage() {
  const [adminDisplay, setAdminDisplay] = useState(false);
  const [Applications, setApplications] = useState<Applications[]>([]);
  const [appFetched, setAppFetched] = useState(false);
  const [defaultDisplay, setDefaultDisplay] = useState(true);
  const [userApp, setUserApp] = useState({
    userId: "",
    examId: "",
    Answer1: "",
    Answer2: "",
    Answer3: "",
    Answer4: "",
    Answer5: "",
    Answer6: "",
    Answer7: "",
    Answer8: "",
    Answer9: "",
    Answer10: "",
    user: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState(0);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data: User[] = await res.json();
      setUsers(data);
    };
    const fetchInterval = setInterval(() => {
      fetchUsers();
    }, 1500);
    return () => clearInterval(fetchInterval);
  }, [session.status]);
  const handleBan = async (userId: number) => {
    const response = await fetch("/api/admin/users/ban-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (response.ok) {
      alert("User banned successfully");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBanned: true } : user,
        ),
      );
    } else {
      alert("Failed to ban user");
    }
  };
  const ApplicationFetcher = async (userId: number) => {
    const APIContact = await fetch("/api/survey", {
      method: "GET",
    });
    if (APIContact.ok) {
      const data: Applications[] = await APIContact.json();
      setApplications(data);
      if (data || Applications) {
        const userApplication = data.find((app) => app.userId === `${userId}`);
        if (userApplication) {
          setUserApp(userApplication);
          setAppFetched(true);
        } else {
        }
      }
    }
  };
  const handleKick = async (userId: number) => {
    const request = await fetch("/api/admin/users/kick-user", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (request.ok) {
      alert("User kicked successfully");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } else if (request.status === 403) {
      alert("You must be an admin to carry out this action");
      console.error("Unauthorized access");
    }
  };
  const handleUnban = async (userId: number) => {
    const response = await fetch("/api/admin/users/unban-user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (response.ok) {
      alert("User unbanned successfully");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBanned: false } : user,
        ),
      );
    } else {
      alert("Failed to ban user");
    }
  };
  const refresh = async () => {
    const request = await fetch("/api/admin/users", {
      method: "GET",
    });
    if (request.ok) {
      const data: User[] = await request.json();
      setUsers(data);
      alert("Refreshed User Table");
    } else {
      alert("Failed to refresh users");
      console.error("Failed to fetch users");
    }
  };
  const tableStyles: React.CSSProperties = {
    fontFamily: "'Merienda', cursive",
    fontWeight: 300,
    fontStyle: "normal",
  };
  const headStyles: React.CSSProperties = {
    fontFamily: "'Black Ops One', system-ui",
    fontWeight: 400,
    fontStyle: "normal",
  };
  const verifyAdmin = () => {
    if (session.data?.user.role !== "admin") {
      setDefaultDisplay(false);
      router.push("/unauthorized");
    } else {
      setAdminDisplay(true);
      setDefaultDisplay(false);
    }
  };
  return (
    <Box>
      {defaultDisplay && (
        <Stack>
          <Typography variant="h3">
            Hey{" "}
            {session.data?.user.name ||
              session.data?.user.email?.substring(0, 4)}
          </Typography>
          <List sx={{ width: "40%" }}>
            <ListItemButton
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.3s ease-in-out",
                border: "1px solid transparent",
                borderRadius: 3,
                ":hover": {
                  transform: "translateY(-2px) scale(1.1)",
                  border: `1px solid dodgerblue`,
                },
              }}
              onClick={verifyAdmin}
            >
              Click here to continue
            </ListItemButton>
          </List>
        </Stack>
      )}
      {adminDisplay && (
        <Stack>
          <Typography variant="h3">Hi {session.data?.user.role}</Typography>
          <br />
          <Typography>Users</Typography>
          <Backdrop
            open={appFetched}
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            onClick={() => setAppFetched(false)}
          >
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                backgroundColor: "rgba(255, 255, 255, 0.73)",
                color: "rgba(231, 0, 0, 0.76)",
                borderRadius: 10,
                width: "80%",
                height: "80%",
                overflowY: "auto",
              }}
            >
              <Typography variant="h4">Application</Typography>
              <br />
              <Typography variant="h5">
                1. What specific areas of agricultural research have you focused
                on in your career?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer1}</Typography>
              <br />
              <Typography variant="h5">
                2. Please select a preferred area of expertise:
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer2}</Typography>
              <br />
              <Typography variant="h5">
                3. How many months/years of experience do you have?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer3}</Typography>
              <br />
              <Typography variant="h5">
                4. What is your highest level of education?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer4}</Typography>
              <br />
              <Typography variant="h5">
                5. Can you detail any significant projects you&apos;ve worked on
                in the field of agriculture?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer5}</Typography>
              <br />
              <Typography variant="h5">
                6. What research methods and techniques are you most proficient
                in?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer6}</Typography>
              <br />
              <Typography variant="h5">
                7. How do you stay updated with the latest developments and
                trends in agriculture?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer7}</Typography>
              <br />
              <Typography variant="h5">
                8. What strengths do you believe you bring to this position, and
                how do they align with our organization&apos;s goals?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer8}</Typography>
              <br />
              <Typography variant="h5">
                9. How do you see your research contributing to advancements in
                agriculture?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer9}</Typography>
              <br />
              <Typography variant="h5">
                10. How do you approach collaboration with other researchers and
                professionals in the field?
              </Typography>
              <Typography variant="h6">Answer: {userApp.Answer10}</Typography>
            </Stack>
          </Backdrop>
          <IconButton
            sx={{
              display: "flex",
              position: "relative",
              width: "fit-content",
              height: "fit-content",
            }}
            onClick={() => refresh()}
          >
            <span className="material-symbols-outlined">refresh</span>
          </IconButton>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell width={130} sx={headStyles}>
                  Name
                </TableCell>
                <TableCell width={150} sx={headStyles}>
                  ID
                </TableCell>
                <TableCell width={150} sx={headStyles}>
                  Email
                </TableCell>
                <TableCell width={200} sx={headStyles}>
                  Address
                </TableCell>
                <TableCell width={80} sx={headStyles}>
                  Plan
                </TableCell>
                <TableCell width={80} sx={headStyles}>
                  Role
                </TableCell>
                <TableCell width={80} sx={headStyles}>
                  Status
                </TableCell>
                <TableCell width={100} sx={headStyles}>
                  Last seen
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  component={"th"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width={130} sx={tableStyles}>
                    {user.name || "No name yet"}
                  </TableCell>
                  <TableCell width={100} sx={tableStyles}>
                    {user.id}
                  </TableCell>
                  <TableCell width={150} sx={tableStyles}>
                    {user.email}
                  </TableCell>
                  <TableCell width={200} sx={tableStyles}>
                    {user.address}
                  </TableCell>
                  <TableCell width={80} sx={tableStyles}>
                    {user.plan}
                  </TableCell>
                  <TableCell width={80} sx={tableStyles}>
                    {user.role}
                  </TableCell>
                  <TableCell width={80} sx={tableStyles}>
                    {user.isBanned ? "Banned" : "Active"}
                  </TableCell>
                  <TableCell width={100} sx={tableStyles}>
                    {new Date(user.lastLogin).toLocaleString()}
                  </TableCell>
                  <TableCell width={80} sx={tableStyles}>
                    <Button onClick={() => handleKick(user.id)}>Kick</Button>
                  </TableCell>
                  <TableCell width={80} sx={tableStyles}>
                    <Button
                      onClick={() =>
                        user.isBanned
                          ? handleUnban(user.id)
                          : handleBan(user.id)
                      }
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        display:
                          user.hasPendingApplications === true &&
                          user.ApplicationStatus === "PENDING"
                            ? "flex"
                            : "none",
                      }}
                      onClick={() => ApplicationFetcher(user.id)}
                    >
                      View Application
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      )}
    </Box>
  );
}
