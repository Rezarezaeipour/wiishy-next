import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest, res: NextResponse) {

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "hi"
    },
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

console.log(response);

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
