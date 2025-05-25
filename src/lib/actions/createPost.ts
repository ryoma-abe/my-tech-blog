"use server";

import { auth } from "@/auth";
import { saveImage } from "@/utils/image";
import { postSchema } from "@/validations/post";
import prisma from "../prisma";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const topImageInput = formData.get("topImage");
  const topImage = topImageInput instanceof File ? topImageInput : null;

  const validationResult = postSchema.safeParse({ title, content, topImage });
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  let imageUrl: string | null = null;
  try {
    imageUrl = topImage ? await saveImage(topImage) : null;
  } catch {
    return { success: false, errors: { image: ["画像の保存に失敗しました"] } };
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.email || !userId) {
    return {
      success: false,
      errors: { auth: ["ログイン情報が確認できません"] },
    };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        topImage: imageUrl,
        published: true,
        authorId: userId,
      },
    });
  } catch {
    return {
      success: false,
      errors: { db: ["記事の保存に失敗しました"] },
    };
  }

  redirect("/dashboard");
}
