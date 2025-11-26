// supabase/functions/aiTicketHandler/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import OpenAI from "https://esm.sh/openai@4.45.0";

serve(async (req: Request) => {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    // Validate input
    const { ticketId, messages } = body;
    if (!ticketId) {
      return new Response(JSON.stringify({ error: "Missing ticketId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Missing or invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get API key from environment
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("OpenAI API key is not set in environment variables");
    }

    const client = new OpenAI({ apiKey });

    // Call OpenAI Chat API
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const aiReply = response.choices?.[0]?.message?.content ?? "No response from AI";

    return new Response(
      JSON.stringify({ ticketId, reply: aiReply }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("AI ticket handler error:", error);
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
