import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { CloseOutlined } from "@mui/icons-material";
import { Button, CssVarsProvider, Stack, Typography } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import { Metadata } from "next";
import { CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | AICulture",
    default: "User",
  },
  description:
    "An AI agriculture website intended to help people with agricultural questions and help users chat with other users for better understanding.",
};

export default async function Users({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  const id = await (await params).id;
  const user = await prisma.user.findFirst({
    where: { id },
  });
  const userdetails = await user;
  return (
    <CssVarsProvider>
      <Link
        href="/dashboard"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <CloseOutlined
          sx={{
            display: "flex",
            position: "absolute",
            top: 2,
            right: 6,
            cursor: "pointer",
            zIndex: 5,
          }}
        />
      </Link>
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          size="lg"
          variant="soft"
          color="danger"
          sx={{ height: 150, width: 150 }}
        >
          <Typography variant="soft" color="danger" level="h1">
            {userdetails?.name?.substring(0, 1)}
          </Typography>
        </Avatar>
      </Stack>
      <Typography variant="plain" level="h2">
        {userdetails?.name} is a/an {userdetails?.role} and resides in{" "}
        {userdetails?.country}. You can contact him/her through email:{" "}
        {userdetails?.email} or phone number: {userdetails?.phoneNumber}
      </Typography>
      <Button
        sx={{
          display:
            userdetails?.country === session.user.country &&
            userdetails.id !== session.user.id
              ? "flex"
              : "none",
        }}
      >
        Book a call
      </Button>
      <Link href="/settings" style={{ textDecoration: "none" }}>
        <Button
          variant="soft"
          color="warning"
          sx={{
            display: userdetails?.id === session.user.id ? "flex" : "none",
            textDecoration: "none",
          }}
          href="/settings"
        >
          Edit Profile
        </Button>
      </Link>
    </CssVarsProvider>
  );
}
