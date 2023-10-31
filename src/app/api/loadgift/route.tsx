import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const giftid = await JSON.parse(await request.json());

  const cookie = cookies();
  const info = cookie.get("w-token");
  let res;

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const userid = parsedInf.userId;

    res = await fetch(
      `http://wiishy-backend.ir/api/giftdetail/${giftid.giftid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.json())
  }

  return NextResponse.json(res);
}
