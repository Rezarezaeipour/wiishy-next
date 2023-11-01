/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { useLoginContext } from "@/app/context/loginContext";

function LoginRedirect() {
  const { data: session, status } = useSession();
  const { logIn } = useLoginContext();
  const router = useRouter();

  const checkLog = async () => {
    try {
      const data = await logIn();

      if (data.new_user) {
        setTimeout(() => {
          router.push("/profile/edit-profile");
        }, 2000);
      } else {
        setTimeout(() => {
          router.push("/profile/explore");
        }, 2000);
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

  return (
    <>
      <p>Redirecting to the wiishy</p>
    </>
  );
}

export default LoginRedirect;
