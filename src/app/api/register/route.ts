import { data } from "@/app/dashboard/components/countries/countries";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    title,
    firstName,
    lastName,
    password,
    country,
    countryCode,
    phoneNumber,
    role,
  } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unãuthorized" }, { status: 401 });
  }
  console.log(countryCode);
  const alreadyExisting = await prisma.registeredUsers.findFirst({
    where: { email: session.user.email },
  });
  if (alreadyExisting) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 },
    );
  }
  const emailRegistrar = await prisma.registeredUsers.create({
    data: {
      email: session.user.email,
      password,
    },
  });
  if (emailRegistrar) {
    const codeFilter = data.find(
      (shortCountry) => shortCountry.countryCode === countryCode,
    );
    if (codeFilter) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: `${title} ${firstName} ${lastName}`,
          country,
          phoneNumber: `+${codeFilter.mobileCode} ${phoneNumber}`,
          role,
          password,
        },
      });
    }
  }
  return NextResponse.json({ message: "Data sâved" }, { status: 200 });
};
export const GET = async () => {
  const list = await prisma.registeredUsers.findMany();
  return NextResponse.json(list);
};
