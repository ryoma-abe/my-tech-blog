import prisma from "@/lib/prisma";

export async function getOwnPosts(userId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
}
