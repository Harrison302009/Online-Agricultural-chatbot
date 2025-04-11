"use client";
import { data } from "@/app/dashboard/components/countries/countries";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckCircleOutline, WarningAmberRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  CssVarsProvider,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/joy";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Router } from "react-router-dom";

export default function RegistrationForm() {
  const session = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    firstName: "",
    lastName: "",
    password: "",
    country: "Select a country",
    countryCode: "",
    phoneNumber: "",
    role: "select a role",
  });
  const handleTitle = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setValues({ ...values, title: `${newValue}` });
    console.log(`${newValue} is a ${typeof newValue}`);
  };
  const handleCountryChange = (
    event: React.SyntheticEvent | null,
    country: string | null,
  ) => {
    setValues({ ...values, country: `${country}` });
    const countryCodeLocator = data.find(
      (dbcountry) => dbcountry.country === country,
    );
    if (countryCodeLocator) {
      console.log(
        `Original country: ${values.country}, autocountry: ${countryCodeLocator.country}`,
      );
      setValues({
        ...values,
        countryCode: countryCodeLocator.countryCode,
        country: countryCodeLocator.country,
      });
    }
  };
  const roleHandler = (
    event: React.SyntheticEvent | null,
    role: string | null,
  ) => {
    setValues({ ...values, role: `${role}` });
  };
  const codeHandler = (
    event: React.SyntheticEvent | null,
    code: string | null,
  ) => {
    setValues({ ...values, countryCode: `${code}` });
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
          background:
            "linear-gradient(to right, rgb(133,91,164), rgb(57,114,185))",
          height: "100vh",
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              width: "40%",
              height: "70%",
              backgroundColor: "rgba(255, 255, 255, 0.62)",
            }}
          >
            <Snackbar
              open={success}
              variant="soft"
              color="success"
              startDecorator={<CheckCircleOutline />}
            >
              Data Successfully Saved.
            </Snackbar>
            <Snackbar
              open={failed}
              variant="soft"
              color="danger"
              startDecorator={<FontAwesomeIcon icon={faTimesCircle} />}
            >
              Data Save Unsuccessful
            </Snackbar>
            <Snackbar
              open={warning}
              variant="soft"
              color="warning"
              startDecorator={<WarningAmberRounded />}
            >
              User Already Exists
            </Snackbar>
            <form
              action="#"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const APIContact = await fetch("/api/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });
                if (APIContact.ok) {
                  setLoading(false);
                  setSuccess(true);
                  setTimeout(() => {
                    setSuccess(false);
                    router.push("/dashboard");
                  }, 3000);
                } else if (APIContact.status === 409) {
                  setLoading(false);
                  setWarning(true);
                  setTimeout(() => {
                    setWarning(false);
                    window.location.reload();
                  }, 3000);
                } else {
                  setLoading(false);
                  setFailed(true);
                  setTimeout(() => {
                    setFailed(false);
                    window.location.reload();
                  }, 3000);
                }
              }}
            >
              <Typography variant="plain" level="h1">
                Create an Account
              </Typography>
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Input
                  variant="soft"
                  color="warning"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={(e) =>
                    setValues({ ...values, firstName: e.target.value })
                  }
                />
                <Input
                  variant="soft"
                  color="warning"
                  placeholder="Last Name"
                  endDecorator={
                    <Select
                      value={values.title}
                      variant="soft"
                      color="warning"
                      onChange={handleTitle}
                    >
                      <Option value="" disabled>
                        --None--
                      </Option>
                      <Option value="Sr.">Sr.</Option>
                      <Option value="Jr.">Jr.</Option>
                      <Option value="II">II</Option>
                      <Option value="III">III</Option>
                      <Option value="IV">IV</Option>
                      <Option value="V">V</Option>
                    </Select>
                  }
                  value={values.lastName}
                  onChange={(e) =>
                    setValues({ ...values, lastName: e.target.value })
                  }
                />
              </Stack>
              <br />
              <Select
                defaultValue={"Select a country"}
                variant="soft"
                color="warning"
                value={values.country}
                onChange={handleCountryChange}
              >
                <Option value="Select a country" disabled>
                  --Select-A-Country--
                </Option>
                {data.map((country) => (
                  <Option value={country.country} key={country.country}>
                    {country.country}
                  </Option>
                ))}
              </Select>
              <br />
              <Input
                startDecorator={
                  <Select value={values.countryCode} onChange={codeHandler}>
                    <Option value="">--Country-Code--</Option>
                    {data.map((code) => (
                      <Option
                        value={code.countryCode}
                        key={code.countryCode}
                      >{`${code.countryCode} (+${code.mobileCode})`}</Option>
                    ))}
                  </Select>
                }
                variant="soft"
                color="warning"
                value={values.phoneNumber}
                placeholder="Phone Number"
                onChange={(e) =>
                  setValues({ ...values, phoneNumber: e.target.value })
                }
              />
              <br />
              <Select
                variant="soft"
                color="warning"
                value={values.role}
                onChange={roleHandler}
              >
                <Option value="select a role" disabled>
                  --Select-A-Role--
                </Option>
                <Option value="Agricultural Researcher">
                  Agricultural Researcher
                </Option>
                <Option value="Student">Student</Option>
              </Select>
              <br />
              <Input
                type="password"
                placeholder="Password"
                variant="soft"
                color="warning"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <br />
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="soft"
                  color="primary"
                  type="submit"
                  loading={loading}
                >
                  CREATE ACCOUNT
                </Button>
              </Stack>
            </form>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              width: "40%",
              height: "70%",
              backgroundImage:
                "linear-gradient(to bottom right, rgba(85, 94, 224, 0.45), rgba(111, 76, 215, 0.34)),url('/signup.png')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></Stack>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}
