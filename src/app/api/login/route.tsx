import CookieInfoSetter, { CookieTokenSetter } from "@/app/components/generalComponents/cookieSetter/cookieSetter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, provider,image } = await req.json();
  const response = await fetch(
    `https://wiishy-backend.ir/api/auth/${provider}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        user_image_url:image
      }),
    }
  );

   
  const data = await response.json();
  ///Adding to Cookie

  await CookieInfoSetter({
    name: data.user.name,
    family: "",
    userId: data.user.id,
    age: 0,
    location: "",
    token: data?.token,
  });



  await CookieTokenSetter(data.token,data.user.id);

  ///Adding to Cookie

  return NextResponse.json(data);
}
