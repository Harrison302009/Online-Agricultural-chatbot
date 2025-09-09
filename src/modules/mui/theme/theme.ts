import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
