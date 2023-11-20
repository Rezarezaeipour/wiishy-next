import CookieInfoSetter, { CookieTokenSetter } from "@/app/components/generalComponents/cookieSetter/cookieSetter";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const cookie = cookies();
  const token = cookie.get("w-token");
  let result=false;
  token ? result=true : result=false;

  return NextResponse.json(result);
}
