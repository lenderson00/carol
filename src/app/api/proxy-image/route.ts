import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ message: 'O URL da imagem é obrigatório' }, { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json({ message: 'Falha ao buscar a imagem do URL fornecido' }, { status: response.status });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
      },
    });

  } catch (error) {
    console.error('Erro ao fazer proxy da imagem:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao processar a imagem' }, { status: 500 });
  }
} 