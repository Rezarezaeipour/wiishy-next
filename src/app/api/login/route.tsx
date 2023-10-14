import CookieInfoSetter, { CookieTokenSetter } from "@/app/components/cookieSetter/cookieSetter";

export async function POST(req: {
  json: () =>
    | PromiseLike<{ name: any; email: any; provider: any; image:any }>
    | { name: any; email: any; provider: any;image: any };
}) {
  const { name, email, provider,image } = await req.json();
  const response = await fetch(
    `http://wiishy-backend.ir/api/auth/${provider}`,
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

  // if (!response.ok) {
  //   throw new Error('Failed to fetch data');
  // }
   
  const data = await response.json();

  ///Adding to Cookie

  CookieInfoSetter({
    name: data.user.name,
    family: "",
    userId: data.user.id,
    age: 0,
    location: "",
    token: data?.token,
  });



  CookieTokenSetter(data.token,data.user.id);

  ///Adding to Cookie

  return Response.json(data);
}
