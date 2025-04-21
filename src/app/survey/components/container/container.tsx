"use client";
import Image from "next/image";
import React, { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import Input from "@mui/joy/Input";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import CircularProgress from "@mui/joy/CircularProgress";
import ModalDialog from "@mui/joy/ModalDialog";
import {
  CssVarsProvider,
  Select,
  Option,
  Box,
  Stack,
  Typography,
  Avatar,
  Checkbox,
  Snackbar,
} from "@mui/joy";
import { useSession } from "next-auth/react";
import { CheckBoxOutlined, ThumbUpSharp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

type data = {
  id: number;
  subject: string;
};

export default function SurveyContainer() {
  const session = useSession();
  const router = useRouter();
  const [values, setValues] = useState({
    Answer1: "",
    Answer2: "Select expert subject",
    Answer3: "",
    experiencelevel: "months",
    certificate: "",
    Answer4: "Select an educational level",
    Answer6: "",
    Answer5: "",
    Answer8: "",
    Answer9: "",
    Answer7: "",
    Answer10: "",
  });
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  const [educationalLevel, setEducationLevel] = useState(false);
  const [transformed, setTransformed] = useState(false);
  const [newValues, setNewValues] = useState<data[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);
  const transformSubjects = (subjectsString: any) => {
    return subjectsString.split(",").map((subject: any) => {
      return { id: 1, subject: subject.trim() };
    });
  };
  const submitValues = async () => {
    const fetchAPI = await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (fetchAPI.ok) {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      window.location.href = "/dashboard";
    } else if (fetchAPI.status === 401) {
      setSubmitting(true);
      router.push("/auth/login");
    } else if (fetchAPI.status === 400) {
      setSubmitting(true);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      window.location.reload();
    }
  };
  const expertiseHandler = (
    event: React.SyntheticEvent | null,
    subject: string | null,
  ) => {
    setValues({ ...values, Answer2: `${subject}` });
  };
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
  return (
    <CssVarsProvider>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          flexDirection: "row",
          gap: 0.2,
          width: "100%",
        }}
      >
        <Snackbar
          open={success}
          variant="soft"
          color="success"
          startDecorator={<ThumbUpSharp />}
        >
          Survey Submitted Successfully
        </Snackbar>
        <Snackbar
          open={error}
          variant="soft"
          color="danger"
          startDecorator={<FontAwesomeIcon icon={faWarning} />}
        >
          You already have a pending application
        </Snackbar>
        <Modal open={submitting}>
          <ModalDialog
            sx={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              visibility: "hidden",
            }}
          >
            <CircularProgress sx={{ visibility: "visible" }} />
          </ModalDialog>
        </Modal>
        <Button
          variant="soft"
          color="warning"
          sx={{
            display: "flex",
            position: "absolute",
            top: "1%",
            right: "3%",
            zIndex: 5,
          }}
          href="/auth/logout"
        >
          Logout
        </Button>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              width: "20%",
            }}
            className="navbar"
          >
            <Stack sx={{ display: "flex", position: "relative", width: "20%" }}>
              <Image
                alt="display-profile"
                src={"/ai-icon.png"}
                height={100}
                width={100}
              ></Image>
            </Stack>
            <br />
            <Stack sx={{ display: "flex", position: "relative", width: "80%" }}>
              <Typography
                level="h3"
                sx={{ fontFamily: "'Irish Grover', serif" }}
              >
                Teacher Acquisition Survey
              </Typography>
              <Typography
                level="title-md"
                sx={{ color: "#41403f", fontFamily: "'Merienda', serif" }}
              >
                This survey is to determine if you are qualified to become a
                member of our teaching staff.
              </Typography>
            </Stack>
          </Stack>
          <br />
          <hr />
          <br />
          <Stack
            className="body"
            sx={{
              display: "flex",
              position: "relative",
              backgroundColor: "rgba(83, 83, 83, 0.11)",
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              action="#"
              onSubmit={(d) => {
                d.preventDefault();
                setSubmitting(true);
                submitValues();
              }}
              style={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  1. What specific areas of agricultural research have you
                  focused on in your career?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  sx={{ width: "100%" }}
                  required
                  value={values.Answer1}
                  variant="soft"
                  placeholder="Minimum of 3 areas. Use a comma (,) as a separator"
                  onChange={(d) => {
                    setValues({ ...values, Answer1: d.target.value });
                    const data = transformSubjects(d.target.value);
                    if (d.target.value.length > 0) {
                      setNewValues(data);
                      setTransformed(true);
                    } else if (d.target.value.length === 0) {
                      setTransformed(false);
                    }
                  }}
                ></Textarea>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  2. Please select a preferred area of expertise:
                </Typography>
                <br />
                {transformed ? (
                  <Select
                    required
                    value={values.Answer2}
                    onChange={expertiseHandler}
                  >
                    <Option value="Select expert subject" disabled>
                      --Select-A-Subject--
                    </Option>
                    {newValues.map((value) => (
                      <Option key={value.id} value={value.subject}>
                        {value.subject}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Select required value="select" disabled>
                    <Option value="select" disabled>
                      --Answer-Question-1--
                    </Option>
                  </Select>
                )}
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  3. How many months/years of experience do you have?
                </Typography>
                <br />
                <Input
                  placeholder="Number of years in service"
                  required
                  variant="soft"
                  type="number"
                  value={values.Answer3}
                  onChange={(e) =>
                    setValues({ ...values, Answer3: e.target.value })
                  }
                  color={"neutral"}
                  endDecorator={
                    <Select
                      required
                      value={values.experiencelevel}
                      onChange={(
                        event: React.SyntheticEvent | null,
                        experience: string | null,
                      ) => {
                        setValues({
                          ...values,
                          experiencelevel: `${experience}`,
                        });
                      }}
                    >
                      <Option value="months">Month(s)</Option>
                      <Option value="years">Year(s)</Option>
                    </Select>
                  }
                />
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  4. What is your highest level of education?
                </Typography>
                <br />
                <Select
                  required
                  value={values.Answer4}
                  onChange={(
                    event: React.SyntheticEvent | null,
                    level: string | null,
                  ) => {
                    setValues({ ...values, Answer4: `${level}` });
                    setEducationLevel(true);
                  }}
                >
                  <Option value="Select an educational level" disabled>
                    --Education Level--
                  </Option>
                  <Option value="Bachelor's degree">
                    Bachelor&apos;s degree
                  </Option>
                  <Option value="Master's degree">Master&apos;s degree</Option>
                  <Option value="Doctorate degree">Doctorate degree</Option>
                  <Option value="Professional Doctorate">
                    Professional Doctorate
                  </Option>
                </Select>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: educationalLevel ? "flex" : "none",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  Please upload your {values.Answer4} certificate or any
                  relevant certificate you hold
                </Typography>
                <br />
                <Stack
                  onClick={() => {
                    const uploadbutton = document.getElementsByClassName(
                      "certificateupload",
                    )[0] as HTMLButtonElement;
                    uploadbutton.click();
                  }}
                  sx={{ display: certificateUploaded ? "none" : "flex" }}
                >
                  <Image
                    alt="Upload"
                    src="/certificate.png"
                    height={100}
                    width={100}
                    draggable="false"
                  ></Image>
                  <Typography
                    level="title-md"
                    sx={{ fontFamily: "'Playwrite PL', serif" }}
                  >
                    Upload Certificate
                  </Typography>
                </Stack>
                <CldImage
                  onClick={() => {
                    const uploadbutton = document.getElementsByClassName(
                      "certificateupload",
                    )[0] as HTMLButtonElement;
                    uploadbutton.click();
                  }}
                  style={{ display: certificateUploaded ? "flex" : "none" }}
                  alt="Pfp"
                  src={values.certificate || ""}
                  width={100}
                  height={100}
                />
                <Stack sx={{ display: "none" }}>
                  <CldUploadButton
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                    }
                    className="certificateupload"
                    onSuccessAction={(result) => {
                      setValues((prevValues) => ({
                        ...prevValues,
                        certificate: (result.info as any).public_id,
                      }));
                      setCertificateUploaded(true);
                    }}
                    options={{
                      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                      cropping: true,
                      croppingAspectRatio: 1,
                    }}
                  />
                </Stack>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  5. Can you detail any significant projects you&apos;ve worked
                  on in the field of agriculture?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  value={values.Answer5}
                  required
                  sx={{ width: "100%" }}
                  variant="soft"
                  placeholder="Projects (timeline, duties, project goals, etc.)"
                  onChange={(d) =>
                    setValues({ ...values, Answer5: d.target.value })
                  }
                ></Textarea>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  6. What research methods and techniques are you most
                  proficient in?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  sx={{ width: "100%" }}
                  required
                  value={values.Answer6}
                  variant="soft"
                  placeholder="Methods, e.g. Observational Research, Experimental Research, Analytical and Statistical Methods"
                  onChange={(d) => {
                    setValues({ ...values, Answer6: d.target.value });
                  }}
                ></Textarea>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  7. How do you stay updated with the latest developments and
                  trends in agriculture?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  value={values.Answer7}
                  required
                  sx={{ width: "100%" }}
                  variant="soft"
                  placeholder="Methods used to stay updated"
                  onChange={(d) =>
                    setValues({ ...values, Answer7: d.target.value })
                  }
                ></Textarea>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  8. What strengths do you believe you bring to this position,
                  and how do they align with our organization&apos;s goals?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  value={values.Answer8}
                  required
                  sx={{ width: "100%" }}
                  variant="soft"
                  placeholder="Why should we pick you?"
                  onChange={(d) =>
                    setValues({ ...values, Answer8: d.target.value })
                  }
                ></Textarea>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  9. How do you see your research contributing to advancements
                  in agriculture?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  value={values.Answer9}
                  required
                  sx={{ width: "100%" }}
                  variant="soft"
                  placeholder="What contributions have you made to the world of agriculture?"
                  onChange={(d) =>
                    setValues({ ...values, Answer9: d.target.value })
                  }
                ></Textarea>
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Typography level="title-md">
                  10. How do you approach collaboration with other researchers
                  and professionals in the field?
                </Typography>
                <br />
                <Textarea
                  minRows={3}
                  value={values.Answer10}
                  required
                  sx={{ width: "100%" }}
                  variant="soft"
                  placeholder="How do you work with a team?"
                  onChange={(d) =>
                    setValues({ ...values, Answer10: d.target.value })
                  }
                ></Textarea>
              </Stack>
              <br />
              <Stack>
                <Checkbox
                  variant="soft"
                  color="success"
                  label="I hereby certify that all information provided has been entered by me."
                  checked={agreed}
                  checkedIcon={<ThumbUpSharp color="success" />}
                  onChange={() => setAgreed(!agreed)}
                />
              </Stack>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                }}
              >
                <Button
                  variant="soft"
                  color="success"
                  disabled={
                    !values.Answer1 ||
                    values.Answer2 === "Select expert subject" ||
                    values.Answer2 === "select" ||
                    !values.Answer3 ||
                    values.Answer4 === "Select an educational level" ||
                    !values.Answer5 ||
                    !values.Answer6 ||
                    !values.Answer7 ||
                    !values.Answer8 ||
                    !values.Answer9 ||
                    !values.Answer10 ||
                    !agreed
                  }
                  type="sumbit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}
