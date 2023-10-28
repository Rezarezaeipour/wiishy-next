import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  
  const info = request.cookies.get("w-token");
  const user = request.cookies.get("w-user");

  if (request.nextUrl.pathname.startsWith('/profile/') && !request.nextUrl.pathname.startsWith('/profile/loginRedirect')  ) {
   if(!info && !user){
   return NextResponse.redirect(new URL('/login', request.url))
   }
 }

}


