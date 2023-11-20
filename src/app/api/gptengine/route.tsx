import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
  const { prompt } = await req.json();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    console.log(data.choices);
    
    return NextResponse.json(data)
  } catch (error) {
    console.log(error);
    console.error(error);
    return NextResponse.json(error)
  }
}
