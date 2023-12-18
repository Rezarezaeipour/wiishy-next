import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let xdata = null;
  const data = await request.formData();
 
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");

  if (infoCookie?.value) {
    const infoCookieObject = JSON.parse(infoCookie.value);
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;

    const response = await fetch(`http://wiishy-backend.ir/api/gift-add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (response.ok) {
      xdata = await response.json();
    } else {
      xdata = { message: "Something went wrong" };
    }
  }

  return NextResponse.json(xdata.message);
}
