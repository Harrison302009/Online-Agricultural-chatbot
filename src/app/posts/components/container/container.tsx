"use client";

import { Box, Stack, Typography, Drawer, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import "../../../globalicons.css";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { MenuBar } from "@/components/menubar/menubar";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton, CldVideoPlayer } from "next-cloudinary";
import {
  CssVarsProvider,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Textarea,
  Tooltip,
} from "@mui/joy";
import Options from "@/components/options-components/options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faDeleteLeft,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function PostContainer() {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [imageLoaded, setImageLoaded] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    name: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    video: "",
  });
  let count = 0;
  const session = useSession();
  useEffect(() => {
    if (session.data?.user.image) {
      setImageLoaded(false);
    }
  }, [session.data?.user.image]);
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
          <MenuBar />
        </Drawer>
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            top: "5%",
            right: "4%",
            zIndex: 5,
          }}
        >
          {imageLoaded ? (
            <Avatar
              sx={{
                height: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                width: { xs: 25, sm: 27, md: 29, lg: 32, xl: 150 },
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
            >
              <Typography variant="h6">
                {session.data?.user?.name?.substring(0, 1).toUpperCase() ||
                  session.data?.user.email?.substring(0, 1).toUpperCase()}
              </Typography>
            </Avatar>
          ) : (
            <CldImage
              src={
                session.data?.user.image ||
                "aiculture/profile-pictures/pfp_eumgzq"
              }
              width={32}
              height={32}
              alt="Uploaded Image"
              style={{
                objectFit: "cover",
                borderRadius: 100,
                cursor: "pointer",
              }}
              draggable="false"
              onClick={() => setOpen(true)}
            />
          )}
        </Stack>
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Baskervville SC', serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Search Anything...
        </Typography>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          {messages.map((message) => (
            <div key={message.id}>
              <p
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Oswald', sans-serif",
                  fontOpticalSizing: "auto",
                  fontStyle: "normal",
                }}
              >
                {message.role === "user" ? "User: " : "AI: "}
              </p>
              <Markdown>{message.content}</Markdown>
              <br /> <br />
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <CssVarsProvider>
              <Input
                placeholder="Create a post"
                onClick={() => setModalOpen(true)}
              />
              <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <ModalDialog
                  sx={{ display: "flex", position: "relative", width: "70%" }}
                >
                  <ModalClose />
                  <Stack
                    sx={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <CldImage
                      src={session.data?.user.image || ""}
                      alt="pfp"
                      style={{
                        display: session.data?.user.image ? "flex" : "none",
                        borderRadius: 100,
                      }}
                      height={40}
                      width={40}
                    />
                    <Typography variant="h4">
                      {session.data?.user.name}
                    </Typography>
                  </Stack>
                  <Textarea
                    minRows={4}
                    variant="soft"
                    placeholder="Create a post"
                    value={post.content}
                    onChange={(c) =>
                      setPost((prevValues) => ({
                        ...prevValues,
                        content: c.target.value,
                      }))
                    }
                  />
                  <br />
                  <Stack
                    sx={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "row",
                      width: 240,
                      height: "fit-content",
                      gap: 3,
                    }}
                  >
                    <Stack
                      sx={{
                        display: post.image1 ? "flex" : "none",
                        width: 240,
                      }}
                    >
                      <Tooltip title="Delete" variant="soft" color="danger">
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{
                            display: "flex",
                            position: "absolute",
                            color: "#a91010",
                            cursor: "pointer",
                            top: 4,
                            right: 4,
                          }}
                        />
                      </Tooltip>
                      <CldImage
                        src={post.image1}
                        alt="image1"
                        height={90}
                        width={240}
                        style={{ display: post.image1 ? "flex" : "none" }}
                      />
                    </Stack>
                    <br />
                    <Stack
                      sx={{
                        display: post.image2 ? "flex" : "none",
                        position: "relative",
                      }}
                    >
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      <CldImage
                        src={post.image2}
                        alt="image2"
                        height={90}
                        width={240}
                        style={{ display: post.image2 ? "flex" : "none" }}
                      />
                    </Stack>
                    <Stack sx={{ display: "flex", position: "relative" }}>
                      <CldVideoPlayer
                        src={post.video || "samples/sea-turtle"}
                        controls
                        ads={{
                          adTagUrl:
                            "https://aiculture-uk.vercel.app/AICulture-dream-of-the-future.mp4 ",
                          adLabel: "AICulture: A new way of life",
                        }}
                        height={90}
                        width={500}
                      />
                    </Stack>
                  </Stack>

                  <br />
                  <Stack
                    sx={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "row",
                      width: "80%",
                    }}
                  >
                    <CldUploadButton
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                      }
                      options={{
                        maxFiles: 1,
                        cloudName:
                          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                        cropping: true,
                      }}
                      onSuccess={(results) => {
                        if (count == 4) {
                          setDisabled(true);
                          setPost((prevValues) => ({
                            ...prevValues,
                            image5: (results.info as any).public_id,
                          }));
                        } else if (count == 3) {
                          count += 1;
                          setPost((prevValues) => ({
                            ...prevValues,
                            image4: (results.info as any).public_id,
                          }));
                        } else if (count == 2) {
                          count += 1;
                          setPost((prevValues) => ({
                            ...prevValues,
                            image3: (results.info as any).public_id,
                          }));
                        } else if (count == 1) {
                          count += 1;
                          console.log(count);
                          setPost((prevValues) => ({
                            ...prevValues,
                            image2: (results.info as any).public_id,
                          }));
                        } else if (count == 0) {
                          count += 1;
                          console.log(count);
                          setPost((prevValues) => ({
                            ...prevValues,
                            image1: (results.info as any).public_id,
                          }));
                        }
                      }}
                    />
                    <CldUploadButton
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                      }
                      options={{
                        maxFiles: 1,
                        cloudName:
                          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                        cropping: true,
                      }}
                      onSuccessAction={(result) =>
                        setPost({
                          ...post,
                          video: (result.info as any).public_id,
                        })
                      }
                    />
                    <Options
                      text="Add Image"
                      image="image"
                      disabled={disabled}
                    />
                    <Options text="Add Video" image="movie" />
                  </Stack>
                </ModalDialog>
              </Modal>
            </CssVarsProvider>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
}
