import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

/**
 * A POST handler which receives a JSON object with email and message properties.
 * It sends an email to the email address specified in the CONTACT_EMAIL env variable using
 * nodemailer with the EMAIL_SERVER env var to specify the smtp details and the EMAIL_FROM
 * env var to specify the sender address.
 */
export async function POST(req: Request) {
  const { email, message } = await req.json();

  const emailServerUrl = process.env.EMAIL_SERVER;

  if (!emailServerUrl) {
    throw new Error("EMAIL_SERVER env var not set");
  }

  const emailServerUrlObject = new URL(emailServerUrl);

  // Extract SMTP details from the URL
  const smtpHost = emailServerUrlObject.hostname;
  const smtpPort = emailServerUrlObject.port || 587; // Default SMTP port
  const smtpUser = emailServerUrlObject.username;
  const smtpPass = emailServerUrlObject.password;

  // Configure the Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  } as SMTPTransport.Options);

  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender address
    to: process.env.CONTACT_EMAIL, // Receiver address
    replyTo: email,
    subject: "Contact Form Message", // Subject line
    text: `
Message from: ${email}

Message: 
${message}    

    `, // Plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to send email",
        },
        { status: 500 },
      );
    }
    console.log("Email sent: " + info.response);
    return NextResponse.json({
      status: "success",
      message: "Email sent successfully",
    });
  });
}
