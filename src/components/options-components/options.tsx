import { CssVarsProvider, ListItemButton, Stack, Typography } from "@mui/joy";
import "../../app/globalicons.css";

export default function Options({
  image,
  text,
  disabled,
}: {
  image: string;
  text: string;
  disabled?: boolean;
}) {
  return (
    <CssVarsProvider>
      <ListItemButton
        sx={{
          display: "flex",
          position: "relative",
          width: "18%",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        disabled={disabled}
      >
        <span className="material-symbols-outlined">{image}</span>
        <Typography variant="plain" level="title-md">
          {text}
        </Typography>
      </ListItemButton>
    </CssVarsProvider>
  );
}
