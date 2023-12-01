import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let xdata = null;
  const data = await request.formData();
  console.log(data);
  const eventid = data.get("event_id");
  data.delete("event_id");
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");
console.log(eventid);
  if (infoCookie?.value) {
    const infoCookieObject = JSON.parse(infoCookie.value);
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;

    const response = await fetch(`http://wiishy-backend.ir/api/event-update/${eventid}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    
    if (response.ok) {
      xdata = await response.json();
    } else {
      console.log(response.status,response.statusText);
      xdata = { message: "Something went wrong" };
    }
  }

  return NextResponse.json(xdata.message);
}
