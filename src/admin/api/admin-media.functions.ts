import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../../lib/config/server";
import { supabaseUploadStorageObject } from "@/lib/supabase.server";

import { requireAdminSession } from "./admin-session";

function toBuffer(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid data URL");
  }

  const contentType = match[1];
  const bytes = Buffer.from(match[2], "base64");
  return { contentType, bytes };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export const uploadAdminAsset = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      bucket: z.string().optional().default(""),
      folder: z.string().min(1),
      fileName: z.string().min(1),
      dataUrl: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();
    const { contentType, bytes } = toBuffer(data.dataUrl);
    const safeName = `${Date.now()}-${slugify(data.fileName)}.${
      contentType.split("/")[1] || "bin"
    }`;
    const path = `${data.folder}/${safeName}`;
    const { mediaBucketName, supabaseUrl } = getServerConfig();
    const bucket = data.bucket || mediaBucketName;

    await supabaseUploadStorageObject(bucket, path, bytes, contentType);
    const baseUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
    if (!baseUrl) {
      throw new Error("Missing SUPABASE_URL");
    }
    return {
      path,
      publicUrl: `${baseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${path
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/")}`,
    };
  });
