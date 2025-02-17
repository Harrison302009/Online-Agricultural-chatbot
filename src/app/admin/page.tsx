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
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../globalicons.css";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  address: string;
  country?: string;
  plan: string;
  lastLogin: string;
};

export default function AdminPage() {
  const [adminDisplay, setAdminDisplay] = useState(false);
  const [defaultDisplay, setDefaultDisplay] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState(0);
  const session = useSession();
  const router = useRouter();
  const checkRole = async () => {
    const request = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };
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
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data: User[] = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (session.status === "authenticated") {
      checkRole();
    }
  }, [session.status]);
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      )}
    </Box>
  );
}
