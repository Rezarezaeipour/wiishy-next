import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const cookie = cookies();
  const info = cookie.get("w-token");

  if (info) {
    const parsedInf = JSON.parse(info.value);
    const token = parsedInf.token;
    const response = await fetch("http://wiishy-backend.ir/api/categories/",
     {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok && response.status === 200) {
        const result = await response.json();
        
      return NextResponse.json(result.categories);
    } else {
      return NextResponse.json("something went wrongggg");
    }
  }
}
