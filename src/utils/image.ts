import { writeFile } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function saveImage(file: File): Promise<string | null> {
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true";
  if (useSupabase) {
    return await saveImageToSupabase(file);
  } else {
    return await saveImageToLocal(file);
  }
}

export async function saveImageToLocal(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer()); // バイナリデータをBuﬀerに変換
  const fileName = `${Date.now()}_${file.name}`; // ファイル名生成 日時_ファイル名
  const uploadDir = path.join(process.cwd(), "public/images"); // アップロードフォルダ
  try {
    const filePath = path.join(uploadDir, fileName); // 保存先の完全なファイル名
    await writeFile(filePath, buffer); // 指定パスにファイル(buﬀer)を書き込む
    return `/images/${fileName}`; // URLパスを返す
  } catch (error) {
    console.error("画像保存エラー:", error);
    return null;
  }
}

async function saveImageToSupabase(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from("my-tech-blog-bucket")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }
  const { data: publicUrlData } = supabase.storage
    .from("my-tech-blog-bucket")
    .getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}
