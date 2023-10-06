/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect,useContext } from "react";
import { useLoginContext } from "@/app/context/loginContext";


function LoginRedirect() {
  const { data: session, status } = useSession();
  const { logIn } = useLoginContext();
  const router = useRouter();
  
  const checkLog = async () => {
    try {
     
      const data = logIn();
      console.log(data);
      if (data.new_user) {
        router.push("/profile/edit-profile");
      } else {
        router.push("/profile/explore");
      }

    } catch (error) {
      // Handle error as needed
    }
    return <></>;
  };
  
  useEffect(() => {
    if (session) {
      checkLog();
    }
  }, [checkLog, session]);


}

export default LoginRedirect;
