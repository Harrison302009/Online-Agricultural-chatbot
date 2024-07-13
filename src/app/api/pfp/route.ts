import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  let imageUrl = "";
  if (req.body.avatar) {
    const result = await cloudinary.uploader.upload(req.body.avatar.path, {
      folder: "avatars",
    });

    imageUrl = result.secure_url;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId.toString() },
        data: { avatarUrl: imageUrl },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating user avatar.");
    }
  }
};

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  const userData = await prisma.user.findUnique({
    where: { id: userId },
  });
};
