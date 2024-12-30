import { getServerConfig } from "@/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");
  const model = searchParams.get("model");

  if (!prompt) {
    return new Response("Missing prompt query parameter.", { status: 400 });
  }

  if (!model) {
    return new Response("Missing model query parameter.", { status: 400 });
  }
  const { OLLAMA_URL } = getServerConfig();
  const encoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, model }),
        });

        if (!response.body) {
          throw new Error("No response body from Ollama API.");
        }

        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = textDecoder.decode(value, { stream: true });
          controller.enqueue(chunk);
        }
      } catch (error) {
        console.error("Error streaming data:", error);
        controller.enqueue(
          encoder.encode("data: [ERROR] Something went wrong.\n\n"),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
