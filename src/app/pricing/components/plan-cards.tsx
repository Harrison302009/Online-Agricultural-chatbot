"use client";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import "../../globalicons.css";
import React, { ElementType, useEffect, useState } from "react";
import Image from "next/image";
import "../../globalicons.css";

export function PlanCard({
  tier,
  symbol,
  price,
  currency,
  description,
  remarkColor,
  firstRemark,
  secondRemark,
  thirdRemark,
  fourthRemark,
  fifthRemark,
  sixthRemark,
  seventhRemark,
  eighthRemark,
  render,
  category,
  duration,
  children,
  remarkChildren,
}: {
  tier: string;
  symbol: string;
  price: number | null | string;
  currency: string;
  description: string;
  remarkColor: string;
  firstRemark: string;
  secondRemark: string;
  thirdRemark: string;
  fourthRemark?: string;
  fifthRemark?: string;
  sixthRemark?: string;
  seventhRemark?: string;
  eighthRemark?: string;
  children?: React.ReactNode;
  render: ElementType<any>;
  category: string;
  duration: string | null;
  remarkChildren?: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userCountry, setUserCountry] = useState();
  useEffect(() => {
    if (userCountry) {
      setLoaded(true);
    }
  }, [userCountry]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;

      fetchUserCountry(latitude, longitude);
    });
  }, []);
  const fetchUserCountry = async (latitude: number, longitude: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "570ee4b49ecf4bf786052677c5f4a082";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&pretty=1`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results.length > 0) {
            setUserCountry(data.results[0].components.country);
          }
        } catch (error) {
          console.error("Error fetching user country:", error);
        }
      });
    }
  };
  const remarkStyles: React.CSSProperties = {
    color: remarkColor,
    fontFamily: "'Sofadi One', system-ui",
    fontStyle: "normal",
    fontWeight: 300,
    fontOpticalSizing: "auto",
  };
  return (
    <Stack sx={{ width: { xs: 900, sm: 167, md: 175, lg: "25%", xl: "42%" } }}>
      <Image
        alt="Loader"
        src={"/profile.png"}
        height={100}
        width={100}
        style={{ display: "flex", visibility: "hidden", position: "absolute" }}
        onLoad={() => setImageLoaded(true)}
      ></Image>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          position: "relative",
          width: { xs: "25%", sm: "25%", md: "25%", lg: "100%", xl: "36%" },
          height: "100%",
          flexDirection: "column",
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.5) 75%, rgba(208,208,209,0.5))",
        }}
      >
        {loaded ? (
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: 400,
              fontStyle: "normal",
              color: "grey.600",
            }}
          >
            {tier}
          </Typography>
        ) : (
          <Skeleton variant="text" height={30} width={100} />
        )}
        <hr />
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "row",
              width: "100%",
            }}
          >
            {loaded ? (
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Oswald', sans-serif",
                  fontOpticalSizing: "auto",
                  fontWeight: 700,
                  fontStyle: "normal",
                  backgroundImage:
                    "linear-gradient(to bottom right, blue, purple)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {symbol}
                {price}
              </Typography>
            ) : (
              <Skeleton variant="text" height={30} width={200}></Skeleton>
            )}
            {loaded ? (
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Oswald', sans-serif",
                  fontOpticalSizing: "auto",
                  fontWeight: 400,
                  fontStyle: "normal",
                  color: "blue",
                }}
              >
                <sub>
                  {currency}
                  {duration}
                </sub>
              </Typography>
            ) : (
              <Skeleton variant="text" height={30} width={50}></Skeleton>
            )}
          </Stack>
          <br />
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {imageLoaded ? (
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 300,
                  fontStyle: "normal",
                  height: 60,
                }}
              >
                {description}
              </Typography>
            ) : (
              <Skeleton variant="text" height={60} width={75} />
            )}
          </Stack>
          <hr style={{ width: "100%", border: "1px solid #a6a6a6" }} />
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {firstRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {secondRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {thirdRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {fourthRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {fifthRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {sixthRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {seventhRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
            {imageLoaded ? (
              <span className={category} style={{ color: "gray" }}>
                {eighthRemark}
              </span>
            ) : (
              <Skeleton variant="text" height={30} width={100} />
            )}
          </Stack>
          <br />
          <Stack sx={{ display: "flex", position: "relative", width: "48%" }}>
            {children}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
