
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { json } from "stream/consumers";

export async function PUT(request: NextRequest) {


  let xdata;
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");
 
  if (infoCookie?.value) {
    
    const infoCookieObject = JSON.parse(infoCookie?.value)
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;
    
    const dt = new FormData()
    dt.set('userinfo',await request.json())
  
    const response = await fetch(
      `http://wiishy-backend.ir/api/user-update/${userId}`,
      {
        body : dt,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        }
      }
    );


    xdata = await response.json();
  
  }

  return Response.json(xdata);
}
