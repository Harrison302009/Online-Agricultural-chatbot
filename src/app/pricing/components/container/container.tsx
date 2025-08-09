"use client";
import { data } from "@/app/dashboard/components/countries/countries";
import { currencySymbol } from "@/app/atom-data/atom-data";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

const PlanHolder = () => {
  const [symbol, setSymbol] = useAtom(currencySymbol);
  const [basicPrice, setBasicPrice] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const session = useSession();
  useEffect(() => {
    const userSymbol = data.find(
      (country) => country.country === session.data?.user.country,
    );
    if (userSymbol) {
      setSymbol(userSymbol.symbol);
      setBasicPrice(`${userSymbol.basicPrice?.toLocaleString()}`);
      setPremiumPrice(`${userSymbol.premiumPrice?.toLocaleString()}`);
    }
  }, [session, setSymbol]);
  const paystackConfig = (plan: string) => {
    return {
      email: session.data?.user?.email || "user@example.com",
      amount:
        plan === "Basic Plan"
          ? parseInt(basicPrice) * 100000
          : parseInt(premiumPrice) * 100000,
      publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
      text: `Subscribe to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
      onSuccess: (response: any) => {
        alert(
          `Payment successful! Transaction reference: ${response.reference}`,
        );
      },
      onClose: () => alert("Payment closed"),
    };
  };
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0fdf4", // Soft green background
    padding: "24px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "32px",
    color: "#065f46", // Deep green for text
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    width: "100%",
    maxWidth: "960px",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    border: "1px solid #d1fae5", // Light green border
  };

  const highlightedCardStyle = {
    ...cardStyle,
    border: "2px solid #10b981", // Highlighted green border
  };

  const titleCardStyle = {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#065f46",
    marginBottom: "16px",
  };

  const descriptionStyle = {
    color: "#065f46",
    marginBottom: "16px",
  };

  const priceStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#065f46",
    marginBottom: "16px",
  };

  const perksStyle: React.CSSProperties = {
    listStyleType: "none",
    padding: 0,
    marginBottom: "16px",
    color: "#065f46",
    textAlign: "left",
  };

  const perkItemStyle = {
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  };

  const perkIconStyle = {
    marginRight: "8px",
    color: "#10b981", // Green checkmark
  };

  const buttonStyle = {
    backgroundColor: "#10b981",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  };

  const buttonHoverStyle = {
    backgroundColor: "#059669",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Plans and Pricing</h1>
      <div style={gridStyle}>
        {/* Free Plan */}
        <div style={cardStyle}>
          <h2 style={titleCardStyle}>Free</h2>
          <p style={descriptionStyle}>
            Perfect for individuals exploring our platform.
          </p>
          <p style={priceStyle}>
            {symbol}0
            <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
              /month
            </span>
          </p>
          <ul style={perksStyle}>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌱</span> Crop Price Trends: Annual
              Review
            </li>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌱</span> Access to general community
              groups
            </li>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌱</span> Limited access to the
              agricultural FAQ knowledge base.
            </li>
          </ul>
          <button
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                buttonStyle.backgroundColor)
            }
          >
            Get Started
          </button>
        </div>
        {/* Basic Plan */}
        <div style={highlightedCardStyle}>
          <h2 style={titleCardStyle}>Basic</h2>
          <p style={descriptionStyle}>
            Well-suited for small teams and startup companies.
          </p>
          <p style={priceStyle}>
            {symbol}
            {basicPrice}
            <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
              /month
            </span>
          </p>
          <ul style={perksStyle}>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌾</span> Crop Price Trends: Annual
              and Two-Year Historical Analysis
            </li>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌾</span> Limited access to regional
              groups
            </li>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌾</span> Limited access to the
              agricultural FAQ knowledge base.
            </li>
          </ul>
          <PaystackButton
            className="paystack"
            {...paystackConfig("Basic Plan")}
          />
        </div>
        {/* Premium Plan */}
        <div style={cardStyle}>
          <h2 style={titleCardStyle}>Premium</h2>
          <p style={descriptionStyle}>
            Best for large organizations and enterprises.
          </p>
          <p style={priceStyle}>
            {symbol}
            {premiumPrice}
            <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
              /month
            </span>
          </p>
          <ul style={perksStyle}>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌳</span> Crop Price Trends: Annual
              and 41-Year Historical Analysis
            </li>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌳</span> Access priority expert
              discussions, webinars, etc.
            </li>
            <li style={perkItemStyle}>
              <span style={perkIconStyle}>🌳</span> Personalized answers and
              in-depth guidance from agricultural experts
            </li>
          </ul>
          <PaystackButton
            className="paystack"
            {...paystackConfig("Premium Plan")}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanHolder;
