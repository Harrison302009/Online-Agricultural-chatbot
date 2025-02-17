"use client";
import { data } from "@/app/dashboard/components/countries/countries";
import { MenuBar } from "@/components/menubar/menubar";
import { Box, Stack, Drawer, Avatar, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { PlanCard } from "../plan-cards";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { User } from "@/app/admin/page";
import { PaystackButton } from "react-paystack";

export default function PlanHolder() {
  const [userCountry, setUserCountry] = useState();
  const [currency, setCurrency] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [basicDisplay, setBasicDisplay] = useState("");
  const [premiumDisplay, setPremiumDisplay] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [application, setApplication] = useState<User[]>([] || "");
  const [available, setAvailable] = useState(false);
  const [premiumPrice, setPremiumPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState("");
  const session = useSession();
  useEffect(() => {
    const fetchPlan = async () => {
      const response = await fetch("/api/plans", {
        method: "GET",
      });
      const data: User[] = await response.json();
      setApplication(data);
    };
    fetchPlan();
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const userData = data.find((item) => item.country === userCountry);
    if (price) {
      setBasicDisplay(`${userData?.basicPrice?.toLocaleString()}`);
      setPremiumDisplay(`${userData?.premiumPrice?.toLocaleString()}`);
    }
  }, [price, userCountry]);
  const submitPlan = async (registration: string) => {
    const request = await fetch("/api/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration }),
    });
    if (request.ok) {
      console.log("Plan changed successfully");
      alert("Plan changed successfully");
      const response = await fetch("/api/plans", {
        method: "GET",
      });
      const data: User[] = await response.json();
      setApplication(data);
    } else {
      console.error("Failed to change plan");
      alert("Failed to change plan");
    }
  };
  useEffect(() => {
    if (userCountry) {
      const updateUserCountry = async () => {
        const response = await fetch(`/api/country`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userCountry }),
        });
        if (response.ok) {
          console.log("Country updated successfully");
        } else {
          console.error("Failed to fetch user's country");
        }
      };
      updateUserCountry();
    }
  }, [userCountry]);
  useEffect(() => {
    if (session.data?.user) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [session.data?.user]);
  useEffect(() => {
    const userData = data.find((item) => item.country === userCountry);
    if (userData) {
      setCurrency(userData.currency);
      setSymbol(userData.symbol);
      setPrice(`${userData.basicPrice}`);
      setPremiumPrice(`${userData.premiumPrice}`);
    } else {
      setCurrency("USD");
      setPrice("162");
      setPremiumPrice("3642");
      setSymbol("$");
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
  const paystackConfig = (plan: string) => {
    return {
      email: session.data?.user?.email || "user@example.com",
      amount:
        plan === "Basic Plan"
          ? parseInt(price) * 100
          : parseInt(premiumPrice) * 100,
      publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
      text: `Subscribe to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
      onSuccess: (response: any) => {
        alert(
          `Payment successful! Transaction reference: ${response.reference}`,
        );
        submitPlan(plan);
      },
      onClose: () => alert("Payment closed"),
    };
  };

  return (
    <Box>
      <Stack
        sx={{
          background: "linear-gradient(to bottom right, blue, purple)",
          height: { xs: "100%", sm: "100%", md: "100%", lg: "100vh" },
          width: { xs: 930, sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        }}
      >
        <Drawer
          open={open}
          onClose={handleClose}
          anchor="right"
          PaperProps={{
            sx: { width: { xs: 75, sm: 100, md: 150, lg: 250, xl: 350 } },
          }}
        >
          <MenuBar />
        </Drawer>
        <Stack
          sx={{
            display: "flex",
            position: "absolute",
            flexDirection: "row",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          <Image
            src={"/ai.jpg"}
            alt="ai"
            height={100}
            width={100}
            style={{ display: "block", visibility: "hidden" }}
            onLoad={() => setLoaded(true)}
          ></Image>
          <Stack
            sx={{
              display: "flex",
              position: "absolute",
              right: "2%",
              top: "25%",
            }}
          >
            {available && (
              <Avatar
                sx={{
                  height: { xs: 25, md: 29, lg: 32, xl: 150 },
                  width: { xs: 25, md: 29, lg: 32, xl: 150 },
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              >
                <Typography variant="h6">
                  {session.data?.user?.name?.toUpperCase().substring(0, 1) ||
                    session.data?.user?.email?.toUpperCase().substring(0, 1)}
                </Typography>
              </Avatar>
            )}
          </Stack>
        </Stack>
        <Typography
          variant="h3"
          sx={{
            width: "100%",
            textAlign: "center",
            fontFamily: "'Nerko One', cursive",
            fontStyle: "normal",
            fontWeight: 300,
            fontOpticalSizing: "auto",
          }}
        >
          Plans & Pricing
        </Typography>
        {application.map((user) => (
          <div key={user.id}>
            <Marquee>
              <Typography
                variant="body1"
                sx={{ color: "blue.600", zIndex: 500, fontFamily: "monospace" }}
              >
                {user.plan === "new"
                  ? "You do not have a plan yet"
                  : `You are currently on the ${user.plan}`}
              </Typography>
            </Marquee>
          </div>
        ))}
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            gap: 0,
            width: "100%",
          }}
        >
          <PlanCard
            tier=""
            symbol=""
            price={null}
            currency=""
            description=""
            category="nullible"
            firstRemark="Latest data about user's country"
            secondRemark="MWF display"
            thirdRemark="Latest data worldwide"
            fourthRemark="Decentralized chat"
            fifthRemark="AI Chat Feature"
            sixthRemark="Access to a world map"
            seventhRemark="Plant detection trial (10 days)"
            eighthRemark="Plant detection System"
            remarkColor="grey.600"
            render={"h5"}
            duration={null}
          >
            <Button sx={{ display: "flex", visibility: "hidden" }}>
              Upgrade Now
            </Button>
          </PlanCard>
          <PlanCard
            tier="Free"
            symbol={symbol}
            price={0}
            currency={currency}
            category="material-symbols-outlined"
            description="Free plan"
            firstRemark="close"
            secondRemark="check"
            thirdRemark="check"
            fourthRemark="check"
            fifthRemark="close"
            sixthRemark="close"
            seventhRemark="check"
            eighthRemark="close"
            remarkColor="grey.600"
            render={"span"}
            duration="/month"
          >
            <Button
              className="purchase"
              onClick={() => submitPlan("Free plan")}
            >
              Start for free
            </Button>
          </PlanCard>
          <PlanCard
            tier="Basic"
            symbol={symbol}
            price={basicDisplay}
            currency={currency}
            category="material-symbols-outlined"
            description="Basic plan"
            firstRemark="check"
            secondRemark="check"
            thirdRemark="check"
            fourthRemark="check"
            fifthRemark="close"
            sixthRemark="close"
            seventhRemark="check"
            eighthRemark="close"
            remarkColor="grey.600"
            render={"span"}
            duration="/month"
          >
            <PaystackButton
              {...paystackConfig("Basic Plan")}
              className="paystack"
            />
          </PlanCard>
          <PlanCard
            tier="Premium"
            category="material-symbols-outlined"
            symbol={symbol}
            price={premiumDisplay}
            currency={currency}
            description="Premium plan"
            remarkColor="grey.600"
            firstRemark="check"
            secondRemark="check"
            thirdRemark="check"
            fourthRemark="check"
            fifthRemark="check"
            sixthRemark="check"
            seventhRemark="check"
            eighthRemark="check"
            render={"span"}
            duration="/month"
          >
            <PaystackButton
              {...paystackConfig("Premium Plan")}
              className="paystack"
            />
          </PlanCard>
        </Stack>
      </Stack>
    </Box>
  );
}
