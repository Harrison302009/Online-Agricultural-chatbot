import {
  Avatar,
  CircularProgress,
  CssVarsProvider,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";

export default function LoadingSequence() {
  const session = useSession();
  if (session.status === "loading") {
    return (
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
    );
  }
}
