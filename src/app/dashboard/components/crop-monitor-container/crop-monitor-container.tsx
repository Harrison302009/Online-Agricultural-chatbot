"use client";
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  CssVarsProvider,
  Grid,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { crops, trendingCrops } from "../crops/crops";
import { useState } from "react";

export default function CropMonitorContainer() {
  const [value, setValue] = useState({
    name: "",
    image: "",
    origin: "",
    soil: "",
    harvestTime: "",
    yield: "",
  });
  const [open, setOpen] = useState(false);
  const cropFind = (cropName: string) => {
    const targetCrop = crops.find((crop) => crop.name === cropName);
    if (targetCrop) {
      setValue(targetCrop);
      setOpen(true);
    }
  };
  return (
    <CssVarsProvider>
      <Box>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            sx={{
              background: "linear-gradient(135deg, #f0fdf4, #d1fae5)",
              maxWidth: 600,
            }}
          >
            <ModalClose />
            <AspectRatio sx={{ width: 300 }} objectFit="fill">
              <Image
                src={value.image}
                alt={value.name}
                height={260}
                width={300}
              />
            </AspectRatio>
            <Typography level="h3" sx={{ color: "#047857" }}>
              {value.name}
            </Typography>
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Typography level="title-md" sx={{ color: "#064e3b" }}>
                Origin: {value.origin}
              </Typography>
              <Typography level="title-md" sx={{ color: "#064e3b" }}>
                Yield: {value.yield}
              </Typography>
            </Stack>
            <Typography level="title-md" sx={{ color: "#064e3b" }}>
              Soil: {value.soil}
            </Typography>
            <Typography level="title-md" sx={{ color: "#064e3b" }}>
              Harvest Time: {value.harvestTime}
            </Typography>
          </ModalDialog>
        </Modal>
        <Stack>
          <Typography level="h2" variant="soft" textAlign="center">
            Crop Growth Monitor
          </Typography>
          <Input />
          <br />
          <Stack>
            <Typography level="h3">Trending Crops</Typography>
            <Stack spacing={2}>
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                {trendingCrops.map((crop) => (
                  <Stack key={crop.name} onClick={() => cropFind(crop.name)}>
                    <Card
                      variant="soft"
                      sx={{
                        width: 200,
                        display: "flex",
                        position: "relative",
                      }}
                    >
                      <CardOverflow>
                        <AspectRatio objectFit="fill">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            draggable={false}
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent>
                        <Typography level="title-md">{crop.name}</Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}
