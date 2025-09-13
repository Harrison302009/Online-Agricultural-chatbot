import { RootProvider } from "@/providers/root-provider/root-provider";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AICulture",
    default: "AICulture",
  },
  description:
    "An AI agriculture website intended to help people with agricultural questions and help users chat with other users for better understanding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          property="og:image"
          content="https://aiculture-uk.vercel.app/login-background.png"
        />
        <meta
          name="google-site-verification"
          content="6xg7dHkX7aMF_Iyqc98acdKiDhtlXuvWEtawis4YGWY"
        />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
