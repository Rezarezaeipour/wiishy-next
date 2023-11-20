import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    
    const cookie = cookies();
    const Token = cookie.get("w-token");
  
    if(Token){
        const TokenObj = JSON.parse(Token.value);
        const realToken = TokenObj.token;
        
        const res = await fetch(`http://wiishy-backend.ir/api/user-home`,{
            method:"GET",
            headers: {
                "Authorization" : `Bearer ${realToken}`,
              }
        });
        const xdata = await res.json();
        return NextResponse.json(xdata)
    }

   
    
}