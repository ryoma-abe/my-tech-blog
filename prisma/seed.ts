import { PrismaClient, Prisma } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userData: Omit<Prisma.UserCreateInput, "password">[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    const hashedPassword = await bcrypt.hash("password123", 6); // 任意のパスワード
    await prisma.user.create({
      data: {
        ...u,
        password: hashedPassword,
      } as Prisma.UserCreateInput,
    });
  }
}

main();
