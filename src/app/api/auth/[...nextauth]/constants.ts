import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // How long email links are valid for (default 24h)
      async sendVerificationRequest({ identifier, url, provider }) {
        const { server, from } = provider;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport(server);

        // Define custom email message
        const message = {
          from,
          to: identifier,
          subject: "Email verification request",
          text: `Hello,\n\nYou requested to sign in. Click the link below to proceed:\n\n${url}\n\nThis link will expire in 10 minutes.\n\nThank you!`,
          html: `
          <html>
          <head>
          <style>
          .material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
          </style>
          </head>
          <body style="background-image: url('https://aiculture-uk.vercel.app/ai-mail.png'); background-size: cover; background-position: center;">
            <div style="display: flex; align-items: center; padding: 20px; background-color: rgba(244,248,236,0.4); border-radius: 10px; border: 2px solid #d1e7d0; width: 100%; height: 150px;">
  <img src="https://aiculture-uk.vercel.app/Samp.png" height="120" width="120" style="border-radius: 50%; border: 2px solid #8bc34a;" />
  <h1 style="font-size: 36px; color: #4d7c0f; font-family: 'Poppins', sans-serif; margin-left: 20px;">
    Hi, ${identifier.split("@")[0]}
  </h1>
</div>
<h3 style="font-size: 28px; font-family: 'Roboto', sans-serif; color: #19e300; margin-top: 20px;">
  We received a request to sign you into your account. To proceed, click the button below:
</h3>
<div style="text-align: center; margin: 30px 0;">
  <a href="${url}" style="text-decoration: none;">
    <button style="font-size: 20px; padding: 15px 25px; background-color: #6caf4a; color: white; border: none; border-radius: 8px; box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
      Sign in to Your Account
    </button>
  </a>
</div>
<p style="font-size: 18px; font-family: 'Roboto', sans-serif; color: #19e300; text-align: center;">
  This link will expire in 24 hours. If you did not request this, please ignore this email.
</p>
<p style="font-size: 18px; font-family: 'Roboto', sans-serif; color: #19e300; text-align: center; margin-top: 20px;">
  Thank you for being part of our journey toward smarter and more sustainable agriculture!
</p>
<div style="text-align: center; margin: 30px 0;">
  <h4 style="font-size: 20px; font-family: 'Roboto', sans-serif; color: #19e300;">Follow us on social media:</h4>
  <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-top: 10px; width: 100%;">
    <a href="https://www.facebook.com" style="text-decoration: none;">
      <img src="https://aiculture-uk.vercel.app/facebook.png" alt="Facebook" style="width: 40px; height: 40px;" />
    </a>
    <a href="https://www.twitter.com" style="text-decoration: none;">
      <img src="https://aiculture-uk.vercel.app/x.png" alt="X" style="width: 40px; height: 40px;" />
    </a>
    <a href="https://www.linkedin.com" style="text-decoration: none;">
      <img src="https://aiculture-uk.vercel.app/linkedin.png" alt="LinkedIn" style="width: 40px; height: 40px;" />
    </a>
    <a href="https://www.instagram.com" style="text-decoration: none;">
      <img src="https://aiculture-uk.vercel.app/instagram.png" alt="Instagram" style="width: 40px; height: 40px;" />
    </a>
  </div>
</div>
          </body>
          </html>
`,
        };

        // Send the email
        await transporter.sendMail(message);
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (dbUser) {
        await prisma.user.update({
          where: { email: user.email },
          data: {
            lastLogin: new Date(),
          },
        });
      } else {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            lastLogin: new Date(),
          },
        });
      }
      return {
        ...session,
        user,
      };
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for checking email message)
  },
};
