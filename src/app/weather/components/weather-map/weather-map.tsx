"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import "../../../globalicons.css";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface MapComponentProps {
  center: LatLngTuple;
  zoom: number;
}

const fetchWeather = async (latitude: number, longitude: number) => {
  const apiKey = "681a847ebddfec8c90bc96ae7e0af34e";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface WeatherSidebarProps {
  weatherData: WeatherData | null;
}

const WeatherSidebar: React.FC<WeatherSidebarProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div
      className="weather-sidebar"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        top: 0,
        alignItems: "center",
        zIndex: 999,
        backgroundColor: "rgba(128, 128, 128, 0.4)",
        width: "100%",
      }}
    >
      <br />
      <Marquee direction="left" pauseOnHover>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Edu AU VIC WA NT Hand', cursive",
            fontOpticalSizing: "auto",
            fontWeight: 300,
            fontStyle: "normal",
            height: 50,
          }}
        >
          AICulture Weather Forecast System
        </Typography>
      </Marquee>
      <br />
      <p className="advents">Temperature: {weatherData.main.temp}K</p>
      <br />
      <p className="advents">Weather: {weatherData.weather[0].description}</p>
    </div>
  );
};

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);

  return null;
};

export default function MappingBoard() {
  const [view, setView] = useState<LatLngTuple>([51.505, -0.09]);
  const [zoom, setZoom] = useState(13);
  const [weatherData, setWeatherData] = useState(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(true);

  const navigateBackwards = () => {
    router.back();
  };
  const zoomToUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const userLatLng: LatLngTuple = [latitude, longitude];
        setView(userLatLng);
        setZoom(13);
        setOpen(false);

        const weather = await fetchWeather(latitude, longitude);
        setWeatherData(weather);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <MapContainer
        center={view}
        zoom={zoom}
        style={{
          display: "flex",
          position: "absolute",
          height: "100vh",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapComponent center={view} zoom={zoom} />
      </MapContainer>
      <Tooltip
        title="Click the radar to view the weather forecast of your current location"
        open={open}
        arrow
        slotProps={{ tooltip: { sx: { fontSize: 15 } } }}
      >
        <span
          className="material-symbols-outlined"
          title="Get the forecast of your location"
          onClick={zoomToUserLocation}
          style={{
            display: open ? "flex" : "none",
            position: "absolute",
            top: 0,
            right: "5%",
            zIndex: 1900,
            cursor: "pointer",
          }}
        >
          my_location
        </span>
      </Tooltip>
      <span
        className="material-symbols-outlined"
        id="arrow"
        onClick={() => router.back()}
      >
        arrow_back
      </span>
      <WeatherSidebar weatherData={weatherData} />
    </div>
  );
}
