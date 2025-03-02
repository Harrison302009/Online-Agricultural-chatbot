import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    Answer1,
    Answer2,
    Answer3,
    Answer4,
    Answer5,
    Answer6,
    Answer7,
    Answer8,
    Answer9,
    Answer10,
    experiencelevel,
    educationalCertificate,
  } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }
  const alreadyExistingApplication = await prisma.exam.findFirst({
    where: { userId: session.user.id },
  });
  if (alreadyExistingApplication) {
    console.log(alreadyExistingApplication);
    return NextResponse.json(
      { error: "You have already submitted an application" },
      { status: 400 },
    );
  }
  await prisma.exam.create({
    data: {
      userId: session.user.id,
      Answer1,
      Answer2,
      Answer3: `${Answer3} ${experiencelevel}`,
      Answer4,
      Answer5,
      Answer6,
      Answer7,
      Answer8,
      Answer9,
      Answer10,
      Certificate: educationalCertificate,
    },
  });
  await prisma.user.update({
    where: { id: session.user.id },
    data: { hasPendingApplications: true, ApplicationStatus: "PENDING" },
  });
  return NextResponse.json(
    { message: "Application submitted successfully" },
    { status: 200 },
  );
};

export const GET = async () => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const applications = await prisma.exam.findMany();
  return NextResponse.json(applications);
};

export const DELETE = async () => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 },
    );
  }
  await prisma.exam.deleteMany();
  await prisma.user.updateMany({
    where: { hasPendingApplications: true, ApplicationStatus: "PENDING" },
    data: { hasPendingApplications: false, ApplicationStatus: "" },
  });
  setTimeout(async () => {
    const display = await prisma.user.findMany({
      where: { hasPendingApplications: true },
    });
    console.log(display);
  }, 3000);
  return NextResponse.json(
    { message: "Successfully cleared the database" },
    { status: 200 },
  );
};
