import type { NextRequest } from "next/server";
import sharp from "sharp";

const API_KEY = process.env.BUNNY_API_KEY || "";
const STORAGE_ZONE = "curyrio";
const CDN_BASE_URL = "https://cdn.curyrio.com.br";
const STORAGE_BASE_URL = `https://storage.bunnycdn.com/${STORAGE_ZONE}/images`;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return new Response("Arquivo não encontrado", { status: 400 });
  }

  const fileName = file.name || 'untitled';
  const fileBaseName = fileName.includes('.') ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName;
  const safeFileBaseName = fileBaseName.replace(/[^a-zA-Z0-9.\-_]/g, '');

  const uploadUrl = `${STORAGE_BASE_URL}/${safeFileBaseName}.avif`;

  const buffer = await file.arrayBuffer();
  const avifFile = await sharp(buffer).avif().toBuffer();


  try {
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: API_KEY,
        "Content-Type": "application/octet-stream",
      },
      body: avifFile,
    });

    if (!uploadResponse.ok) {
      console.error(await uploadResponse.text());
      return new Response("Erro ao fazer upload no BunnyCDN", { status: 500 });
    }

    return new Response(
      JSON.stringify({
        message: "Upload com sucesso!",
        url: `${CDN_BASE_URL}/images/${safeFileBaseName}.avif`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Erro ao processar imagem:", error);
    return new Response("Erro interno no processamento", { status: 500 });
  }
}
