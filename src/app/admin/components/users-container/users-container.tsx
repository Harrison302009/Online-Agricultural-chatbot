"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CssVarsProvider,
  Divider,
  Snackbar,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import { CardHeader, Select, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import React, { useState, useEffect } from "react";
import { TotalUsers } from "@/modules/users/actions";
import { CheckCircleRounded } from "@mui/icons-material";
import { styles } from "@/app/prices/prices";
import { CldImage } from "next-cloudinary";
import { SpecificUserRole } from "@/modules/role/target-role/actions";
import { useRouter } from "next/navigation";
import SideBar from "@/components/sidebar/sidebar";

interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  country: string | null;
  phoneNumber: string | null;
  image: string | null;
}

const UsersContainer = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [copied, setCopied] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (session?.user.role !== "admin") return;
    (async () => {
      const users: UserProps[] = await TotalUsers();
      setUsers(
        users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          country: user.country,
          phoneNumber: user.phoneNumber,
          image: user.image,
        })),
      );
    })();
  }, [session]);
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1700);
    });
  };
  return (
    <CssVarsProvider>
      <Box sx={styles.container}>
        <Snackbar
          open={copied}
          autoHideDuration={3000}
          variant="soft"
          color="success"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          startDecorator={<CheckCircleRounded />}
        >
          <Typography level="title-md">
            ID Succesfully Copied To Clipboard
          </Typography>
        </Snackbar>
        <SideBar />
        <Stack sx={styles.main}>
          <Card>
            <CardHeader title="Users" />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
                <Typography level="h4">All Users ({users.length})</Typography>
                <Table>
                  <thead>
                    <tr>
                      <th>...</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Country</th>
                      <th>Phone No.</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <CldImage
                            src={user.image || ""}
                            alt={`${user.name}'s profile picture`}
                            width={45}
                            height={45}
                            style={{ borderRadius: "50%" }}
                            draggable={false}
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.country}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>
                          <Button
                            variant="soft"
                            onClick={() => copyToClipboard(user.id)}
                          >
                            Copy ID
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="soft"
                            fullWidth
                            onClick={() =>
                              user.role === "student"
                                ? SpecificUserRole(user.id, "admin")
                                : SpecificUserRole(user.id, "student")
                            }
                          >
                            Make {user.role === "student" ? "Admin" : "Student"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
};

export default UsersContainer;
