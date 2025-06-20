import { Box, CssVarsProvider, Input, Stack, Typography } from "@mui/joy";

export default function CropMonitorContainer() {
  return (
    <CssVarsProvider>
      <Box>
        <Stack>
          <Typography level="h2" variant="soft" textAlign="center">
            Crop Growth Monitor
          </Typography>
          <Input />
        </Stack>
      </Box>
    </CssVarsProvider>
  );
}
