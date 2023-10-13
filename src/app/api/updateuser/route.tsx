import CookieInfoSetter, {
  CookieTokenSetter,
} from "@/app/components/cookieSetter/cookieSetter";
import { cookies } from "next/headers";

export async function PUT(req: {
  json: () => PromiseLike<{ data: any }> | { data: any };
}) {


  let xdata;
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");
  
  if (infoCookie?.value) {
    const infoCookieObject = JSON.parse(infoCookie?.value)
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;
    
    const  data  = await req.json();
    console.log('rezarastin',data)
    const response = await fetch(
      `http://wiishy-backend.ir/api/user-update/${userId}`,
      {
        body : JSON.stringify(data),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );


    xdata = await response.json();
    console.log('fjmoier',data)
  }

  return Response.json(xdata);
}
