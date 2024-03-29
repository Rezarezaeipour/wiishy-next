import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const eventid = await JSON.parse(await request.json());
  const cookie = cookies();
  const info = cookie.get("w-token");
  let res="";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/event-detail/${eventid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res = await response.json()
    
  }

  return NextResponse.json(res);
}
