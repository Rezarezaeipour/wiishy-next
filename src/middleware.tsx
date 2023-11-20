import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  const response = NextResponse.next();

  const info = request.cookies.get("w-token");

  if (request.nextUrl.pathname.startsWith('/profile/') && !request.nextUrl.pathname.startsWith('/profile/loginRedirect')  ) {
   if(!info){
   return NextResponse.redirect(new URL('/login', request.url))
   }
 }

}


