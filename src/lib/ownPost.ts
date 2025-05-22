import prisma from "@/lib/prisma";

export async function getOwnPost(userId: string, postId: string) {
  return await prisma.post.findFirst({
    where: {
      AND: [{ authorId: userId }, { id: postId }],
    },
    select: {
      id: true,
      title: true,
      content: true,
      topImage: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
