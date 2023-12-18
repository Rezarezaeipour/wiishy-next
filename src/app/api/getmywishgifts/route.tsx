import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = cookies();
  const info = cookie.get("w-token");
  let res = "";

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const userid = parsedInf.userId;
    const List = await fetch(
      `http://wiishy-backend.ir/api/user-products/${userid}/0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res = await List.json(); 
  }
 
  return NextResponse.json(res);

}


