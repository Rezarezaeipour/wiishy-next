import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  let xdata = null;
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");

  if (infoCookie?.value) {
    const infoCookieObject = JSON.parse(infoCookie.value);
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/follow/${userId}/${req.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    xdata = await response.json();
  }

  return NextResponse.json(xdata)
}


