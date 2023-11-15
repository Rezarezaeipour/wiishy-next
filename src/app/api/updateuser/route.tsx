import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let xdata = null;
  const data = await request.formData();
  console.log("dataaaa",data)
  const cookie = cookies();
  const infoCookie = cookie.get("w-token");
  
  if (infoCookie?.value) {
  
    const infoCookieObject = JSON.parse(infoCookie.value);
    const userId = infoCookieObject.userId;
    const token = infoCookieObject.token;
  
    
    const response = await fetch(
      `http://wiishy-backend.ir/api/user-update/${userId}`,
      {
        method: "POST",
        body: data,
        headers: {
        //  "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }     
      }  
    )
    const xdata = await response.json();
    const status = xdata.status

    if(status == "success"){
      return NextResponse.json({'message':xdata.message});
    }else{
      return NextResponse.json({'message' : 'xSomething went wrongx'});
    }
  
  } 
}