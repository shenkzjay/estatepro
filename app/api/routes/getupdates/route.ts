import { prisma } from "@/utils/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const updates = await prisma.estateUpdates.findMany({
            orderBy: { createdAt: "desc" },
            take: 10,
          });

          const data = JSON.stringify(updates);
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          await new Promise((resolve) => setTimeout(resolve, 2000000));
        }
      } catch (error) {
        console.error("Error in SSE:", error);
        controller.error(error);
      }
    },
  });

  console.log(stream);

  return new Response(stream, { headers });
}
