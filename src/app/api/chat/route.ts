import { NextResponse } from "next/server";

import { generateChatReply } from "@/lib/chat";
import { isRecord } from "@/lib/guards";

/**
 * Rota da API para o Chatbot com IA (Gemini).
 * Recebe mensagens do front-end e retorna a resposta da IA personificada.
 * 
 * @param {Request} req - A requisição HTTP contendo a mensagem do usuário.
 * @returns {Promise<NextResponse>} A resposta JSON com o texto gerado.
 */
export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!isRecord(body) || typeof body.message !== "string" || body.message.trim().length === 0) {
      return NextResponse.json({ error: "Mensagem inválida" }, { status: 400 });
    }
    const text = await generateChatReply(body.message);

    return NextResponse.json({ reply: text });

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error(`❌ ERRO NO CÉREBRO DIGITAL: ${errorMessage}`);
    return NextResponse.json({
      error: `Erro de conexão neural.`
    }, { status: 500 });
  }
}
