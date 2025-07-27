import type { NextRequest } from "next/server";

const API_KEY = process.env.BUNNY_API_KEY || "";
const STORAGE_ZONE = "curyrio";
const CDN_BASE_URL = "https://cdn.curyrio.com.br";
const STORAGE_BASE_URL = `https://storage.bunnycdn.com/${STORAGE_ZONE}/videos`;

export async function POST(req: NextRequest) {
  if (!API_KEY || !STORAGE_ZONE || !CDN_BASE_URL) {
    return new Response("Bunny.net video storage credentials are not configured.", { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return new Response("Arquivo não encontrado", { status: 400 });
  }

  // Sanitize file name
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
  const uploadUrl = `${STORAGE_BASE_URL}/${safeFileName}`;

  const buffer = await file.arrayBuffer();

  try {
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: API_KEY,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: buffer,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error(errorText);
      return new Response(`Erro ao fazer upload no BunnyCDN: ${errorText}`, { status: 500 });
    }

    return new Response(
      JSON.stringify({
        message: "Upload com sucesso!",
        url: `${CDN_BASE_URL}/videos/${safeFileName}`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Erro ao processar vídeo:", error);
    return new Response("Erro interno no processamento", { status: 500 });
  }
} 