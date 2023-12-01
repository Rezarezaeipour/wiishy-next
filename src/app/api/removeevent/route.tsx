import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();

  const cookie = cookies();
  const info = cookie.get("w-token");
  let response="";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const res = await fetch(
      `http://wiishy-backend.ir/api/event-remove/${request.eventid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    response = await res.json()
  }
  return NextResponse.json(response);
}
