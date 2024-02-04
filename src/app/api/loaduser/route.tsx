import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req =  await request.json();
    const cookie = cookies();
    const info = cookie.get('w-token');
  
    let res ="";

    if(info){
        const parsedInf = JSON.parse(info.value);
        const token = parsedInf.token;
        const userid = req.userId;
        
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/userprofile/${userid}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
          );
          res = await response.json();
          return NextResponse.json(res);
    }
   
   
}
