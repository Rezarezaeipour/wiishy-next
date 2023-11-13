import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
//   const { messages } = req.body;
const messages = "hi buddy"
  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    console.log("dd",data)
    res.status(200).json({ data });
    console.log("xxx",data.json())
  } catch (errorx) {
    //   res.status(500).json({ error: errorx.message })
    console.log(errorx);
  }
}
// export async function GET(request: NextRequest) {
// //   const message = await request.json();
// const message = "Hello, how are you?"
//   const cookie = cookies();
//   const info = cookie.get("w-token");
//   let res = "";

//   if (info) {
//     const parsedInf = JSON.parse(info.value);
//     const token = parsedInf.token;
//     // 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

//     const response = await axios.post(
//       "https://api.openai.com/v1/engines/davinci-codex/completions",
//       {
//         prompt: message,
//         max_tokens: 50, // Adjust the max_tokens parameter according to your requirement
//         temperature: 0.6, // Adjust the temperature parameter according to your requirement
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer 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",
//         },
//       }
//     );
//     const reply = response.data.choices[0].text.trim();
//      // console.log("reply",reply.json())
//     // Send the response back to the client

//     // res = await reply.json();
//     res = reply;
//   }

//   return NextResponse.json(res);
// }
