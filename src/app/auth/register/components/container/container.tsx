"use client";
import { data } from "@/app/dashboard/components/countries/countries";
import {
  Box,
  Button,
  CssVarsProvider,
  Input,
  MenuItem,
  Option,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/joy";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "Select a country",
    countryCode: "",
    phoneNumber: "",
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
  const codeHandler = (
    event: React.SyntheticEvent | null,
    code: string | null,
  ) => {
    setValues({ ...values, countryCode: `${code}` });
  };
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
              height: "80%",
              backgroundColor: "rgba(255, 255, 255, 0.62)",
            }}
          >
            <form action="#">
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
                  startDecorator={
                    <Select
                      value={values.title}
                      variant="soft"
                      color="warning"
                      onChange={handleTitle}
                    >
                      <Option value="" disabled>
                        --None--
                      </Option>
                      <Option value="Mr.">Mr.</Option>
                      <Option value="Mrs.">Mrs.</Option>
                      <Option value="Sr.">Sr.</Option>
                      <Option value="Jr.">Jr.</Option>
                    </Select>
                  }
                  value={values.firstName}
                  onChange={(e) =>
                    setValues({ ...values, firstName: e.target.value })
                  }
                />
                <Input
                  variant="soft"
                  color="warning"
                  placeholder="Last Name"
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
                  <Option value={country.country} key={country.currency}>
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
            </form>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              width: "40%",
              height: "80%",
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
