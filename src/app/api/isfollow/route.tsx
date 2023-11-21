import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const giftid = await request.json();
  // console.log(giftid);
  const originId = giftid.orId;
  const destId = giftid.desId;

  const cookie = cookies();
  const info = cookie.get("w-token");
  let res="";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;

    const response = await fetch(
      `http://wiishy-backend.ir/api/isfollow/${originId}/${destId}`,
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
