import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let xdata = null;
  const data = await request.formData();
  console.log(data);
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");
  const giftid = data.get("gift_id");
 
  data.delete("gift_id");
  data.delete("gift_image_url");
 
  if (infoCookie?.value) {
    const infoCookieObject = JSON.parse(infoCookie.value);
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;
  
    const response = await fetch(
      `https://wiishy-backend.ir/api/gift-update/${giftid}/${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );

    if (response.ok) {
      xdata = await response.json();
      // console.log("xdata",xdata);
      return NextResponse.json(xdata);
    }else{
      return NextResponse.json("Something went wrong!");
    }

  }

  
}
