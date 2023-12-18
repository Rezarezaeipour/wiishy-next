import { cookies } from "next/headers";
import {  NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies();
  const info = cookie.get("w-token");
  let res = "";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const response = await fetch(`http://wiishy-backend.ir/api/event-followings_birthday`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
   
    res = await response.json(); 
  }
  return NextResponse.json(res);
}
