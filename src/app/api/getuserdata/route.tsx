import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
 
    const cookie = cookies();
    const info = cookie.get('w-token');
    let res ="";
    
    if(info){
        const parsedInf = JSON.parse(info.value);
        const token = parsedInf.token;
        const userid = parsedInf.userId;
      
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/userprofile/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
          );
          res = await response.json();
          
    }
   
    return NextResponse.json(res);
}

