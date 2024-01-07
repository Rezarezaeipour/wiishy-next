import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey: process.env.FIREWORK_SECRET_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  // Extract the `prompt` from the body of the request
  //  const { prompt } = await req.json();
  const prompt = "10 gift ideas";

  // Ask Fireworks for a streaming chat completion using Llama 2 70b model
  // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
  const response = await fireworks.completions.create({
    model: "accounts/fireworks/models/llama-v2-70b-chat",
    stream: true,
    max_tokens: 1000,
    prompt,
  });

  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);
  console.log(stream);
  // Respond with the stream
  return new StreamingTextResponse(stream);

  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_SECRET_KEY,
  // });

  // const response = await openai.completions.create({
  //   model: "gpt-3.5-turbo-instruct",
  //   prompt: "give me some gift ideas for a 37 year old man\n\n1. Personalized leather wallet or watch\n2. A high-quality bottle of whiskey or wine\n3. A subscription to a monthly men's grooming or lifestyle box\n4. A set of classic or unique golf clubs\n5. Electronic gadgets like a smartwatch or fitness tracker\n6. A set of artisanal cigars or a cigar humidor\n7. A high-quality tool set for their DIY projects\n8. A cooking or grilling class to try new recipes and techniques\n9. Tickets to a sports event or concert of their favorite artist\n10. A weekend getaway to a nearby city or outdoor adventure trip\n11. A monthly subscription to a magazine or book club\n12. A set of professional quality golf clubs or a golfing trip to their dream destination\n13. A high-end coffee or espresso machine for their morning routine\n14. A personalized photo album or framed artwork of their favorite memories\n15. A unique experience, such as a hot air balloon ride or a sports car driving experience.",
  //   temperature: 1,
  //   max_tokens: 256,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  // });

  // const API_URL = 'https://api.openai.com/v1/chat/completions';
  // const prompt  = await req.json();

  // try {
  //   const response = await fetch(API_URL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       messages: [
  //         {
  //           role: "system",
  //           content: "You are a helpful assistant designed to output JSON.",
  //         },
  //         { role: "user", content: prompt},
  //       ],
  //        model: "gpt-3.5-turbo-1106",
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log('xx',data);

  //   return NextResponse.json(data.choices[0].message.content);

  // } catch (error) {
  //   console.log(error);
  //   console.error(error);
  //   return NextResponse.json(error)
  // }
}
