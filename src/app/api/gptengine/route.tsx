import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const { prompt } = await req.json();
 
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          { role: "user", content: prompt[0] },
        ],
        model: "gpt-3.5-turbo-1106",
      }),
    });
    console.log(await response);

    if (response.status == 200) {
      const data = await response.json();
      console.log(data.choices[0].message.content);
      
     return NextResponse.json(data.choices[0].message.content)
    }
  } catch (error) {
    console.log(error);
    console.error(error);
    return NextResponse.json(error)
  }
}
