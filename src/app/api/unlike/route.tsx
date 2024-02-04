import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const giftid = await request.json();

  const cookie = cookies();
  const info = cookie.get("w-token");
  let res = "";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const userid = parsedInf.userId;
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/gift-dislike/${giftid.giftid}/${userid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(response.ok){
      res = await response.json();
    }else{
      res="";
    }
   
  }

  return NextResponse.json(res);
}
