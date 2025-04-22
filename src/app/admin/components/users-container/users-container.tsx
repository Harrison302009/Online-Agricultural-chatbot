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
import { Application, ModalPopup, styles } from "@/app/prices/prices";
import { CldImage } from "next-cloudinary";
import { SpecificUserRole } from "@/modules/role/target-role/actions";
import { useRouter } from "next/navigation";
import SideBar from "@/components/sidebar/sidebar";
import UserApplication from "@/components/user-display/user-display";
import { useAtom } from "jotai";
import { ApplicationFetcher } from "@/modules/application-fetcher/actions";
import { AppStatus } from "@prisma/client";

interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  country: string | null;
  phoneNumber: string | null;
  image: string | null;
  hasPendingApplications: boolean;
  ApplicationStatus: AppStatus;
}

const UsersContainer = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [userApp, setUserApp] = useAtom(Application);
  const [open, setOpen] = useAtom(ModalPopup);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const appFetcher = async (id: string) => {
    const results = await ApplicationFetcher(id);
    setUserApp(results);
    setOpen(true);
  };
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
          hasPendingApplications: user.hasPendingApplications,
          ApplicationStatus: user.ApplicationStatus,
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
        <UserApplication
          open={open}
          id={id}
          close={() => setOpen(false)}
          examId={`${userApp?.examId}`}
          applicant={name}
          Answer1={`${userApp?.Answer1}`}
          Answer2={`${userApp?.Answer2}`}
          Answer3={`${userApp?.Answer3}`}
          Answer4={`${userApp?.Answer4}`}
          Answer5={`${userApp?.Answer5}`}
          Answer6={`${userApp?.Answer6}`}
          Answer7={`${userApp?.Answer7}`}
          Answer8={`${userApp?.Answer8}`}
          Answer9={`${userApp?.Answer9}`}
          Answer10={`${userApp?.Answer10}`}
          certificate={`${userApp?.Certificate}`}
        />
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
                        <td>
                          {user.role === "Agricultural Researcher" &&
                            user.hasPendingApplications === true && (
                              <Button
                                onClick={() => {
                                  appFetcher(user.id);
                                  setName(`${user.name}`);
                                  setId(`${user.id}`);
                                }}
                              >
                                View App
                              </Button>
                            )}
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
