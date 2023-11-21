"use client";
import { GoogleOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Button } from "antd-mobile";
import { signIn } from "next-auth/react";
import Image from "next/image";
import wiishylogo from "../../../public/logo/wiishy-little.png";
export default function Login() {
  return (
    <div className="flex flex-col items-center space-y-3 justify-center h-full bg-white p-4">
      <Image src={wiishylogo}
      style={{width:"100%"}}
      alt="wiishyLogo"></Image>
      <h1 style={{marginTop:"50px"}} className="text-xl">Login to your account</h1>
      <Button
        onClick={() =>
          signIn("linkedin", { callbackUrl: "/profile/loginRedirect" })
        }
        className="btn btn-regular-outline w-full"
        style={{ marginTop: "20px" }}
      >
        <div className="flex items-center justify-center content-center align-middle justify-items-center">
          <LinkedinOutlined className="mr-1" />
          <span>Linkedin</span>
        </div>
      </Button>

      <Button
        onClick={() => signIn("google", { callbackUrl: "/profile/loginRedirect" })}
        className="btn btn-regular-outline w-full"
      >
        <div className="flex items-center justify-center content-center align-middle justify-items-center">
          <GoogleOutlined className="mr-1" />
          <span>Google</span>
        </div>
      </Button>
    </div>
  );
}
