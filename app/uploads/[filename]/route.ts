import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const filePath = join(process.cwd(), "public", "uploads", filename);

  try {
    const buffer = await readFile(filePath);
    
    // Get extension and set content type
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    const contentTypes: Record<string, string> = {
      "png": "image/png",
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "gif": "image/gif",
      "webp": "image/webp",
      "svg": "image/svg+xml",
      "pdf": "application/pdf",
      "zip": "application/zip"
    };

    return new Response(buffer, {
      headers: {
        "Content-Type": contentTypes[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });

  } catch (error) {
    console.error("Error serving file:", error);
    return new Response("File not found", { status: 404 });
  }
}
