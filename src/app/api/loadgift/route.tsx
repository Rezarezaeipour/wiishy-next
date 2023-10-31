import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const giftid = await JSON.parse(await request.json());

  const cookie = cookies();
  const info = cookie.get("w-token");
  let res="";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const userid = parsedInf.userId;

    const response = await fetch(
      `http://wiishy-backend.ir/api/giftdetail/${giftid.giftid}/${userid}`,
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
