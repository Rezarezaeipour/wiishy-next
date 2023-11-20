/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { useLoginContext } from "@/app/context/loginContext";
import { SpinLoading } from "antd-mobile";

function LoginRedirect() {
  const { data: session, status } = useSession();
  const { logIn } = useLoginContext();
  const router = useRouter();

  const checkLog = async () => {
   
      const data = await logIn();
     
      if (data.new_user) {
        setTimeout(() => {
          router.push("/profile/edit-profile");
        }, 1000);
      } else {
        setTimeout(() => {
          router.push("/profile/explore");
        }, 1000);
      }
    
    return <></>;
  };

  useEffect(() => {
    if (session) {
      checkLog();
    }
  }, [checkLog, session]);

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <SpinLoading color="currentColor" className="mb-2"/>
        Redirecting to the iishy
      </div>
    </>
  );
}

export default LoginRedirect;
