"use client";

import { Box, Stack, Typography, Drawer, Avatar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import "../../../globalicons.css";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { MenuBar } from "@/components/menubar/menubar";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton, CldVideoPlayer } from "next-cloudinary";
import {
  Badge,
  Button,
  Card,
  CssVarsProvider,
  Dropdown,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Snackbar,
  Textarea,
  Tooltip,
} from "@mui/joy";
import Options from "@/components/options-components/options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faDeleteLeft,
  faListDots,
  faTimesCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { CheckCircleOutlineRounded, DonutSmall } from "@mui/icons-material";
import { User } from "@/app/dashboard/components/container/container";
import { UpdateStatus } from "@/modules/status/actions";
import { PostDelete } from "@/modules/posts/actions";
import { NotifHandler } from "@/modules/notifications/actions";
import { DeletePost } from "@/modules/posts/delete-post/actions";

type Post = {
  id: string;
  authorId: string;
  content: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  name: string;
  avatar: string;
  createdAt: string;
};
export default function PostContainer() {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [newPost, setNewPost] = useState(false);
  const [post, setPost] = useState({
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
    const PostFetch = async () => {
      const APIContact = await fetch("/api/posts", {
        method: "GET",
      });
      if (APIContact.ok) {
        const data: Post[] = await APIContact.json();

        // Check if new posts are added
        if (data.length > fetchedPosts.length) {
          notifyUsers("A new post has been added!"); // Send desktop notification
        }

        setPostCount(postCount + 1);
        setFetchedPosts(data);
      }
    };

    const PostInterval = setInterval(() => {
      PostFetch();
    }, 500);

    return () => clearInterval(PostInterval);
  }, [
    session.data?.user.seenNotifications,
    postCount,
    online,
    fetchedPosts.length,
    executed,
  ]);

  // Request notification permission on page load
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Desktop notifications denied by the user.");
        }
      });
    }
  }, []);

  // Example notification function
  const notifyUsers = (message: string) => {
    if (Notification.permission === "granted") {
      new Notification("New Post Alert!", {
        body: message,
        icon: "/path/to/icon.png", // Optional: path to notification icon
      });
    } else {
      console.warn("Desktop notifications are not permitted.");
    }
  };

  useEffect(() => {
    if (session.data?.user.image) {
      setImageLoaded(false);
    }
  }, [session.data?.user.image]);
  useEffect(() => {
    window.addEventListener("focus", () => {
      UpdateStatus("online");
    });
    return () =>
      window.removeEventListener("focus", () => {
        UpdateStatus("online");
      });
  }, []);
  useEffect(() => {
    window.addEventListener("blur", () => {
      UpdateStatus("offline");
    });
    return () =>
      window.removeEventListener("blur", () => {
        UpdateStatus("offline");
      });
  }, []);
  useEffect(() => {
    const OnlineFetcher = async () => {
      const APIFetch = await fetch("/api/user/fetch-online-users", {
        method: "GET",
      });
      if (APIFetch.ok) {
        const data: User[] = await APIFetch.json();
        setOnlineUsers(data);
        if (session.data?.user.id && onlineUsers) {
          const TargetUserStatus = onlineUsers.find(
            (user) => user.id === session.data?.user.id,
          );
          if (TargetUserStatus) {
            setOnline(true);
          } else {
            setOnline(false);
          }
        }
      }
    };
    const fetchInterval = setInterval(() => {
      OnlineFetcher();
    }, 500);
    return () => clearInterval(fetchInterval);
  }, [onlineUsers, session.data?.user.id]);
  const UploadPost = async () => {
    const APIContact = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (APIContact.ok) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      setModalOpen(false);
      window.location.reload();
    } else {
      setLoading(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 2000);
    }
  };
  function timeAgo(postTime: string) {
    const now = new Date();
    const postDate = new Date(postTime);
    if (isNaN(postDate.getTime())) {
      throw new Error("Invalid date provided");
    }

    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    if (seconds < 1) {
      return "just now";
    } else if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days}d ago`;
    }
  }
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
        <CssVarsProvider>
          <Snackbar
            open={success}
            variant="soft"
            color="success"
            startDecorator={<CheckCircleOutlineRounded />}
          >
            Post uploaded successfully.
          </Snackbar>
          <Snackbar
            open={failure}
            variant="soft"
            color="danger"
            startDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
          >
            Upload Failed
          </Snackbar>
        </CssVarsProvider>
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
                  sx={{
                    display: "flex",
                    position: "relative",
                    width: "70%",
                    overflowY: "auto",
                  }}
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
                    <Badge
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeInset="14%"
                      color={online ? "success" : "neutral"}
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
                    </Badge>
                    <Typography variant="h4">
                      {session.data?.user.name}
                    </Typography>
                  </Stack>
                  <form
                    onSubmit={(r) => {
                      r.preventDefault();
                      setLoading(true);
                      UploadPost();
                    }}
                  >
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
                          position: "relative",
                          width: 240,
                        }}
                      >
                        <Tooltip title="Delete" variant="soft" color="danger">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{
                              display: post.image2 ? "none" : "flex",
                              position: "absolute",
                              color: "#a91010",
                              cursor: "pointer",
                              top: 4,
                              right: 4,
                            }}
                            onClick={() => {
                              setPost({ ...post, image1: "" });
                              count -= 1;
                            }}
                          />
                        </Tooltip>
                        <CldImage
                          src={post.image1}
                          alt="image1"
                          height={110}
                          width={240}
                          style={{ display: post.image1 ? "flex" : "none" }}
                        />
                      </Stack>
                      <br />
                      <Stack
                        sx={{
                          display: post.image2 ? "flex" : "none",
                          position: "relative",
                          width: 240,
                        }}
                      >
                        <Tooltip title="Delete" variant="soft" color="danger">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{
                              display: post.image3 ? "none" : "flex",
                              position: "absolute",
                              color: "#a91010",
                              cursor: "pointer",
                              top: 4,
                              right: 4,
                            }}
                            onClick={() => {
                              setPost({ ...post, image2: "" });
                              count -= 1;
                            }}
                          />
                        </Tooltip>
                        <CldImage
                          src={post.image2}
                          alt="image2"
                          height={110}
                          width={240}
                          style={{ display: post.image2 ? "flex" : "none" }}
                        />
                      </Stack>
                      <br />
                      <Stack
                        sx={{
                          display: post.image3 ? "flex" : "none",
                          position: "relative",
                          width: 240,
                        }}
                      >
                        <Tooltip title="Delete" variant="soft" color="danger">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{
                              display: post.image4 ? "none" : "flex",
                              position: "absolute",
                              color: "#a91010",
                              cursor: "pointer",
                              top: 4,
                              right: 4,
                            }}
                            onClick={() => {
                              setPost({ ...post, image3: "" });
                              count -= 1;
                            }}
                          />
                        </Tooltip>
                        <CldImage
                          src={post.image3}
                          alt="image3"
                          height={110}
                          width={240}
                          style={{ display: post.image3 ? "flex" : "none" }}
                        />
                      </Stack>
                      <br />
                      <Stack
                        sx={{
                          display: post.image4 ? "flex" : "none",
                          position: "relative",
                          width: 240,
                        }}
                      >
                        <Tooltip title="Delete" variant="soft" color="danger">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{
                              display: post.image5 ? "none" : "flex",
                              position: "absolute",
                              color: "#a91010",
                              cursor: "pointer",
                              top: 4,
                              right: 4,
                            }}
                            onClick={() => {
                              setPost({ ...post, image4: "" });
                              count -= 1;
                            }}
                          />
                        </Tooltip>
                        <CldImage
                          src={post.image4}
                          alt="image4"
                          height={110}
                          width={240}
                          style={{ display: post.image4 ? "flex" : "none" }}
                        />
                      </Stack>
                      <br />
                      <Stack
                        sx={{
                          display: post.image5 ? "flex" : "none",
                          position: "relative",
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
                            onClick={() => {
                              setPost({ ...post, image5: "" });
                              count -= 1;
                            }}
                          />
                        </Tooltip>
                        <CldImage
                          src={post.image5}
                          alt="image5"
                          height={110}
                          width={240}
                          style={{ display: post.image5 ? "flex" : "none" }}
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
                      <Stack sx={{ display: "none" }}>
                        <CldUploadButton
                          className="imageUploader"
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
                      </Stack>
                      <Options
                        text="Add Image"
                        image="image"
                        disabled={disabled}
                        handle={() => {
                          const button = document.getElementsByClassName(
                            "imageUploader",
                          )[0] as HTMLButtonElement;
                          button.click();
                        }}
                      />
                      <Options text="Add Video" image="movie" disabled />
                    </Stack>
                    <Button
                      variant="soft"
                      disabled={!post.content}
                      type="submit"
                      loading={loading}
                      sx={{
                        display: "flex",
                        position: "relative",
                        float: "right",
                      }}
                    >
                      Post
                    </Button>
                  </form>
                </ModalDialog>
              </Modal>
            </CssVarsProvider>
          </form>
          <br />
          <CssVarsProvider>
            <Typography variant="h3">Recent Posts:</Typography>
            <br />
            <Stack sx={{ display: "flex", position: "relative", gap: 2 }}>
              {fetchedPosts
                .sort((a, b) => {
                  const db = new Date(b.createdAt);
                  const da = new Date(a.createdAt);
                  return (db as any) - (da as any);
                })
                .map((post) => (
                  <Stack
                    key={post.id}
                    sx={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        position: "relative",
                        width: "60%",
                      }}
                    >
                      <Stack
                        sx={{
                          display: "flex",
                          position: "relative",
                          flexDirection: "row",
                          gap: 2,
                        }}
                      >
                        <CldImage
                          src={post.avatar || ""}
                          alt="pfp"
                          style={{
                            display: "flex",
                            borderRadius: 100,
                          }}
                          height={40}
                          width={40}
                        />
                        <Typography variant="h4" sx={{ width: "30%" }}>
                          {post.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: 10, color: "silver", width: "30%" }}
                        >
                          {timeAgo(post.createdAt)}
                        </Typography>
                        <Stack
                          sx={{
                            display: "flex",
                            position: "relative",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            width: "40%",
                          }}
                        >
                          <IconButton
                            onClick={() => DeletePost(post.id)}
                            sx={{
                              display:
                                post.authorId === session.data?.user.id
                                  ? "flex"
                                  : "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </IconButton>
                        </Stack>
                      </Stack>
                      <Typography variant="h5">
                        <Markdown>{post.content}</Markdown>
                      </Typography>
                      <br />
                      <Stack
                        sx={{
                          display: "flex",
                          position: "relative",
                          flexDirection: "row",
                          gap: 1,
                        }}
                      >
                        <CldImage
                          alt="image1"
                          src={post.image1}
                          style={{ display: post.image1 ? "flex" : "none" }}
                          width={480}
                          height={380}
                        />
                        <CldImage
                          alt="image2"
                          src={post.image2}
                          style={{ display: post.image2 ? "flex" : "none" }}
                          width={240}
                          height={110}
                        />
                      </Stack>
                    </Card>
                  </Stack>
                ))}
              <Button
                sx={{
                  display:
                    session.data?.user.role === "admin" ? "flex" : "none",
                  position: "relative",
                }}
                onClick={() => PostDelete("random")}
              >
                Delete all posts
              </Button>
            </Stack>
          </CssVarsProvider>
        </Stack>
      </Stack>
    </Box>
  );
}
