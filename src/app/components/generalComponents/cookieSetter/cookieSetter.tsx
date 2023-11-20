import { cookies } from "next/headers";
import { User } from "@/types";

async function CookieInfoSetter(props : User) {
    cookies().set({
    name: "w-user",
    value: JSON.stringify({ name: props.name, family: props.family, id: props.userId, age: props.age }),
    maxAge: 60 * 6 * 24,
  });
}

export async function CookieTokenSetter(token : string,userId : number){
  cookies().set({
    name: "w-token",
    value: JSON.stringify({'token':token,'userId':userId}),
    httpOnly: true,
    maxAge: 60 * 6 * 24,
    sameSite: 'strict'
})}

export default CookieInfoSetter;
